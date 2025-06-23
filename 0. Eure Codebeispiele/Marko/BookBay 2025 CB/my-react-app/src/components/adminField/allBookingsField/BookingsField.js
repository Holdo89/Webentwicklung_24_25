// MUI-Komponenten für die Tabellenanzeige
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

// Eigene CSS-Datei für Styling der Buchungstabelle
import "../allBookingsField/BookingsField.css";

// ------------------------------------------
// Komponente zeigt eine Tabelle aller Buchungen
// Props:
// - bookings: Array mit Buchungsdaten
// - onDeleteClick: Funktion, die bei Klick auf "Löschen" ausgeführt wird
// ------------------------------------------
export default function BookingsField({ bookings, onDeleteClick }) {
  return (
    <TableContainer component={Paper} className="bookings-container">
      <Table className="bookings-table" aria-label="Buchungstabelle">
        {/* Tabellenkopf mit Spaltenüberschriften */}
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Titel</strong>
            </TableCell>
            <TableCell>
              <strong>Kunde</strong>
            </TableCell>
            <TableCell>
              <strong>Datum</strong>
            </TableCell>
            <TableCell>
              <strong>Uhrzeit</strong>
            </TableCell>
            <TableCell>
              <strong>Löschen</strong>
            </TableCell>
          </TableRow>
        </TableHead>

        {/* Tabellenkörper mit den Buchungsdaten */}
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.title}</TableCell>
              <TableCell>
                {booking.salutation} {booking.lastName} {booking.firstName}{" "}
                {/* Anrede + Vorname */}
              </TableCell>
              <TableCell>
                {new Date(booking.date).toLocaleDateString("de-DE")}
              </TableCell>
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
