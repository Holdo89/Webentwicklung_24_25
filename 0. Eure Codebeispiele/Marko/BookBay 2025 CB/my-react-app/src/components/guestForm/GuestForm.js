import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import './GuestForm.css';

const GuestForm = ({ selectedDateTime, onBookingSuccess, onCancel }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    salutation: '',
    firstName: '',
    lastName: '',
    email: '',
    groupSize: '1'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const requiredFields = ['salutation', 'firstName', 'lastName', 'email'];
    const missingField = requiredFields.find(field => !formData[field]);

    if (missingField) {
      enqueueSnackbar('Bitte füllen Sie alle Felder aus', { variant: 'warning' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const booking = {
      title: 'Geburtstagsfeier',
      guest_title: formData.salutation,
      guestName: formData.firstName,
      guestLastName: formData.lastName,
      guestEmail: formData.email,
      guestGroupSize: parseInt(formData.groupSize, 10),
      date: selectedDateTime.format('YYYY-MM-DD HH:mm')
    };

    try {
      const { data } = await axios.post('http://localhost:3001/bookings', booking);
      enqueueSnackbar('Buchung erfolgreich!', { variant: 'success' });
      onBookingSuccess(data);
    } catch (error) {
      const message = error.response?.data?.message || 'Buchung fehlgeschlagen';
      enqueueSnackbar(message, { variant: 'error' });
    }
  };

 
  return (
    <div className="guest-form-container">
      <form className="guest-form" onSubmit={handleSubmit}>
        <h2>Termin buchen</h2>

        <div className="form-field">
          <label>Anrede:</label>
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
        </div>

      <div className="form-field">
        <label>Vorname:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-field">
        <label>Nachname:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-field">
        <label>E-Mail:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-field">
        <label>Gruppengröße:</label>
        <input
          type="number"
          name="groupSize"
          min="1"
          value={formData.groupSize}
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