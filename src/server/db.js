const config = require('../../config/config');

// db config
const pgp = require('pg-promise')({
  // init options
});
const conn = `posgress://${config.POSTGRES_USERNAME}:${config.POSTGRES_PASSWORD}@${config.POSTGRES_ADDRESS}:${config.POSTGRES_PORT}/${config.POSTGRES_DEFAULT_DB_NAME}`;
const db = pgp(conn);

module.exports = db;