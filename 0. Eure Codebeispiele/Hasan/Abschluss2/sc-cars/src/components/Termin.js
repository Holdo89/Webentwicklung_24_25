import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Termin.css";
import { useNavigate } from "react-router-dom";

// Hilfsfunktion für lokale ISO-Darstellung ohne Zeitzonenprobleme
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Feiertage definieren (Beispiele für 2025)
const holidays = [
  "2025-01-01",
  "2025-04-21",
  "2025-05-01",
  "2025-05-29",
  "2025-06-09",
  "2025-08-15",
  "2025-10-26",
  "2025-12-25",
  "2025-12-26",
];

// Betriebsferien definieren
const vacationStart = new Date("2025-07-20");
const vacationEnd = new Date("2025-08-05");

export default function Termin({ terminRef, date, setDate }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const isVacation = (selectedDate) => {
    return selectedDate >= vacationStart && selectedDate <= vacationEnd;
  };

  const isHoliday = (selectedDate) => {
    const isoDate = formatDate(selectedDate);
    return holidays.includes(isoDate);
  };

  const isInvalidDate = (selectedDate) => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const isBeforeTomorrow = selectedDate < tomorrow;
    const isWeekend = selectedDate.getDay() === 0 || selectedDate.getDay() === 6;

    return isBeforeTomorrow || isWeekend || isHoliday(selectedDate) || isVacation(selectedDate);
  };

  const disableDate = ({ date, view }) => {
    if (view !== "month") return false;
    return isInvalidDate(date);
  };

  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;

    if (isInvalidDate(date)) {
      if (date < new Date()) {
        return <div title="Nur zukünftige Buchungen möglich"></div>;
      }
      if (date.getDay() === 0 || date.getDay() === 6) {
        return <div title="Keine Buchungen an Samstagen & Sonntagen möglich"></div>;
      }
      if (isHoliday(date)) {
        return <div title="Feiertag - keine Buchung möglich"></div>;
      }
      if (isVacation(date)) {
        return <div title="Betriebsferien - keine Buchung möglich"></div>;
      }
    }
    return null;
  };

  const handleBooking = () => {
    if (isInvalidDate(date)) {
      setError("Ungültiges Datum gewählt. Bitte wählen Sie einen anderen Termin.");
      return;
    }
    setError("");
    const selectedDate = formatDate(date);
    navigate(`/buchung/${selectedDate}`);
  };

  return (
    <section id="termin" className="section section-dark" ref={terminRef}>
      <h2>Termin vereinbaren</h2>
      <p>Buche jetzt einen Termin zur Fahrzeugaufbereitung oder Fahrzeugbesichtigung.</p>

      <div className="calendar-wrapper" style={{ maxWidth: "400px", margin: "2rem auto" }}>
        <Calendar
          onChange={(newDate) => {
            setDate(newDate);
            setError("");
          }}
          value={date}
          minDate={new Date()}
          tileDisabled={disableDate}
          tileContent={tileContent}
          locale="de-DE"
        />
        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          Ausgewähltes Datum: <strong>{date.toLocaleDateString("de-DE")}</strong>
        </p>
        {error && (
          <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        )}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
          <button className="button" onClick={handleBooking} disabled={isInvalidDate(date)}>
            Termin bestätigen
          </button>
        </div>
      </div>
    </section>
  );
}
