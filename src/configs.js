const dbc = {
  host: process.env['PGHOST'] || 'localhost',
  port: process.env['PGPORT'] || 5432,
  database: process.env['PGDATABASE'] || 'dasdb',
  user: process.env['PGUSER'] || 'postgres',
  password: process.env['PGPASSWORD'] || '',
  app_name: process.env['DYNO'] || 'dasweb',
  ssl: true
}

const dbUrl = (process.env['NODE_ENV'] === 'production')
  ? 'postgres://ybuwlseuvibaro:cdbc9042e2d9f0ea1e689a6b3d7178692ff97de2f995e8940278300a578372bd@ec2-54-235-80-137.compute-1.amazonaws.com:5432/d8jlbi055i5ace'
  : `${dbc.user}:${dbc.password}@${dbc.host}:${dbc.port}/${dbc.database}?ssl=${dbc.ssl}&application_name=${dbc.app_name}`

const config = {
  ENCRYPT_KEY: process.env['ENC_KEY'] || 'NGjDUsCMqpYg5A77Utv2zG7RONdG3Lmn9v85o26l0pM=',
  SESSION_KEY: 'H9lS4NorAy/sBNfpSTvcbDpLWMySCdIqgOftGx6U+Fk=',
  COOKIE_KEY: 'H9lS4NorAy/sBNfpSTvcbDpLWMySCdIqgOftGx6U+Fk=',
  DATABASE_URL: process.env['DATABASE_URL'] || dbUrl
}

export default config
