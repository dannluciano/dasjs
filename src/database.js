import pg from 'pg-promise'
import configs from './configs'

var pgpOptions = {
  connect: function (client, dc, isFresh) {
    if (isFresh) {
      client.query(`SET statement_timeout TO '30s'`)
    }
  }
}

const pgp = pg(pgpOptions)

const db = pgp(configs.DATABASE_URL)

export default db
