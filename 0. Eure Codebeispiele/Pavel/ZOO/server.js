import express from 'express';
import cors from 'cors';
import mysql from 'mysql';

let app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
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

app.post('/addNewAnimal', (req, res) => {
    const tier_name = req.body.tier_name;
    const tier_art = req.body.tier_art;

   
    const query = `INSERT INTO tiere (tier_name, tier_art) VALUES ("${tier_name}", "${tier_art}")`;

    connection.query(query, (err, result) => {
        if (err) {
            res.status(500).send("Internet fail")
        } else {
           res.status(201).send("Tier  wurde angelegt")
        }
    });
});



app.listen(port, () => {
    console.log('Server is running on port ' + port);
});