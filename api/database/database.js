// Import pg.Pool
const Pool = require("pg").Pool;

// Define parameters
const user = 'max';
const host = 'localhost';
const password = 'max';
const database = 'sae_s3';
const port = 5432;

// Define a pool
const pool = new Pool({
    user: user,
    host: host,
    password: password,
    database: database,
    port: port
});

// Exports
module.exports = pool;