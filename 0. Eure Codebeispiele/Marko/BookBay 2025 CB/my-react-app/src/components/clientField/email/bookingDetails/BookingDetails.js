import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import "./BookingDetails.css";

/**
 * Zeigt Details einer einzelnen Buchung und erlaubt Storno.
 */
export default function BookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Buchungsdaten laden
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/bookings/${id}`);
        setBooking(data);
      } catch {
        setError("Buchung nicht gefunden.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // Storno-Handler
  const handleCancel = async () => {
    if (!window.confirm("Möchten Sie diesen Termin wirklich stornieren?")) return;
    try {
      await axios.delete(`http://localhost:3001/bookings/${id}`);
      enqueueSnackbar("Termin erfolgreich storniert.", { variant: "success" });
      navigate("/");
    } catch {
      enqueueSnackbar("Fehler beim Stornieren.", { variant: "error" });
    }
  };

  if (loading) return <p>Lade Daten...</p>;
  if (error)   return <div className="error-message">{error}</div>;

  return (
    <div className="booking-details-container">
      <h2>Buchungsdetails</h2>
      <p>
        <strong>Datum:</strong> {booking.date}<br />
        <strong>Uhrzeit:</strong> {booking.time}<br />
        <strong>Veranstaltung:</strong> {booking.title}<br />
        <strong>Name:</strong> {booking.salutation} {booking.firstName} {booking.lastName}<br />
        <strong>E-Mail:</strong> {booking.email}
      </p>
      <button onClick={handleCancel} className="cancel-button">
        Termin stornieren
      </button>
    </div>
  );
}

