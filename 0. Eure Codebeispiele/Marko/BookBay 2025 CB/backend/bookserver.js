import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Booking from "./models/Booking.js";
import User from "./models/User.js";
import nodemailer from "nodemailer";

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB-Verbindung
mongoose.connect("mongodb://localhost:27017/bookbay", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("✅ Verbunden mit MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB-Verbindungsfehler:", err);
});

// Nodemailer Transporter einrichten (für Test kannst du z.B. Ethereal verwenden)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Test-Server von ethereal.email
  port: 465,
  auth: {
    user: "marko.cankovic00@gmail.com", // ersetze mit deinem Ethereal-User
    pass: "123", // ersetze mit deinem Ethereal-Passwort
  },
});

// Beispiel: So bekommst du einen Ethereal-Account (dev-test-mails):
// https://ethereal.email/create

// NEUE BUCHUNG inkl. Mailversand
app.post("/bookings", async (req, res) => {
  const {
    date,
    title = "Geburtstagsfeier",
    userId,
    guest_title,
    guestName,
    guestLastName,
    guestEmail,
    guestGroupSize,
  } = req.body;

  const [day, time] = date.split(" ");
  if (!day || !time) return res.status(400).send("Ungültiges Datum");

  try {
    const booking = await Booking.create({
      date: day,
      time,
      title,
      userId: userId || null,
      guest_title,
      guest_name: guestName,
      guest_lastname: guestLastName,
      guest_email: guestEmail,
      guest_group_size: guestGroupSize || 1,
    });

    // Mail vorbereiten
    const adminLink = `http://localhost:3000/dashboard/bookings/${booking._id}`;

    const mailOptions = {
      from: '"BookBay Service" <noreply@bookbay.de>',
      to: guestEmail,
      subject: "Terminbestätigung bei BookBay",
      html: `
        <h2>Terminbestätigung</h2>
        <p>Hallo ${guest_title} ${guestLastName},</p>
        <p>Ihr Termin <strong>${title}</strong> wurde erfolgreich gebucht für den <strong>${day}</strong> um <strong>${time}</strong>.</p>
        <p><a href="${adminLink}">Termin verwalten / stornieren</a></p>
        <hr />
        <p style="font-size:small;color:#555;">Diese Nachricht wurde automatisch generiert. Bitte nicht antworten.</p>
      `,
    };

    // Mail senden
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Mail konnte nicht gesendet werden:", error);
      } else {
        console.log("Mail gesendet: %s", info.messageId);
      }
    });

    res.status(201).json({
      id: booking._id,
      title: booking.title,
      date: booking.date,
      time: booking.time,
      salutation: guest_title,
      firstName: guestName,
      lastName: guestLastName,
      email: guestEmail,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Fehler bei der Buchung");
  }
});

app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});

// LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).send("Email & Passwort erforderlich");

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send("User nicht gefunden");

    if (user.password !== password) return res.status(401).send("Falsches Passwort");

    res.status(200).send({
      message: "Login erfolgreich",
      user: {
        id: user._id,
        title: user.title,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Serverfehler");
  }
});

// REGISTRIERUNG
app.post("/register", async (req, res) => {
  const { title, name, last_name, email, password } = req.body;

  if (!title || !name || !last_name || !email || !password)
    return res.status(400).send("Alle Felder müssen ausgefüllt werden.");

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).send("E-Mail bereits registriert");

    await User.create({ title, name, last_name, email, password });
    res.status(201).send({ message: "Benutzer erfolgreich registriert!" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Registrierung fehlgeschlagen");
  }
});

// BUCHUNGEN ABRUFEN
app.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("userId", "title name last_name email").sort({ date: 1, time: 1 });
    const formatted = bookings.map((b) => ({
      id: b._id,
      title: b.title,
      date: b.date,
      time: b.time,
      salutation: b.userId ? b.userId.title : b.guest_title,
      firstName: b.userId ? b.userId.name : b.guest_name,
      lastName: b.userId ? b.userId.last_name : b.guest_lastname,
      email: b.userId ? b.userId.email : b.guest_email,
    }));
    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).send("Fehler beim Laden der Buchungen");
  }
});

// BUCHUNGSSTATISTIK
app.get("/bookingsCount", async (req, res) => {
  try {
    const stats = await Booking.aggregate([
      { $group: { _id: "$date", count: { $sum: 1 } } },
    ]);
    const countMap = {};
    stats.forEach((entry) => {
      countMap[entry._id] = entry.count;
    });
    res.json(countMap);
  } catch (err) {
    console.error(err);
    res.status(500).send("Fehler beim Laden der Statistik");
  }
});

// NEUE BUCHUNG
app.post("/bookings", async (req, res) => {
  const {
    date,
    title = "Geburtstagsfeier",
    userId,
    guest_title,
    guestName,
    guestLastName,
    guestEmail,
    guestGroupSize,
  } = req.body;

  const [day, time] = date.split(" ");
  if (!day || !time) return res.status(400).send("Ungültiges Datum");

  try {
    const booking = await Booking.create({
      date: day,
      time,
      title,
      userId: userId || null,
      guest_title,
      guest_name: guestName,
      guest_lastname: guestLastName,
      guest_email: guestEmail,
      guest_group_size: guestGroupSize || 1,
    });

    res.status(201).json({
      id: booking._id,
      title: booking.title,
      date: booking.date,
      time: booking.time,
      salutation: guest_title,
      firstName: guestName,
      lastName: guestLastName,
      email: guestEmail,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Fehler bei der Buchung");
  }
});

// BUCHUNG LÖSCHEN
app.delete("/bookings/:id", async (req, res) => {
  try {
    const result = await Booking.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) return res.status(404).send("Buchung nicht gefunden");
    res.send("Buchung erfolgreich gelöscht");
  } catch (err) {
    console.error(err);
    res.status(500).send("Fehler beim Löschen");
  }
});

// PASSWORT ÄNDERN
app.post("/change-password", async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  if (!email || !oldPassword || !newPassword)
    return res.status(400).send("Alle Felder erforderlich");

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("User nicht gefunden");
    if (user.password !== oldPassword)
      return res.status(401).send("Falsches Passwort");

    user.password = newPassword;
    await user.save();
    res.send("Passwort geändert");
  } catch (err) {
    console.error(err);
    res.status(500).send("Fehler beim Ändern des Passworts");
  }
});

// SERVER STARTEN
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});