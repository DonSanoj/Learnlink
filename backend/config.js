const { Client } = require('pg');

const pgClient = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Learnlink',
    password: '1234',
    port: 5432,
});

pgClient.connect();

module.exports = { pgClient };