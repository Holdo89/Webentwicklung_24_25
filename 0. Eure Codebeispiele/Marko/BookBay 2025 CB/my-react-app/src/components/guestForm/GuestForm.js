import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import "./GuestForm.css";

export default function GuestForm({
  selectedDateTime,
  onBookingSuccess,
  onCancel,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    salutation: "",
    firstName: "",
    lastName: "",
    email: "",
    groupSize: "1",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { salutation, firstName, lastName, email, groupSize } = formData;

    if (!salutation || !firstName || !lastName || !email || !groupSize) {
      enqueueSnackbar("Bitte füllen Sie alle Felder aus", {
        variant: "warning",
      });
      return;
    }

    try {
      // In handleSubmit:
      const bookingData = {
        title: "Geburtstagsfeier",
        guest_title: formData.salutation,
        guestName: firstName,
        guestLastName: lastName,
        guestEmail: email,
        guestGroupSize: parseInt(groupSize, 10),
        date: selectedDateTime.format("YYYY-MM-DD HH:mm"),
      };

      console.log("Sende Buchungsdaten:", bookingData);

      const response = await axios.post(
        "http://localhost:3001/bookings",
        bookingData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      enqueueSnackbar("Buchung erfolgreich!", { variant: "success" });
      onBookingSuccess(response.data);
    } catch (error) {
      console.error(
        "Fehler bei der Buchung:",
        error.response?.data || error.message
      );
      enqueueSnackbar(
        error.response?.data?.message || "Buchung fehlgeschlagen",
        { variant: "error" }
      );
    }
  };

  return (
    <form className="guest-form-container" onSubmit={handleSubmit}>
      <h2>Termin buchen</h2>

      <label>
        Anrede:
        <select
          name="salutation"
          value={formData.salutation}
          onChange={handleChange}
          required
        >
          <option value="">Bitte wählen</option>
          <option value="Herr">Herr</option>
          <option value="Frau">Frau</option>
          <option value="Divers">Divers</option>
        </select>
      </label>

      <label>
        Vorname:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Nachname:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        E-Mail:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Gruppengröße:
        <input
          type="number"
          name="groupSize"
          min="1"
          value={formData.groupSize}
          onChange={handleChange}
          required
        />
      </label>

      <div className="guest-form-buttons">
        <button type="submit">Buchung absenden</button>
        <button type="button" onClick={onCancel}>
          Abbrechen
        </button>
      </div>
    </form>
  );
}
