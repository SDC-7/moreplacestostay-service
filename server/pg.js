const express = require('express');
const app = express();
require('newrelic');
var cors = require('cors')


app.use(cors())

const port = process.env.PORT || 8080;
require('dotenv').config()

app.use('/:id', express.static('dist'))

const mountRoutes = require('../routes')
mountRoutes(app)

app.listen(port, () => {
  console.log(`Example app listening at port ${port}`)
});
