require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect((err) => {
    if (err) {
        console.log("DB connection error:", err);
        return;
    }
    console.log("Connected to Railway MySQL");
});

app.get('/plots', (req, res) => {

    const sql = "SELECT * FROM plot";

    db.query(sql, (err, results) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Database error"
            });
        }

        res.json(results);
    });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});