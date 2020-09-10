const Router = require('express-promise-router');

const redisClient = require('../db/redis.js');
const pool = require('../db');
const  { geospatialQuery } = require('./queries.js')


const router = new Router();

module.exports = router

pool().on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  redisClient().get(id, function (err, reply) {
    if (err) return res.sendStatus(500);
    if (reply) return res.send(reply);
    pool()
    .connect()
    .then(client => {
      return client
        .query('SELECT * FROM residences WHERE id = $1', [id])
        .then(response => {
          let longitude = response.rows[0].longitude;
          let latitude = response.rows[0].latitude;
          client.query(geospatialQuery(longitude, latitude))
          .then(response => {
            client.release();
            redisClient().set(id, JSON.stringify(response.rows), 'EX', 60 * 60 * 24);
            console.log('Cached');
            res.send(response.rows);
          })
          .catch(err => {
            client.release();
            console.log(err.stack)
            res.status(500).send();
          })
        })
        .catch(err => {
          client.release();
          console.log(err.stack)
          res.status(500).send();
        })
    })
  })
});