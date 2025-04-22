// server/server.js
const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.json());


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'buchungen'
});

connection.connect();

// Middleware for CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Routes
app.post('/api/buchung', (req, res) => {
    const { name, datum, anzahlPersonen } = req.body;
    const query = 'INSERT INTO buchungen (name, datum, anzahl_personen) VALUES (?, ?, ?)';
    connection.query(query, [name, datum, anzahlPersonen], (error, results) => {
        if (error) throw error;
        res.status(201).json({ id: results.insertId, ...req.body });
    });
});

app.get('/api/buchungen', (req, res) => {
    const query = 'SELECT * FROM buchungen';
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.listen(5000, () => console.log('Server running on port 5000')); 