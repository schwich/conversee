const config = require('../../config/config');
const { Pool } = require('pg')

const pool = new Pool({
    user: config.POSTGRES_USERNAME,
    host: config.POSTGRES_ADDRESS,
    database: config.POSTGRES_DEFAULT_DB_NAME,
    password: config.POSTGRES_PASSWORD
});

module.exports = {
    query: (text, params) => pool.query(text, params)
}