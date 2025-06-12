import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Termin.css";
import { useNavigate } from "react-router-dom";

export default function Termin({ terminRef, date, setDate }) {
  const navigate = useNavigate();

  const disableDate = ({ date, view }) => {
    if (view !== "month") return false;

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const isBeforeTomorrow = date < tomorrow;
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;

    return isBeforeTomorrow || isWeekend;
  };

  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (date < tomorrow) {
      return <div title="Heute keine Buchung möglich"></div>;
    }

    if (date.getDay() === 0 || date.getDay() === 6) {
      return <div title="Samstag & Sonntag keine Terminbuchung möglich, nur nach telefonischer Absprache"></div>;
    }

    return null;
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
          Ausgewähltes Datum: <strong>{date.toLocaleDateString("de-DE")}</strong>
        </p>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
          <button
            className="button"
            onClick={() => {
              const selectedDate = date.toISOString().split("T")[0];
              navigate(`/buchung/${selectedDate}`);
            }}
          >
            Termin bestätigen
          </button>
        </div>
      </div>
    </section>
  );
}
