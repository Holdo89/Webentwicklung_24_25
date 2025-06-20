import React, { useEffect, useState } from "react";
import StaticDateTimePickerLandscape from "../adminField/calendar/Calendar";
import BasicTable from "../adminField/allBookingsField/BookingsField";
import GuestForm from "../guestForm/GuestForm"; // Wichtig: einbinden
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState(null); // NEU

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
    setSelectedDateTime(null); // Formular schließen nach erfolgreicher Buchung
  };

  const handleDelete = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:3001/bookings/${bookingId}`);
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    } catch (error) {
      console.error("Fehler beim Löschen:", error);
    }
  };

  const handleDateTimeSelect = (dateTime) => {
    setSelectedDateTime(dateTime); // Zeige GuestForm
  };

  // UI für Gäste
  if (!user) {
    return (
      <div className="centered-calendar-container">
        {!selectedDateTime ? (
          <StaticDateTimePickerLandscape onDateTimeSelected={handleDateTimeSelect} />
        ) : (
          <GuestForm
            selectedDateTime={selectedDateTime}
            onBookingSuccess={addBooking}
            onCancel={() => setSelectedDateTime(null)}
          />
        )}
      </div>
    );
  }

  // UI für Admins
  return (
    <div className="two-column-layout">
      <div className="calendar-wrapper">
        {!selectedDateTime ? (
          <StaticDateTimePickerLandscape onDateTimeSelected={handleDateTimeSelect} />
        ) : (
          <GuestForm
            selectedDateTime={selectedDateTime}
            onBookingSuccess={addBooking}
            onCancel={() => setSelectedDateTime(null)}
          />
        )}
      </div>
      <div className="table-wrapper">
        <BasicTable bookings={bookings} onDeleteClick={handleDelete} />
      </div>
    </div>
  );
}
