const dbConfig = {
  host: process.env['PGHOST'] || 'localhost',
  port: process.env['PGPORT'] || 5432,
  database: process.env['PGDATABASE'] || 'dasdb',
  user: process.env['PGUSER'] || 'postgres',
  password: process.env['PGPASSWORD'] || ''
}
const dbUrl = `${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`

const config = {
  ENCRYPT_KEY: process.env['ENC_KEY'] || 'NGjDUsCMqpYg5A77Utv2zG7RONdG3Lmn9v85o26l0pM=',
  SESSION_KEY: 'H9lS4NorAy/sBNfpSTvcbDpLWMySCdIqgOftGx6U+Fk=',
  COOKIE_KEY: 'H9lS4NorAy/sBNfpSTvcbDpLWMySCdIqgOftGx6U+Fk=',
  DATABASE_URL: process.env['DATABASE_URL'] || dbUrl
}

export default config
