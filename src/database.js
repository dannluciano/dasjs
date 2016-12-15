import pg from 'pg-promise'
import configs from './configs'

var pgpOptions = {
  connect: function(client, dc, isFresh) {
    // re-configuring every fresh connection:
    if(isFresh) {
      client.query(`SET statement_timeout TO '30s'`);
    }
  }
};

const pgp = pg(pgpOptions)

// TODO: make sure within the url to pass in parameter application name;
// see: https://github.com/vitaly-t/pg-promise/wiki/Connection-Syntax
const db = pgp(configs.DATABASE_URL)

export default db
