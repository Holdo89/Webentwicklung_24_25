import React, { useState } from "react";
import axios from "axios";
import ConfirmationEmail from "../confirmationEmail/ConfirmationEmail";
import './GuestForm.css';


const GuestForm = ({ selectedDateTime, onBookingSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    guest_title: "",
    guestName: "",
    guestLastName: "",
    guestEmail: "",
  });

  const [bookingResult, setBookingResult] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dateTime = selectedDateTime.format("YYYY-MM-DD HH:mm");

    try {
      const response = await axios.post("http://localhost:3001/bookings", {
        date: dateTime,
        title: "Geburtstagsfeier",
        guest_title: formData.guest_title,
        guestName: formData.guestName,
        guestLastName: formData.guestLastName,
        guestEmail: formData.guestEmail,
      });

      setBookingResult(response.data);
      onBookingSuccess();
    } catch (err) {
      alert("Fehler bei der Buchung");
      console.error(err);
    }
  };

  if (bookingResult) {
    return <ConfirmationEmail booking={bookingResult} />;
  }

  return (
    <div className="guest-form-container">
      <form className="guest-form" onSubmit={handleSubmit}>
        <h2>Gästeinformation</h2>

        <div className="form-field">
          <label htmlFor="guest_title">Anrede</label>
          <input
            name="guest_title"
            id="guest_title"
            value={formData.guest_title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="guestName">Vorname</label>
          <input
            name="guestName"
            id="guestName"
            value={formData.guestName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="guestLastName">Nachname</label>
          <input
            name="guestLastName"
            id="guestLastName"
            value={formData.guestLastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="guestEmail">E-Mail</label>
          <input
            type="email"
            name="guestEmail"
            id="guestEmail"
            value={formData.guestEmail}
            onChange={handleChange}
            required
          />
        </div>

        <div className="guest-form-buttons">
          <button type="submit">Buchen</button>
          <button type="button" onClick={onCancel}>Abbrechen</button>
        </div>
      </form>
    </div>
  );
};

export default GuestForm;
