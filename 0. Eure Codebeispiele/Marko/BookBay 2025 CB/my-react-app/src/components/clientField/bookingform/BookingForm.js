import React, { useState } from "react";
import ConfirmationEmail from "./components/ConfirmationEmail";

function BookingForm() {
  const [booking, setBooking] = useState(null);
  const [date, setDate] = useState("2025-06-25 13:00");
  const [title, setTitle] = useState("Geburtstagsfeier");
  const [guestTitle, setGuestTitle] = useState("Herr");
  const [guestName, setGuestName] = useState("");
  const [guestLastName, setGuestLastName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      date,
      title,
      guest_title: guestTitle,
      guestName,
      guestLastName,
      guestEmail,
    };

    try {
      const res = await fetch("http://localhost:3001/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Fehler bei der Buchung");

      const newBooking = await res.json();
      setBooking(newBooking); // Bestätigung anzeigen
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Vorname"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nachname"
          value={guestLastName}
          onChange={(e) => setGuestLastName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-Mail"
          value={guestEmail}
          onChange={(e) => setGuestEmail(e.target.value)}
          required
        />
        {/* Hier kannst du weitere Inputs für Datum, Titel etc. ergänzen */}

        <button type="submit">Termin buchen</button>
      </form>

      {booking && <ConfirmationEmail booking={booking} />}
    </div>
  );
}

export default BookingForm;
