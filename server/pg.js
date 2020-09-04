const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config()

app.use('/:id', express.static('dist'))

const mountRoutes = require('../routes')
mountRoutes(app)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
