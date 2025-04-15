import express from 'express';
import cors from 'cors';
import mysql from 'mysql';


let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/tasks', (req, res) => {
    const sql = 'SELECT * FROM todo';
    connection.query(sql, (err, result) => {
        if (err) {
            res.send('Error');
        } else {
            res.json(result);
        }
    });
});
app.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const sql = 'DELETE FROM todo WHERE id = ?';
    connection.query(sql, [taskId], (err, result) => {
        if (err) {
            res.send('Error');
        } else {
            res.send('Task deleted'+result);
        }
    });
});
app.post('/tasks/task', (req, res) => {
    const task = req.body;
    const sql = 'INSERT INTO todo SET ?';
    connection.query(sql, task, (err, result) => {
        if (err) {
            res.send('Error');
        } else {
            res.send('Task added');
        }
    });
});
app.patch('/tasks/completed/:id', (req, res) => {
    const taskId = req.params.id;
    const completed = req.body.completed;
    const sql = 'UPDATE todo SET completed = ? WHERE id = ?';
    connection.query(sql, [completed, taskId], (err, result) => {
        if (err) {
            res.send('Error');
        } else {
            res.send('Task updated' + result);
        }
    });
});

app.patch('/tasks/priority/:id', (req, res) => {
    const taskId = req.params.id;
    const priority = req.body.priority;
    const addedTime = req.body.addedTime;
    const sql = 'UPDATE todo SET priority = ?, addedTime = ? WHERE id = ?';
    connection.query(sql, [priority, addedTime, taskId], (err, result) => {
        if (err) {
            res.send('Error');
        } else {
            res.send('Task updated' + result);
        }
    });
});


const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: '',
    database: 'todolist'
});
app.listen(5000, () => {
    console.log('STARTET');
});