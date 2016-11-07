import pg from 'pg-promise'

const pgp = pg()

const dbConfig = {
  host: process.env['PGHOST'] || 'localhost',
  port: process.env['PGPORT'] || 5432,
  database: process.env['PGDATABASE'] || 'dasdb',
  user: process.env['PGUSER'] || 'postgres',
  password: process.env['PGPASSWORD'] || ''
}

export default pgp(dbConfig)
