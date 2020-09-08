const express = require('express');
const app = express();
require('newrelic');
var cors = require('cors')


app.use(cors())

const port = process.env.PORT || 8080;
require('dotenv').config()

app.get('/loaderio-4569e54d5233e4de49d962f2b850909a/', (req, res) => {
  res.send('loaderio-4569e54d5233e4de49d962f2b850909a')
})
app.use('/:id', express.static('dist'))


const mountRoutes = require('../routes')
mountRoutes(app)

app.listen(port, () => {
  console.log(`Example app listening at port ${port}`)
});
