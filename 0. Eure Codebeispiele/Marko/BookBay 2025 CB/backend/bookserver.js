import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import dayjs from "dayjs";

import Booking from "./models/Booking.js";
import User from "./models/User.js";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/assets", express.static("public/assets"));

// MongoDB-Verbindung
mongoose.connect("mongodb://localhost:27017/bookbay", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => console.log("Verbunden mit MongoDB"));
mongoose.connection.on("error", (err) => console.error("MongoDB Fehler:", err));

// Nodemailer Transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "bookbaycb@gmail.com",
    pass: "qzut mzrp vype gczb", 
  },
});

// ✅ NEUE BUCHUNG
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

  if (!date || !guestEmail || !guestName || !guestLastName) {
    return res.status(400).json({
      message: "Fehlende Felder",
      required: ["date", "guestEmail", "guestName", "guestLastName"]
    });
  }

  const parsed = dayjs(date, "YYYY-MM-DD HH:mm");
  if (!parsed.isValid()) return res.status(400).send("Ungültiges Datumsformat");

  const day = parsed.format("YYYY-MM-DD");
  const time = parsed.format("HH:mm");
  const groupSize = parseInt(guestGroupSize, 10) || 1;

  try {
    const result = await Booking.aggregate([
      { $match: { date: day } },
      { $group: { _id: null, total: { $sum: "$guest_group_size" } } }
    ]);
    const totalPeople = result[0]?.total || 0;

    if (totalPeople + groupSize > 50) {
      return res.status(400).send("Maximale Gästezahl erreicht.");
    }

    const booking = await Booking.create({
      date: day,
      time,
      title,
      userId: userId || null,
      guest_title,
      guest_name: guestName,
      guest_lastname: guestLastName,
      guest_email: guestEmail,
      guest_group_size: groupSize,
    });

    const adminLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard/bookings/${booking._id}`;

    const mailOptions = {
      from: process.env.EMAIL_FROM || '"BookBay Service" <noreply@bookbay.de>',
      to: guestEmail,
      subject: "🎉 Deine Buchung bei BookBay ist bestätigt!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px; border-radius: 8px;">
          <h2 style="color: #006c84;">✔️ Buchung bestätigt!</h2>
          <p>Hallo <strong>${guest_title} ${guestLastName}</strong>,</p>
          <p>Dein Termin wurde erfolgreich gebucht:</p>
          <ul>
            <li><strong>Datum:</strong> ${day}</li>
            <li><strong>Uhrzeit:</strong> ${time}</li>
            <li><strong>Personenanzahl:</strong> ${groupSize}</li>
          </ul>
          <p>
            Du kannst deinen Termin jederzeit hier verwalten:<br />
            <a href="${adminLink}" style="color: #006c84; font-weight: bold;">Termin ansehen</a>
          </p>
          <hr />
          <p style="font-size: 12px; color: #666;">Diese E-Mail wurde automatisch generiert. Bitte nicht antworten.</p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions)
      .then(info => console.log("📧 E-Mail versendet:", info.messageId))
      .catch(err => console.error("❌ E-Mail Fehler:", err));

    res.status(201).json({
      id: booking._id,
      title: booking.title,
      date: booking.date,
      time: booking.time,
      salutation: guest_title,
      firstName: guestName,
      lastName: guestLastName,
      email: guestEmail,
      groupSize,
      confirmationSent: true
    });

  } catch (err) {
    console.error("❌ Buchungsfehler:", err);
    res.status(500).json({ message: "Interner Fehler" });
  }
});

// BUCHUNGEN LISTEN
app.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "title name last_name email")
      .sort({ date: 1, time: 1 });

    const formatted = bookings.map((b) => ({
      id: b._id,
      title: b.title,
      date: b.date,
      time: b.time,
      salutation: b.userId ? b.userId.title : b.guest_title,
      firstName: b.userId ? b.userId.name : b.guest_name,
      lastName: b.userId ? b.userId.last_name : b.guest_lastname,
      email: b.userId ? b.userId.email : b.guest_email,
      groupSize: b.guest_group_size || 1,
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).send("Fehler beim Laden der Buchungen");
  }
});

// BUCHUNG DETAILS
app.get("/bookings/:id", async (req, res) => {
  try {
    const b = await Booking.findById(req.params.id);
    if (!b) return res.status(404).send("Buchung nicht gefunden");
    res.json({
      id: b._id,
      title: b.title,
      date: b.date,
      time: b.time,
      salutation: b.guest_title,
      firstName: b.guest_name,
      lastName: b.guest_lastname,
      email: b.guest_email,
      groupSize: b.guest_group_size || 1,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Fehler beim Abrufen");
  }
});

// BUCHUNG LÖSCHEN
app.delete("/bookings/:id", async (req, res) => {
  try {
    const result = await Booking.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) return res.status(404).send("Nicht gefunden");
    res.send("Buchung gelöscht");
  } catch (err) {
    console.error(err);
    res.status(500).send("Fehler beim Löschen");
  }
});

// BUCHUNG BEARBEITEN
app.put("/bookings/:id", async (req, res) => {
  const { title, guest_title, firstName, lastName, date, time } = req.body;
  try {
    const b = await Booking.findById(req.params.id);
    if (!b) return res.status(404).send("Buchung nicht gefunden");

    if (title) b.title = title;
    if (guest_title) b.guest_title = guest_title;
    if (firstName) b.guest_name = firstName;
    if (lastName) b.guest_lastname = lastName;
    if (date) b.date = date;
    if (time) b.time = time;
    

    await b.save();
    res.json({ message: "Buchung aktualisiert", id: b._id });
  } catch (err) {
    console.error(err);
    res.status(500).send("Fehler beim Aktualisieren");
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send("Email & Passwort erforderlich");

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send("User nicht gefunden");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).send("Falsches Passwort");

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
    res.status(500).send("Fehler beim Login");
  }
});

// REGISTRIERUNG
app.post("/register", async (req, res) => {
  const { title, name, last_name, email, password } = req.body;
  if (!title || !name || !last_name || !email || !password)
    return res.status(400).send("Alle Felder erforderlich");

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).send("E-Mail bereits registriert");

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ title, name, last_name, email, password: hashed });

    res.status(201).send({ message: "Benutzer erfolgreich registriert" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Registrierung fehlgeschlagen");
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

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(401).send("Falsches Passwort");

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.send("Passwort geändert");
  } catch (err) {
    console.error(err);
    res.status(500).send("Fehler beim Ändern");
  }
});

// PROFIL AKTUALISIEREN
app.post("/update-profile", async (req, res) => {
  const { oldEmail, title, name, last_name, email } = req.body;
  if (!oldEmail || !title || !name || !last_name || !email)
    return res.status(400).send("Alle Felder erforderlich");

  try {
    const user = await User.findOne({ email: oldEmail });
    if (!user) return res.status(404).send("User nicht gefunden");

    user.title = title;
    user.name = name;
    user.last_name = last_name;
    user.email = email;
    await user.save();

    res.send("Profil aktualisiert");
  } catch (err) {
    console.error(err);
    res.status(500).send("Fehler beim Aktualisieren");
  }
});

// 📊 SUMME ALLER GÄSTE PRO TAG
app.get("/bookingsCount", async (req, res) => {
  try {
    const stats = await Booking.aggregate([
      { $group: { _id: "$date", count: { $sum: "$guest_group_size" } } }
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

// 📊 ANZAHL DER BUCHUNGEN PRO TAG
app.get("/bookingsEntriesCount", async (req, res) => {
  try {
    const stats = await Booking.aggregate([
      { $group: { _id: "$date", count: { $sum: 1 } } }
    ]);
    const countMap = {};
    stats.forEach((entry) => {
      countMap[entry._id] = entry.count;
    });
    res.json(countMap);
  } catch (err) {
    console.error(err);
    res.status(500).send("Fehler bei der Eintragsstatistik");
  }
});

// Start
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
