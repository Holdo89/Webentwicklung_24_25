import mysql from 'mysql';

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "feedcube_codersbay",
});

export function query(sql, values) {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
}



