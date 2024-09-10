import express from "express";
import bcrypt from "bcrypt";
import db from "../db.js";

const router = express.Router();

router.post("/signup", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], async (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    if (results.length > 0) {
      res.status(401).json({ error: "Username already exists" });
    } else {
      const sql = "INSERT INTO users (username, password) VALUES (?,?)";

      const saltRounds = 10;
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          console.log("Hashed password:", hash);
          db.query(sql, [username, hash], async (err, results) => {
            if (err) {
              console.error("Error executing query:", err);
              res.status(500).json({ error: "Internal server error" });
              return;
            } else {
              res.status(200).json({ message: "User signed up successfully" });
            }
          });
        }
      });
    }
  });
});

export default router;
