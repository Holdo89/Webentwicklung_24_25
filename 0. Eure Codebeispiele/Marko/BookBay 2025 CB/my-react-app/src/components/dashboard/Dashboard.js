// src/components/dashboard/Dashboard.js
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Calendar from "../adminField/calendar/Calendar";
import BookingsField from "../adminField/allBookingsField/BookingsField";
import HeroSection from "../guest/HeroSection/HeroSection";
import "./Dashboard.css";

export default function Dashboard() {
  const [user] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );
  const [bookings, setBookings] = useState([]);
  const [bookedDays, setBookedDays] = useState({});
  const [peopleCount, setPeopleCount] = useState({});

  const fetchEntries = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3001/bookingsEntriesCount"
      );
      setBookedDays(data);
    } catch (err) {
      console.error("Error fetching entries:", err);
    }
  };

  const fetchPeopleCount = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3001/bookingsCount"
      );
      setPeopleCount(data);
    } catch (err) {
      console.error("Error fetching people count:", err);
    }
  };

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3001/bookings"
      );
      setBookings(data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const handleBookingUpdate = useCallback(async () => {
    await fetchEntries();
    await fetchPeopleCount();
    if (user) {
      await fetchBookings();
    }
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/bookings/${id}`);
      await handleBookingUpdate();
    } catch (err) {
      console.error("Error deleting booking:", err);
    }
  };

  useEffect(() => {
    handleBookingUpdate();
  }, [handleBookingUpdate]);

  return user ? (
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
          />
        </div>
      </div>
    </div>
  ) : (
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
          window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
        }
      />
    </div>
  );
}
