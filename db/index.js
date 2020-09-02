const { Pool } = require('pg');

const { config } = require('./pg_config.js')

const pool = new Pool(config)

module.exports = {
  query: (text, params) => pool.query(text, params),
}
