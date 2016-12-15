import pg from 'pg-promise'
import configs from './configs'

const pgp = pg()
const db = pgp(configs.DATABASE_URL)

async function init (db) {
  try {
    await db.none(`SET application_name TO 'web'`)
    await db.none(`SET statement_timeout TO '30s'`)
  } catch (e) {
    console.error(e)
  }
}
init(db)

export default db
