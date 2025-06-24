import React from "react";
import PropTypes from "prop-types";

// MUI Components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

// Styles
import "../allBookingsField/BookingsField.css";

const BookingsField = ({ bookings, onDeleteClick }) => {
  const formatDate = (date) => new Date(date).toLocaleDateString("de-DE");
  const formatTime = (time) => time?.slice(0, 5) || "/";

  return (
    <TableContainer component={Paper} className="bookings-container">
      <Table className="bookings-table" aria-label="Buchungstabelle">
        <TableHead>
          <TableRow>
            <TableCell><strong>Titel</strong></TableCell>
            <TableCell><strong>Kunde</strong></TableCell>
            <TableCell><strong>Datum</strong></TableCell>
            <TableCell><strong>Uhrzeit</strong></TableCell>
            <TableCell><strong>Löschen</strong></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.title}</TableCell>
              <TableCell>
                {booking.salutation} {booking.lastName} {booking.firstName}
              </TableCell>
              <TableCell>{formatDate(booking.date)}</TableCell>
              <TableCell>{formatTime(booking.time)}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  onClick={() => onDeleteClick(booking.id)}
                >
                  Stornieren
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

BookingsField.propTypes = {
  bookings: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default BookingsField;