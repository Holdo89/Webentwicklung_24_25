import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Calendar from '../adminField/calendar/Calendar';
import BookingsField from '../adminField/allBookingsField/BookingsField';
import HeroSection from '../guest/HeroSection/HeroSection';
import './Dashboard.css';

/**
 * Dashboard: zeigt Kalender und Buchungsübersicht.
 */
export default function Dashboard() {
  const [user] = useState(() => JSON.parse(localStorage.getItem('user')));
  const [bookings, setBookings] = useState([]);
  const [bookedDays, setBookedDays] = useState({});
  const [peopleCount, setPeopleCount] = useState({});

  // Buchungs-Statistiken laden
  const fetchEntries = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/bookingsEntriesCount');
      setBookedDays(data);
    } catch (err) {
      console.error('Fehler beim Laden der Einträge:', err);
    }
  };
  const fetchPeopleCount = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/bookingsCount');
      setPeopleCount(data);
    } catch (err) {
      console.error('Fehler beim Laden der Gästezahlen:', err);
    }
  };
  const fetchBookings = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/bookings');
      setBookings(data);
    } catch (err) {
      console.error('Fehler beim Laden der Buchungen:', err);
    }
  };

  // Lädt alle Daten neu
  const handleBookingUpdate = useCallback(async () => {
    await fetchEntries();
    await fetchPeopleCount();
    if (user) await fetchBookings();
  }, [user]);

  // Buchung löschen
  const handleDelete = async id => {
    try {
      await axios.delete(`http://localhost:3001/bookings/${id}`);
      await handleBookingUpdate();
    } catch (err) {
      console.error('Fehler beim Löschen der Buchung:', err);
    }
  };

  // Buchung aktualisieren
  const handleUpdate = async (id, updates) => {
    try {
      await axios.put(`http://localhost:3001/bookings/${id}`, updates);
      await handleBookingUpdate();
    } catch (err) {
      console.error('Fehler beim Aktualisieren der Buchung:', err);
    }
  };

  useEffect(() => {
    handleBookingUpdate();
  }, [handleBookingUpdate]);

  if (!user) {
    return (
      <div className="guest-view">
        <div className="guest-calendar">
          <Calendar
            bookedDays={bookedDays}
            peopleCount={peopleCount}
            onBookingSuccess={handleBookingUpdate}
          />
        </div>
        <HeroSection
          onBookNow={() =>
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
          }
        />
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="calendar-panel">
          <Calendar
            bookedDays={bookedDays}
            peopleCount={peopleCount}
            onBookingSuccess={handleBookingUpdate}
          />
        </div>
        <div className="bookings-panel">
          <BookingsField
            bookings={bookings}
            onDeleteClick={handleDelete}
            onUpdateClick={handleUpdate}
          />
        </div>
      </div>
    </div>
  );
}
