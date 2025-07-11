import React from "react";

/**
 * Zeigt nach erfolgreicher Buchung eine Bestätigungsanzeige.
 */
export default function ConfirmationEmail({ booking }) {
  if (!booking) return null;

  return (
    <div className="confirmation-container">
      <h2>Bestätigung Ihrer Buchung</h2>
      <p>Vielen Dank für Ihre Buchung!</p>
      <p>
        Termin: {booking.date}<br />
        Veranstaltung: {booking.title}<br />
        Name: {booking.guest_title} {booking.guestName} {booking.guestLastName}<br />
        E-Mail: {booking.guestEmail}
      </p>
    </div>
  );
}
