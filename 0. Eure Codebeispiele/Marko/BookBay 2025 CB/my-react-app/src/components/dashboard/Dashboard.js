import React, { useEffect, useState } from "react";
import StaticDateTimePickerLandscape from "../adminField/calendar/Calendar";
import BasicTable from "../adminField/allBookingsField/BookingsField";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await axios.get("http://localhost:3001/bookings");
        setBookings(res.data);
      } catch (error) {
        console.error("Fehler beim Laden der Buchungen:", error);
      }
    }
    fetchBookings();
  }, []);

  const addBooking = (newBooking) => {
    setBookings((prev) => [...prev, newBooking]);
  };

  // Löschen-Funktion
  const handleDelete = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:3001/bookings/${bookingId}`);
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    } catch (error) {
      console.error("Fehler beim Löschen:", error);
    }
  };

  if (!user) {
    return (
      <div className="centered-calendar-container">
        <div className="calendar-wrapper">
          <StaticDateTimePickerLandscape onBookingAdded={addBooking} />
        </div>
      </div>
    );
  }

  return (
    <div className="two-column-layout">
      <div className="calendar-wrapper">
        <StaticDateTimePickerLandscape onBookingAdded={addBooking} />
      </div>
      <div className="table-wrapper">
        <BasicTable bookings={bookings} onDeleteClick={handleDelete} />
      </div>
    </div>
  );
}
