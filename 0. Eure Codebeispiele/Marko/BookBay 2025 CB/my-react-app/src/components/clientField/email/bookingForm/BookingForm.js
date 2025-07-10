import React, { useState } from "react";

/**
 * Formular zur Erstellung einer neuen Buchung.
 */
export default function BookingForm() {
  const [booking, setBooking] = useState(null);
  const [date, setDate] = useState("2025-06-25 13:00");
  const [title, setTitle] = useState("Geburtstagsfeier");
  const [guestTitle, setGuestTitle] = useState("Herr");
  const [guestName, setGuestName] = useState("");
  const [guestLastName, setGuestLastName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");

  // Abschicken des Formulars
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { date, title, guest_title: guestTitle, guestName, guestLastName, guestEmail };
    try {
      const res = await fetch("http://localhost:3001/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Fehler bei der Buchung");
      const newBooking = await res.json();
      setBooking(newBooking);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="booking-form-container">
      <form onSubmit={handleSubmit}>
        <select value={guestTitle} onChange={e => setGuestTitle(e.target.value)}>
          <option>Herr</option>
          <option>Frau</option>
          <option>Divers</option>
        </select>
        <input type="text" placeholder="Vorname"     value={guestName}     onChange={e => setGuestName(e.target.value)}     required />
        <input type="text" placeholder="Nachname"   value={guestLastName} onChange={e => setGuestLastName(e.target.value)} required />
        <input type="email" placeholder="E-Mail"     value={guestEmail}    onChange={e => setGuestEmail(e.target.value)}    required />
        <button type="submit">Termin buchen</button>
      </form>
      {booking && <ConfirmationEmail booking={booking} />}
    </div>
  );
}
