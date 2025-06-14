import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import "../allBookingsField/BookingsField.css";

export default function BookingsField({ bookings, onDeleteClick }) {
  return (
    <TableContainer component={Paper} className="bookings-container">
      <Table className="bookings-table" aria-label="Buchungstabelle">
        <TableHead>
          <TableRow>
            <TableCell><strong>Titel</strong></TableCell>
            <TableCell><strong>Vorname</strong></TableCell>
            <TableCell><strong>Nachname</strong></TableCell>
            <TableCell><strong>Datum</strong></TableCell>
            <TableCell><strong>Uhrzeit</strong></TableCell>
            <TableCell><strong>Löschen</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.title}</TableCell>
              <TableCell>{booking.firstName}</TableCell>
              <TableCell>{booking.lastName}</TableCell>
              <TableCell>{new Date(booking.date).toLocaleDateString("de-DE")}</TableCell>
              <TableCell>{booking.time?.slice(0, 5) || "/"}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  onClick={() => onDeleteClick(booking.id)}
                >
                  Löschen
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
