// src/components/adminField/allBookingsField/BookingsField.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TablePagination from "@mui/material/TablePagination";
import "./BookingsField.css";

const BookingsField = ({ bookings, onDeleteClick }) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const paginated = bookings.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("de-DE");
  const formatTime = (time) => time?.slice(0, 5) || "/";

  return (
    <Paper elevation={0} className="bookings-container">
      <TableContainer>
        <Table className="bookings-table" aria-label="Buchungstabelle">
          <TableHead>
            <TableRow>
              <TableCell>Titel</TableCell>
              <TableCell>Kunde</TableCell>
              <TableCell>Datum</TableCell>
              <TableCell>Uhrzeit</TableCell>
              <TableCell align="center">Aktion</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginated.map((b) => (
              <TableRow key={b.id} className="booking-row">
                <TableCell>{b.title}</TableCell>
                <TableCell>
                  {b.salutation} {b.lastName} {b.firstName}
                </TableCell>
                <TableCell>{formatDate(b.date)}</TableCell>
                <TableCell>{formatTime(b.time)}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    startIcon={<DeleteOutlineIcon />}
                    className="cancel-btn"
                    onClick={() => onDeleteClick(b.id)}
                  >
                    Stornieren
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={bookings.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[rowsPerPage]}
        labelRowsPerPage="Einträge pro Seite"
        backIconButtonProps={{ "aria-label": "vorherige Seite" }}
        nextIconButtonProps={{ "aria-label": "nächste Seite" }}
      />
    </Paper>
  );
};

BookingsField.propTypes = {
  bookings: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default BookingsField;
