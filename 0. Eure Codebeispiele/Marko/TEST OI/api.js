// src/services/api.js
const API_URL = 'http://localhost:5000/api';

export const API = {
    createReservation: async (data) => {
        const response = await fetch(`${API_URL}/buchung`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    },
    
    getReservations: async () => {
        const response = await fetch(`${API_URL}/buchungen`);
        return response.json();
    }
};