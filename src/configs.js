const config = {
  ENCRYPT_KEY: process.env['ENC_KEY'] || 'NGjDUsCMqpYg5A77Utv2zG7RONdG3Lmn9v85o26l0pM=',
  SESSION_KEY: 'H9lS4NorAy/sBNfpSTvcbDpLWMySCdIqgOftGx6U+Fk=',
  COOKIE_KEY: 'H9lS4NorAy/sBNfpSTvcbDpLWMySCdIqgOftGx6U+Fk=',
  DATABASE_URL: process.env['DATABASE_URL'] || 'postgres:postgres@localhost:5432/dasdb'
}

export default config
