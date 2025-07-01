import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

import Booking from "./models/Booking.js";
import User from "./models/User.js";

const app = express();
const port = 3001;

// Middleware
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

// Mail-Konfiguration
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "bookbaycb@gmail.com",
    pass: "qzut mzrp vype gczb",
  },
});


//NEUE BUCHUNG inkl. E-Mail & Limitprüfung
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

  // Validate required fields
  if (!date || !guestEmail || !guestName || !guestLastName) {
    return res.status(400).json({
      message: "Missing required fields",
      required: ["date", "guestEmail", "guestName", "guestLastName"]
    });
  }

  const [day, time] = date.split(" ");
  if (!day || !time) return res.status(400).send("Invalid date format (expected 'DD.MM.YYYY HH:MM')");

  try {
    // Check booking limits
    const countForDay = await Booking.countDocuments({ date: day });
    if (countForDay >= 10) {
      return res.status(400).send("Maximum bookings reached for this day");
    }

    // Create booking
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

    // Prepare email
    const adminLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard/bookings/${booking._id}`;
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || '"BookBay Service" <noreply@bookbay.de>',
      to: guestEmail,
      subject: "Ihre Terminbestätigung bei BookBay",
      html: `
        <div style="
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f8fafc;
          padding: 30px;
          color: #334155;
          max-width: 600px;
          margin: 0 auto;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
        ">
          <h2 style="color: #1e293b; text-align: center; margin-bottom: 20px;">
            Terminbestätigung
          </h2>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
            Hallo <strong>${guest_title} ${guestLastName}</strong>,
          </p>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
            Vielen Dank für Ihre Buchung bei BookBay. Ihr Termin für 
            <strong style="color: #2563eb;">${title}</strong> wurde erfolgreich 
            gebucht für den <strong>${day}</strong> um <strong>${time}</strong>.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${adminLink}" style="
              background-color: #2563eb;
              color: white;
              padding: 14px 28px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: 600;
              font-size: 16px;
              display: inline-block;
              transition: background-color 0.2s;
            " onmouseover="this.style.backgroundColor='#1d4ed8'" 
               onmouseout="this.style.backgroundColor='#2563eb'">
              Termin verwalten
            </a>
          </div>
          
          <div style="
            background-color: #f1f5f9;
            padding: 16px;
            border-radius: 8px;
            margin: 25px 0;
            font-size: 14px;
          ">
            <p style="margin: 0;">
              <strong>Adresse:</strong>Peter-Behrens-Platz 4/2.OG, 4020 Linz<br>
              <strong>Anzahl Personen:</strong> ${guestGroupSize || 1}
            </p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 25px 0;" />
          
          <p style="
            font-size: 13px;
            color: #64748b;
            text-align: center;
            margin-top: 20px;
          ">
            Diese Nachricht wurde automatisch generiert. Bitte antworten Sie nicht auf diese E-Mail.
            <br><br>
            © ${new Date().getFullYear()} BookBay. Alle Rechte vorbehalten.
          </p>
        </div>
      `,
    };

    // Send email (async but don't wait for response)
    transporter.sendMail(mailOptions)
      .then(info => console.log("Email sent:", info.messageId))
      .catch(err => console.error("Email error:", err));

    // Respond to client
    res.status(201).json({
      id: booking._id,
      title: booking.title,
      date: booking.date,
      time: booking.time,
      salutation: guest_title,
      firstName: guestName,
      lastName: guestLastName,
      email: guestEmail,
      groupSize: guestGroupSize || 1,
      confirmationSent: true
    });

  } catch (err) {
    console.error("Booking error:", err);
    
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        message: "Validation error",
        errors: Object.entries(err.errors).reduce((acc, [field, error]) => {
          acc[field] = error.message;
          return acc;
        }, {})
      });
    }
    
    res.status(500).json({
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

//BUCHUNGEN ABRUFEN
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

//EINZELNE BUCHUNG ANZEIGEN
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

//BUCHUNG LÖSCHEN
app.delete("/bookings/:id", async (req, res) => {
  try {
    const result = await Booking.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0)
      return res.status(404).send("Buchung nicht gefunden");
    res.send("Buchung gelöscht");
  } catch (err) {
    console.error(err);
    res.status(500).send("Fehler beim Löschen");
  }
});

//LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).send("Email & Passwort erforderlich");

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

//REGISTRIERUNG
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

//PASSWORT ÄNDERN
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

    res.send("Passwort erfolgreich geändert");
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

    res.send("Profil erfolgreich aktualisiert");
  } catch (err) {
    console.error(err);
    res.status(500).send("Fehler beim Aktualisieren");
  }
});

// STATISTIK
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

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
