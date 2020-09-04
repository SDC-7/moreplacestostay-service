const Router = require('express-promise-router');

const db = require('../db');
const  { geospatialQuery } = require('./queries.js')

const router = new Router();

module.exports = router

router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const { rows } = await db.query('SELECT * from residences WHERE id = $1', [id]);
    const longitude = rows[0].longitude;
    const latitude = rows[0].latitude;
    const closeResidences = await db.query(geospatialQuery(longitude, latitude))
    res.send(closeResidences.rows)
  } catch(e) {
    res.status(500).send(e)
  }
});
