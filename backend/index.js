require("dotenv").config();
const experss = require("express");
const mysql = require("mysql2");

const app = express();
const port = process.env.PORT || 3000;

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    charset: 'utf8mb4_unicode_ci',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// serverio paleidimas
app.listen(port, () => {
   console.log(`Serveris veikia ant ${port}.`);
});

// patikrinimas prisijungimo prie DB
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Klaida jungiantis prie duomenų bazės:', err.message);
    } else {
        console.log('Prisijungta prie duomenų bazės!');
        connection.release();
    }
});