const dbc = {
  host: process.env['PGHOST'] || 'localhost',
  port: process.env['PGPORT'] || 5432,
  database: process.env['PGDATABASE'] || 'dasdb',
  user: process.env['PGUSER'] || 'postgres',
  password: process.env['PGPASSWORD'] || '',
  app_name: process.env['DYNO'] || 'dasweb',
  ssl: true
}

const dbUrl = `${dbc.user}:${dbc.password}@${dbc.host}:${dbc.port}/${dbc.database}?ssl=${dbc.ssl}&application_name=${dbc.app_name}`

const config = {
  ENCRYPT_KEY: process.env['ENC_KEY'] || 'NGjDUsCMqpYg5A77Utv2zG7RONdG3Lmn9v85o26l0pM=',
  SESSION_KEY: 'H9lS4NorAy/sBNfpSTvcbDpLWMySCdIqgOftGx6U+Fk=',
  COOKIE_KEY: 'H9lS4NorAy/sBNfpSTvcbDpLWMySCdIqgOftGx6U+Fk=',
  DATABASE_URL: process.env['DATABASE_URL'] || dbUrl
}

export default config
