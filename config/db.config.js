import pool from "pg" ;

const DB= new pool.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});
export default DB;

// Path: config/db.config.js
