import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StaticDateTimePickerLandscape from '../adminField/calendar/Calendar';
import BasicTable from '../adminField/allBookingsField/BookingsField';
import GuestForm from '../guestForm/GuestForm';
import './Dashboard.css';

const Dashboard = () => {
  const [user] = useState(() => JSON.parse(localStorage.getItem('user')));
  const [bookings, setBookings] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/bookings');
      setBookings(data);
    } catch (error) {
      console.error('Fehler beim Laden:', error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleBookingUpdate = async () => {
    await fetchBookings();
    setSelectedDateTime(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/bookings/${id}`);
      await fetchBookings();
    } catch (error) {
      console.error('Löschen fehlgeschlagen:', error);
    }
  };

  const renderGuestView = () => (
    <div className="guest-view">
      {!selectedDateTime ? (
        <StaticDateTimePickerLandscape onDateTimeSelected={setSelectedDateTime} />
      ) : (
        <GuestForm
          selectedDateTime={selectedDateTime}
          onBookingSuccess={handleBookingUpdate}
          onCancel={() => setSelectedDateTime(null)}
        />
      )}
    </div>
  );

const renderAdminView = () => (
  <div className='dashboard'>
  <div className="dashboard-content">
    <div className="calendar-panel">
      {!selectedDateTime ? (
        <StaticDateTimePickerLandscape onDateTimeSelected={setSelectedDateTime} />
      ) : (
        <GuestForm
          selectedDateTime={selectedDateTime}
          onBookingSuccess={handleBookingUpdate}
          onCancel={() => setSelectedDateTime(null)}
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