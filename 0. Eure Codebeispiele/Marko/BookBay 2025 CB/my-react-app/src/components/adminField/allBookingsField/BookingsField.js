import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import '../allBookingsField/BookingsField.css'

export default function BookingsField() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/bookings")
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Fehler beim Laden der Buchungen:", err));
  }, []);

  
  return (
<TableContainer component={Paper} className="bookings-container">
  <Table className="bookings-table" aria-label="Buchungstabelle">
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Titel</strong>
            </TableCell>
            <TableCell>
              <strong>Datum</strong>
            </TableCell>
            <TableCell>
              <strong>Uhrzeit</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.title}</TableCell>
              <TableCell>
                {new Date(booking.date).toLocaleDateString("de-DE")}
              </TableCell>
              <TableCell>{booking.time?.slice(0, 5) || '/'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
