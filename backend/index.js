require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

/* MySQL Connection Pool (Railway Compatible) */
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

/* Test Database Connection */
db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }

  console.log("Connected to Railway MySQL");
  connection.release();
});

/* API Route */
app.get('/plots', (req, res) => {

  const sql = "SELECT * FROM plot";

  db.query(sql, (err, results) => {

    if (err) {
      console.error("Query error:", err);
      return res.status(500).json({
        error: err.message
      });
    }

    res.json(results);

  });

});

/* Root Route */
app.get('/', (req, res) => {
  res.send("API is running");
});

/* Server */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});