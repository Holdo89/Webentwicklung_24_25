const mysql = require("mysql2");


const connection = mysql.createConnection({
  host: "localhost",       
  user: "root",        
  password: "",
  database: "projectfitness" 
});


connection.connect((err) => {
  if (err) {
    console.error(" Fehler bei der Verbindung:", err);
    return;
  }
  console.log(" Verbunden mit MySQL " );
});


module.exports = connection;
