const nearbyResidences = require('./residences.js');

module.exports = app => {
  app.use('/residences', nearbyResidences)
}