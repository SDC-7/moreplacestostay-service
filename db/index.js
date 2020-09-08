const { Pool } = require('pg');

const { config } = require('./pg_config.js')

const pool = new Pool(config)

module.exports = () => { return pool };
