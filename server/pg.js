const express = require('express');
const app = express();
const port = 3000;

app.use('/:id', express.static('dist'))

const mountRoutes = require('../routes')
mountRoutes(app)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
