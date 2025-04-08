import express from 'express';
import cors from 'cors';
import mysql from 'mysql';

let app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: '',
    database: 'zooverwaltung'
});

app.get('/all', (req, res) => {
    const sql = 'SELECT * FROM tiere';
    connection.query(sql, (err, result) => {
        if (err) {
            res.send('Error');
        } else {
            res.json(result);
        }
    });
});


app.post('/add', (req, res) => {
    const name = req.body.tier_name;
    const art = req.body.tier_art;
    const sql = `insert into tiere (tier_name, tier_art) values (?, ?)`;
    connection.query(sql, [name, art], (err, result) => {
        if (err) {
            res.send('Error');
        } else {
            res.send('Animal added');
        }
    });
});

app.delete('/delete/:id', (req, res) => {
    const animalId = req.params.id;
    const sql = 'DELETE FROM tiere WHERE id = ?';
    connection.query(sql, [animalId], (err, result) => {
        if (err) {
            res.send('Error');
        } else {
            res.send('Animal deleted' + result);
        }
    });
});



app.listen(port, () => {
    console.log('Server is running on port ' + port);
});
