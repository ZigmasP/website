require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const sanitizeHtml = require("sanitize-html");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ 
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
    methods: "GET, POST, DELETE",
    credentials: true
}));


app.use(express.json()); // Kad galėtų priimti JSON duomenis iš POST užklausų

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

// Gauti visus atsiliepimus
app.get("/reviews", (req, res) => {
    const sql = "SELECT id, Vardas, Vertinimas, Atsiliepimas, DATE_FORMAT(Data, '%Y-%m-%d') as Data FROM atsiliepimai";
    
    pool.query(sql, (err, results) => {
        if (err) {
            console.error("Klaida gaunant atsiliepimus:", err.message);
            return res.status(500).json({ success: false, error: "Klaida gaunant atsiliepimus" });
        }
        res.json({ success: true, reviews: results });
    });
});

// Įrašyti atsiliepimą
app.post("/reviews", (req, res) => {
    const { name, comment, rating } = req.body;

    const sanitizedComment = sanitizeHtml(comment);
    const sanitizedName = sanitizeHtml(name);

    const sql = "INSERT INTO atsiliepimai (Vardas, Vertinimas, Atsiliepimas, Data) VALUES (?, ?, ?, NOW())";
    const values = [sanitizedName, rating, sanitizedComment];

    pool.query(sql, values, (err, result) => {
        if (err) {
            console.error("Klaida įrašant atsiliepimą:", err.message);
            return res.status(500).json({ success: false, error: "Klaida įrašant atsiliepimą" });
        }
        res.json({ success: true, message: "Atsiliepimas sėkmingai įrašytas" });
    });
});

// Ištrinti atsiliepimą
app.delete("/reviews/:id", (req, res) => {
    const reviewId = req.params.id;

    pool.query("DELETE FROM atsiliepimai WHERE id = ?", [reviewId], (err, result) => {
        if (err) {
            console.error("Klaida šalinant atsiliepimą:", err.message);
            return res.status(500).json({ success: false, error: "Klaida šalinant atsiliepimą" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, error: "Atsiliepimas nerastas" });
        }

        res.json({ success: true, message: "Atsiliepimas sėkmingai pašalintas" });
    });
});

// Serverio paleidimas
app.listen(port, () => {
    console.log(`Serveris veikia ant ${port}.`);
});

// Patikrinimas prisijungimo prie DB
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Klaida jungiantis prie duomenų bazės:', err.message);
    } else {
        console.log('Prisijungta prie duomenų bazės!');
        connection.release();
    }
});
