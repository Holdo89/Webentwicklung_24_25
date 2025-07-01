import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import "./BookingDetails.css";



function BookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/bookings/${id}`);
        setBooking(response.data);
      } catch (err) {
        console.error(err);
        setError("Buchung nicht gefunden.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

const handleCancel = async () => {
  if (!window.confirm("Möchten Sie diesen Termin wirklich stornieren?")) return;

  try {
    await axios.delete(`http://localhost:3001/bookings/${id}`);
    enqueueSnackbar("Termin erfolgreich storniert.", {
      variant: "success",
      autoHideDuration: 3000,
    });
    navigate("/");
  } catch (err) {
    console.error(err);
    enqueueSnackbar("Fehler beim Stornieren.", {
      variant: "error",
      autoHideDuration: 3000,
    });
  }
};


  if (loading) return <p>Lade Daten...</p>;
  if (error) return <div className="error-message">{error}</div>;

return (
  <div className="booking-details-container">
    <h2>Buchungsdetails</h2>
    <p>
      <strong>Datum:</strong> {booking.date} <br />
      <strong>Uhrzeit:</strong> {booking.time} <br />
      <strong>Veranstaltung:</strong> {booking.title} <br />
      <strong>Name:</strong> {booking.salutation} {booking.firstName} {booking.lastName} <br />
      <strong>E-Mail:</strong> {booking.email}
    </p>
    <button onClick={handleCancel} className="cancel-button">
      Termin stornieren
    </button>
  </div>
);

}

export default BookingDetails;
