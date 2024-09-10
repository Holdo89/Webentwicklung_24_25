import express from "express";
import bcrypt from "bcrypt";
import db from "../../db.js";

const router = express.Router();

router.post("/loginBasicAuth", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], async (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    if (results.length > 0) {
      const user = results[0];

      try {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          req.session.username = username;
          res.json({ message: "Session created", sessionId: req.sessionID });
        } else {
          res.status(401).json({ error: "Invalid credentials" });
        }
      } catch (err) {
        console.error("Error comparing passwords:", err);
        res.status(500).json({ error: "Internal server error" });
      }
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });
});

export default router;
