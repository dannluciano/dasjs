import pg from 'pg-promise'
import configs from './configs'

var pgpOptions = {
  // API: http://vitaly-t.github.io/pg-promise/global.html#event:connect
  connect: function(client, dc, isFresh) {
    // re-configuring every fresh connection:
    if(isFresh) {
      client.query(`SET statement_timeout TO '30s'`);
    }
  }
};

const pgp = pg(pgpOptions)

// TODO: make sure within the url to pass in parameter application_name;
// see: https://github.com/vitaly-t/pg-promise/wiki/Connection-Syntax
const db = pgp(configs.DATABASE_URL)

export default db
