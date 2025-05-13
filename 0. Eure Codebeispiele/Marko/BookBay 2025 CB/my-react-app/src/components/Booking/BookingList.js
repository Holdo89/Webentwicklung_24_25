import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/bookbay')
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        console.error("Fehler beim Abrufen der Buchungen:", err);
      });
  }, []);

  return (
    <div>
      <h2>Gebuchte Termine</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            {booking.name} – {new Date(booking.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList;
