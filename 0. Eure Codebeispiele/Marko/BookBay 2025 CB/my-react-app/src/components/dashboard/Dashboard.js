import React, { useEffect, useState } from "react";
import StaticDateTimePickerLandscape from "../adminField/calendar/Calendar";
import BasicTable from "../adminField/allBookingsField/BookingsField";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    // User nicht eingeloggt → Kalender mittig
    return (
      <div className="centered-calendar-container">
        <div className="calendar-wrapper">
          <StaticDateTimePickerLandscape />
        </div>
      </div>
    );
  }

  // User eingeloggt → 2-Spalten Layout
  return (
    <div className="two-column-layout">
      <div className="calendar-wrapper">
        <StaticDateTimePickerLandscape />
      </div>
      <div className="table-wrapper">
        <BasicTable />
      </div>
    </div>
  );
}
