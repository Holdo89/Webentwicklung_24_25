import mysql from "mysql"

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todos'
});

connection.connect((err) => {
    if (err) {
        console.error('Fehler bei der Verbindung zur Datenbank:', err);
    } else {
        console.log('Erfolgreich mit der Datenbank verbunden');
    }
});