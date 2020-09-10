module.exports.config = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
  max: 200,
  idleTimeoutMillis: 2000,
  maxUses: 1000,
}