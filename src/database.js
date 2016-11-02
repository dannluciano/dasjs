'use strict'

const pgp = require('pg-promise')()

const dbConfig = {
  host: process.env['PGHOST'] || 'localhost',
  port: process.env['PGPORT'] || 5432,
  database: process.env['PGDATABASE'] || 'dasdb',
  user: process.env['PGUSER'] || 'postgres',
  password: process.env['PGPASSWORD'] || ''
}

const db = pgp(dbConfig)

module.exports = db
