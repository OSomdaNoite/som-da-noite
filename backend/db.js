const { Client, Pool, Connection } = require('pg');
require('dotenv').config();

const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
};

const poolConfig = {
    max: 10,
    connectionTimeoutMillis: 30000,
    idleTimeoutMillis: 10000,
}

const pool = new Pool({
    ...dbConfig,
    ...poolConfig
})

const connectToDatabase = async () => {
    try {
        const client = await pool.connect();
        console.log('Connected to the database successfully');
        client.release();
    } catch (err) {
        console.error('Database connection error:', err.stack);
    }
}

module.exports = connectToDatabase;