import React, { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import ConfirmationEmail from "../email/confirmationEmail/ConfirmationEmail";
import "./GuestForm.css";
import { useSnackbar } from "notistack";

const GuestForm = ({ selectedDateTime, onBookingSuccess, onCancel }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({
    guest_title: "Herr",
    guestName: "",
    guestLastName: "",
    guestEmail: "",
    guestGroupSize: "1",
  });

  const [bookingResult, setBookingResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const groupSize = parseInt(formData.guestGroupSize, 10);
    if (isNaN(groupSize) || groupSize < 1) {
      enqueueSnackbar("Gruppengröße muss mindestens 1 sein.", { variant: "error" });
      return;
    }

    const dateTime = dayjs(selectedDateTime).format("YYYY-MM-DD HH:mm");

    try {
      const response = await axios.post("http://localhost:3001/bookings", {
        date: dateTime,
        title: "Geburtstagsfeier",
        guest_title: formData.guest_title,
        guestName: formData.guestName,
        guestLastName: formData.guestLastName,
        guestEmail: formData.guestEmail,
        guestGroupSize: groupSize,
      });

      setBookingResult(response.data);
      enqueueSnackbar("Buchung erfolgreich!", { variant: "success" });
      onBookingSuccess();
    } catch (err) {
      console.error(err);
      const message = err.response?.data || "Fehler bei der Buchung.";
      enqueueSnackbar(message, { variant: "error" });
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
          <select
            name="guest_title"
            id="guest_title"
            value={formData.guest_title}
            onChange={handleChange}
            required
          >
            <option value="Herr">Herr</option>
            <option value="Frau">Frau</option>
            <option value="Divers">Divers</option>
          </select>
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

        <div className="form-field">
          <label htmlFor="guestGroupSize">Anzahl Personen</label>
          <input
            type="number"
            name="guestGroupSize"
            id="guestGroupSize"
            min="1"
            max="20"
            value={formData.guestGroupSize}
            onChange={handleChange}
            required
          />
        </div>

        <div className="guest-form-buttons">
          <button type="submit">Buchen</button>
          <button type="button" onClick={onCancel}>
            Abbrechen
          </button>
        </div>
      </form>
    </div>
  );
};

export default GuestForm;
