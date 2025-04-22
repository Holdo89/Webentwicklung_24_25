// src/components/BuchungsForm.js
import React, { useState } from 'react';
import { API } from '../services/api';

function BuchungsForm() {
    const [formData, setFormData] = useState({
        name: '',
        datum: '',
        anzahlPersonen: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.createReservation(formData);
            setFormData({ name: '', datum: '', anzahlPersonen: '' });
            alert('Buchung erfolgreich!');
        } catch (error) {
            console.error(error);
            alert('Fehler bei der Buchung');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
                type="date"
                value={formData.datum}
                onChange={(e) => setFormData({ ...formData, datum: e.target.value })}
            />
            <input
                type="number"
                placeholder="Anzahl Personen"
                value={formData.anzahlPersonen}
                onChange={(e) => setFormData({ ...formData, anzahlPersonen: e.target.value })}
            />
            <button type="submit">Buchen</button>
        </form>
    );
}

export default BuchungsForm;