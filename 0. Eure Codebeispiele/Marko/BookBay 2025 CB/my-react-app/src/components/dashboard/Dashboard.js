import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookingCalendar from '../adminField/calendar/Calendar';
import BasicTable from '../adminField/allBookingsField/BookingsField';
import GuestForm from '../clientField/guestForm/GuestForm';
import './Dashboard.css';

const Dashboard = () => {
  const [user] = useState(() => JSON.parse(localStorage.getItem('user')));
  const [bookings, setBookings] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [bookedDays, setBookedDays] = useState({});

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/bookings');
      setBookings(data);
    } catch (error) {
      console.error('Fehler beim Laden:', error);
    }
  };

  const fetchBookedDays = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/bookingsCount');
      setBookedDays(data);
    } catch (error) {
      console.error('Fehler beim Laden der Buchungsstatistik:', error);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchBookedDays();
  }, []);

  const handleBookingUpdate = async () => {
    await fetchBookings();
    await fetchBookedDays();
    setSelectedDateTime(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/bookings/${id}`);
      await fetchBookings();
      await fetchBookedDays();
    } catch (error) {
      console.error('Löschen fehlgeschlagen:', error);
    }
  };

 const handleDateTimeChange = (dateStr) => {
    // You might want to add time handling here if needed
    setSelectedDateTime(dateStr);
  };

  const renderGuestView = () => (
    <div className="guest-view">
      {!selectedDateTime ? (
        <BookingCalendar 
          onDateSelect={handleDateTimeChange} 
          bookedDays={bookedDays}
        />
      ) : (
        <GuestForm
          selectedDateTime={selectedDateTime}
          onBookingSuccess={handleBookingUpdate}
          onCancel={() => setSelectedDateTime(null)}
          onTimeChange={handleDateTimeChange}
        />
      )}
    </div>
  );

  const renderAdminView = () => (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="calendar-panel">
          {!selectedDateTime ? (
            <BookingCalendar 
              onDateSelect={handleDateTimeChange} 
              bookedDays={bookedDays}
            />
          ) : (
            <GuestForm
              selectedDateTime={selectedDateTime}
              onBookingSuccess={handleBookingUpdate}
              onCancel={() => setSelectedDateTime(null)}
              onTimeChange={handleDateTimeChange}
            />
          )}
        </div>
        <div className="bookings-panel">
          <BasicTable bookings={bookings} onDeleteClick={handleDelete} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      {user ? renderAdminView() : renderGuestView()}
    </div>
  );
};

export default Dashboard;