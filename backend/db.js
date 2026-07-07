import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'db-exercice',
    password: process.env.PASSWORD,
    port: 5432,

});

pool.connect();


export default pool