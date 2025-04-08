import mysql from 'mysql';


const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: '',
    database: 'todolist'
});
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err);
    }   else {
        console.log('connected as id ' + connection.threadId);
    }
});