import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Termin.css";
import { useNavigate } from "react-router-dom";

function getHolidays(year) {
  const fixed = [
    `${year}-01-01`, `${year}-05-01`, `${year}-08-15`,
    `${year}-10-26`, `${year}-11-01`, `${year}-12-08`,
    `${year}-12-25`, `${year}-12-26`
  ];
  const easter = getEaster(year);
  const movable = [
    formatDate(addDays(easter, 1)),
    formatDate(addDays(easter, 39)),
    formatDate(addDays(easter, 50)),
    formatDate(addDays(easter, 60)),
  ];
  return [...fixed, ...movable];
}

function getEaster(year) {
  const f = Math.floor, G = year % 19, C = f(year / 100),
        H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30,
        I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11)),
        J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
        L = I - J,
        month = 3 + f((L + 40) / 44),
        day = L + 28 - 31 * f(month / 4);
  return new Date(year, month - 1, day);
}

function addDays(date, days) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const betriebsferien = [{ start: "2025-07-15", end: "2025-07-31" }];

function isBetriebsferien(date) {
  const dateStr = formatDate(date);
  return betriebsferien.some(({ start, end }) => dateStr >= start && dateStr <= end);
}

export default function Termin({ terminRef, date, setDate }) {
  const navigate = useNavigate();
  const [holidays, setHolidays] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const year = date.getFullYear();
    setHolidays(getHolidays(year));
  }, [date]);

  const disableDate = ({ date, view }) => {
    if (view !== "month") return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const isBeforeTomorrow = date < tomorrow;
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const isHoliday = holidays.includes(formatDate(date));
    const isInBetriebsferien = isBetriebsferien(date);

    return isBeforeTomorrow || isWeekend || isHoliday || isInBetriebsferien;
  };

  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;
    if (holidays.includes(formatDate(date))) return <div title="Feiertag"></div>;
    if (isBetriebsferien(date)) return <div title="Betriebsferien"></div>;
    if (date.getDay() === 0 || date.getDay() === 6) return <div title="Wochenende"></div>;
    return null;
  };

  const handleTermin = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (
      date < tomorrow ||
      date.getDay() === 0 ||
      date.getDay() === 6 ||
      holidays.includes(formatDate(date)) ||
      isBetriebsferien(date)
    ) {
      setError("Ungültiges Datum! Bitte wähle einen verfügbaren Termin.");
      setTimeout(() => setError(""), 4000); // nach 4 Sekunden verschwindet die Fehlermeldung
      return;
    }

    const selectedDate = formatDate(date);
    navigate(`/buchung/${selectedDate}`);
  };

  return (
    <section id="termin" className="section section-dark" ref={terminRef}>
      <h2>Termin vereinbaren</h2>
      <p>Buche jetzt einen Termin zur Fahrzeugaufbereitung oder Fahrzeugbesichtigung.</p>

      <div className="calendar-wrapper" style={{ maxWidth: "400px", margin: "2rem auto" }}>
        <Calendar
          onChange={(newDate) => setDate(newDate)}
          value={date}
          minDate={new Date()}
          tileDisabled={disableDate}
          tileContent={tileContent}
          locale="de-DE"
        />

        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          Ausgewähltes Datum: <strong>{formatDate(date)}</strong>
        </p>

        {error && (
          <div style={{
            backgroundColor: "#ffdddd",
            color: "#a00",
            padding: "1rem",
            borderRadius: "8px",
            margin: "1rem auto",
            maxWidth: "400px",
            textAlign: "center",
            boxShadow: "0 0 5px rgba(0,0,0,0.2)"
          }}>
            {error}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
          <button className="button" onClick={handleTermin}>
            Termin bestätigen
          </button>
        </div>
      </div>
    </section>
  );
}
