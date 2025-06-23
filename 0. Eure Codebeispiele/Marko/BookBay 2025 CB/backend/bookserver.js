import bodyParser from "body-parser";
import express from "express";
import axios from "axios";
import cors from "cors";
import mysql from "mysql";

const app = express();
const port = 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Datenbank-Verbindung
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bookbay",
});

connection.connect((err) => {
  if (err) {
    console.log("Fehler bei der Verbindung zur Datenbank:", err);
  } else {
    console.log("Erfolgreich mit der Datenbank verbunden");
  }
});

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Bitte gib dein E-Mail und Passwort ein.");
  }

  const query = "SELECT * FROM user WHERE email = ?";
  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server fehler!");
    }

    if (results.length === 0) {
      return res.status(401).send("User nicht gefunden.");
    }

    const user = results[0];
    if (user.password !== password) {
      return res.status(401).send("Falsches Passwort");
    }

    res.status(200).send({
      message: "Login erfolgreich",
      user: {
        id: user.id,
        title: user.title,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  });
});

// Registrierung
app.post("/register", (req, res) => {
  const { title, name, last_name, email, password } = req.body;

  if (!title || !name || !last_name || !email || !password) {
    return res
      .status(400)
      .send("Alle Felder (inkl. Anrede) müssen ausgefüllt werden.");
  }

  const checkQuery = "SELECT * FROM user WHERE email = ?";
  connection.query(checkQuery, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Serverfehler beim Überprüfen des E-Mails.");
    }

    if (results.length > 0) {
      return res.status(409).send("E-Mail ist bereits registriert.");
    }

    const insertQuery =
      "INSERT INTO user (title, name, last_name, email, password) VALUES (?, ?, ?, ?, ?)";
    connection.query(
      insertQuery,
      [title, name, last_name, email, password],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Fehler beim Einfügen in die Datenbank.");
        }

        res.status(201).send({ message: "Benutzer erfolgreich registriert!" });
      }
    );
  });
});

// Alle Buchungen abrufen
app.get("/bookings", (req, res) => {
  const query = `
    SELECT 
      b.id,
      b.date,
      b.time,
      COALESCE(b.title, 'Geburtstagsfeier') AS title,
      COALESCE(u.name, b.guest_name) AS firstName, 
      COALESCE(u.last_name, b.guest_lastname) AS lastName,
      COALESCE(u.email, b.guest_email) AS email,
      CASE
        WHEN b.userId IS NOT NULL THEN u.title
        ELSE b.guest_title
      END AS salutation
    FROM bookings b
    LEFT JOIN user u ON b.userId = u.id
    ORDER BY b.date, b.time
  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Fehler beim Abrufen der Buchungen:", error);
      return res.status(500).send("Fehler beim Laden der Buchungen");
    }
    res.json(results);
  });
});

// Buchungsstatistik pro Tag
app.get("/bookingsCount", (req, res) => {
  const query = `
    SELECT date, COUNT(*) as count
    FROM bookings
    GROUP BY date
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Fehler beim Abrufen der Buchungsanzahl:", err);
      return res.status(500).send("Fehler beim Laden der Buchungsstatistik");
    }

    const countPerDay = {};
    results.forEach((row) => {
      countPerDay[row.date] = row.count;
    });

    res.json(countPerDay);
  });
});

// Neue Buchung erstellen
app.post("/bookings", (req, res) => {
  const {
    date,
    title = "Geburtstagsfeier", // Standardwert falls nicht angegeben
    userId,
    guest_title,
    guestName,
    guestLastName,
    guestEmail,
    guestGroupSize,
  } = req.body;

  if (!date || (!userId && !guestEmail)) {
    return res.status(400).send("Fehlende Daten für Buchung.");
  }

  const [day, time] = date.split(" ");

  if (userId) {
    // Für eingeloggte Benutzer
    const query =
      "INSERT INTO bookings (date, time, title, userId) VALUES (?, ?, ?, ?)";
    connection.query(query, [day, time, title, userId], (err, result) => {
      if (err) {
        console.error("Fehler beim Einfügen:", err);
        return res.status(500).send("Fehler beim Speichern der Buchung");
      }

      // Rückgabe mit allen benötigten Feldern
      res.status(201).json({
        id: result.insertId,
        title, // = "Geburtstagsfeier" oder was vom Client kam
        date: day,
        time,
        salutation: guest_title,
        firstName: guestName,
        lastName: guestLastName,
        email: guestEmail,
      });
    });
  } else {
    // Für Gäste
    const query = `
      INSERT INTO bookings (
        date, time, title, guest_title,
        guest_name, guest_lastname, guest_email, guest_group_size
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    connection.query(
      query,
      [
        day,
        time,
        title,
        guest_title,
        guestName,
        guestLastName,
        guestEmail,
        guestGroupSize || 1,
      ],
      (err, result) => {
        if (err) {
          console.error("Fehler beim Einfügen:", err);
          return res.status(500).send("Fehler bei der Gäste-Buchung");
        }
        res.status(201).json({
          id: result.insertId,
          title: guest_title,
          date: day,
          time,
          firstName: guestName,
          lastName: guestLastName,
        });
      }
    );
  }
});

// Buchung löschen
app.delete("/bookings/:id", (req, res) => {
  const bookingId = req.params.id;
  const query = "DELETE FROM bookings WHERE id = ?";

  connection.query(query, [bookingId], (err, result) => {
    if (err) {
      console.error("Fehler beim Löschen:", err);
      return res.status(500).send("Fehler beim Löschen der Buchung");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("Buchung nicht gefunden");
    }

    res.status(200).send("Buchung erfolgreich gelöscht");
  });
});

// Passwort ändern
app.post("/change-password", (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  if (!email || !oldPassword || !newPassword) {
    return res.status(400).send("Fehlende Daten.");
  }

  const query = "SELECT * FROM user WHERE email = ?";
  connection.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).send("Serverfehler beim Abrufen des Users.");
    }

    if (results.length === 0) {
      return res.status(404).send("Benutzer nicht gefunden.");
    }

    const user = results[0];
    if (user.password !== oldPassword) {
      return res.status(401).send("Altes Passwort ist falsch.");
    }

    const updateQuery = "UPDATE user SET password = ? WHERE email = ?";
    connection.query(updateQuery, [newPassword, email], (err) => {
      if (err) {
        return res.status(500).send("Fehler beim Aktualisieren des Passworts.");
      }
      return res.status(200).send("Passwort wurde erfolgreich geändert.");
    });
  });
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
