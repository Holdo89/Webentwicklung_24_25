// src/components/adminField/allBookingsField/BookingsField.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem
} from '@mui/material';
import './BookingsField.css';

const ANREDEN = ['Herr', 'Frau', 'Divers'];

/**
 * Zeigt eine paginierte Übersicht aller Buchungen mit Bearbeiten-Dialog.
 *
 * @param {Array} bookings               Liste der Buchungen
 * @param {Function} onDeleteClick       Callback zum Löschen einer Buchung
 * @param {Function} onUpdateClick       Callback zum Aktualisieren einer Buchung
 */
export default function BookingsField({ bookings, onDeleteClick, onUpdateClick }) {
  const [seite, setSeite] = useState(0);
  const eintraegeProSeite = 5;

  const [dialogOffen, setDialogOffen] = useState(false);
  const [formular, setFormular] = useState({
    id: '',
    titel: '',
    anrede: '',
    vorname: '',
    nachname: '',
    datum: '',
    uhrzeit: ''
  });

  // Formulardaten ändern
  const handleInput = ({ target: { name, value } }) =>
    setFormular(prev => ({ ...prev, [name]: value }));

  // Bearbeiten-Dialog mit ausgewählten Buchungsdaten öffnen
  const oeffneDialog = buchung => {
    setFormular({
      id: buchung.id,
      titel: buchung.title,
      anrede: buchung.salutation,
      vorname: buchung.firstName,
      nachname: buchung.lastName,
      datum: buchung.date,
      uhrzeit: buchung.time
    });
    setDialogOffen(true);
  };

  // Dialog schließen
  const schliesseDialog = () => setDialogOffen(false);

  // Änderungen speichern
  const speichern = () => {
    onUpdateClick(formular.id, {
      title: formular.titel,
      guest_title: formular.anrede,
      firstName: formular.vorname,
      lastName: formular.nachname,
      date: formular.datum,
      time: formular.uhrzeit
    });
    schliesseDialog();
  };

  // Buchung löschen mit Bestätigung
  const loeschen = () => {
    if (window.confirm('Termin wirklich stornieren?')) {
      onDeleteClick(formular.id);
      schliesseDialog();
    }
  };

  // Datum und Uhrzeit formatieren
  const formatDate = d => new Date(d).toLocaleDateString('de-DE');
  const formatTime = t => t?.slice(0, 5) ?? '/';

  // Einträge für aktuelle Seite
  const sichtbareEintraege = bookings.slice(
    seite * eintraegeProSeite,
    seite * eintraegeProSeite + eintraegeProSeite
  );

  return (
    <Paper className="bookings-container" elevation={0}>
      <TableContainer>
        <Table className="bookings-table" aria-label="Buchungstabelle">
          <TableHead>
            <TableRow>
              <TableCell>Titel</TableCell>
              <TableCell>Anrede</TableCell>
              <TableCell>Kunde</TableCell>
              <TableCell>Datum</TableCell>
              <TableCell>Uhrzeit</TableCell>
              <TableCell align="center">Aktion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sichtbareEintraege.map(b => (
              <TableRow key={b.id}>
                <TableCell>{b.title}</TableCell>
                <TableCell>{b.salutation}</TableCell>
                <TableCell>{`${b.lastName} ${b.firstName}`}</TableCell>
                <TableCell>{formatDate(b.date)}</TableCell>
                <TableCell>{formatTime(b.time)}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => oeffneDialog(b)}
                  >
                    Bearbeiten
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
        page={seite}
        onPageChange={(_e, neueSeite) => setSeite(neueSeite)}
        rowsPerPage={eintraegeProSeite}
        rowsPerPageOptions={[eintraegeProSeite]}
        labelRowsPerPage="Einträge pro Seite"
      />

      <Dialog open={dialogOffen} onClose={schliesseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Termin bearbeiten</DialogTitle>
        <DialogContent>
          <TextField
            name="titel"
            label="Titel"
            value={formular.titel}
            onChange={handleInput}
            fullWidth
            margin="dense"
          />
          <TextField
            select
            name="anrede"
            label="Anrede"
            value={formular.anrede}
            onChange={handleInput}
            fullWidth
            margin="dense"
          >
            {ANREDEN.map(opt => (
              <MenuItem key={opt} value={opt}>{opt}</MenuItem>
            ))}
          </TextField>
          <TextField
            name="vorname"
            label="Vorname"
            value={formular.vorname}
            onChange={handleInput}
            fullWidth
            margin="dense"
          />
          <TextField
            name="nachname"
            label="Nachname"
            value={formular.nachname}
            onChange={handleInput}
            fullWidth
            margin="dense"
          />
          <TextField
            name="datum"
            label="Datum"
            type="date"
            value={formular.datum}
            onChange={handleInput}
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="uhrzeit"
            label="Uhrzeit"
            type="time"
            value={formular.uhrzeit}
            onChange={handleInput}
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={speichern} variant="contained">Speichern</Button>
          <Button onClick={loeschen} color="error">Stornieren</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

BookingsField.propTypes = {
  bookings: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onUpdateClick: PropTypes.func.isRequired
};
