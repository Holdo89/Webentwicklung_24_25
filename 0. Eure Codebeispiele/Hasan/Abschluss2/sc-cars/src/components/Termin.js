// src/components/Termin.js
import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Termin.css";

export default function Termin({ terminRef, date, setDate, handleTerminBestätigen, confirmationMessage }) {
  return (
    <section id="termin" className="section section-dark" ref={terminRef}>
      <h2>Termin vereinbaren</h2>
      <p>Buche jetzt einen Termin zur Fahrzeugaufbereitung oder Fahrzeugbesichtigung.</p>

      <div className="calendar-wrapper" style={{ maxWidth: "400px", margin: "2rem auto" }}>
        <Calendar
          onChange={(newDate) => setDate(newDate)}
          value={date}
          minDate={new Date()}
          locale="de-DE"
        />
        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          Ausgewähltes Datum: <strong>{date.toLocaleDateString("de-DE")}</strong>
        </p>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
          <button className="button" onClick={handleTerminBestätigen}>Termin bestätigen</button>
        </div>
        {confirmationMessage && (
          <p style={{ textAlign: "center", color: "green", marginTop: "1rem" }}>
            {confirmationMessage}
          </p>
        )}
      </div>
    </section>
  );
}
