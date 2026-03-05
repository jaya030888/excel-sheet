const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'plot'
});

db.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Connected to MySQL database");
});


app.get('/plots', (req, res) => {

    const sql = "SELECT * FROM plot";

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Database error"
            });
        }

        res.json(results);
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});