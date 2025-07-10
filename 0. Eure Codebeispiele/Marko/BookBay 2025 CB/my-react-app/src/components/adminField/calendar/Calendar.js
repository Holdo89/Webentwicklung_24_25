// src/components/adminField/calendar/Calendar.jsx
import React, { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import { useSnackbar } from 'notistack';
import { LocalizationProvider, DateCalendar, PickersDay } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Fade,
  Grow
} from '@mui/material';
import GuestForm from '../../clientField/guestForm/GuestForm';
import './Calendar.css';

dayjs.locale('de');

// Buchungs-Schwellenwerte für Farbmarkierung
const ORANGE_LIMIT = 5;
const RED_LIMIT = 10;

/**
 * Markiert Kalendertage farblich nach gebuchter Anzahl.
 */
function ColoredDay({ day, bookedDays = {}, ...props }) {
  const key = day.format('YYYY-MM-DD');
  const count = bookedDays[key] || 0;
  const bgColor = count >= RED_LIMIT
    ? '#ff0000'
    : count >= ORANGE_LIMIT
    ? '#ff9800'
    : null;

  return (
    <PickersDay
      {...props}
      day={day}
      sx={
        bgColor && {
          backgroundColor: bgColor,
          color: '#fff',
          '&:hover, &.Mui-selected': { backgroundColor: bgColor }
        }
      }
      className="animated-day"
    />
  );
}

/**
 * Kalender-Komponente mit Tages- und Zeitwahl sowie Gastformular.
 *
 * @param {Object} bookedDays      Buchungszahlen pro Datum
 * @param {Function} onBookingSuccess Callback nach erfolgreicher Buchung
 */
export default function Calendar({ bookedDays, onBookingSuccess }) {
  const { enqueueSnackbar } = useSnackbar();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(null);
  const [timeDialogOpen, setTimeDialogOpen] = useState(false);
  const [guestDialogOpen, setGuestDialogOpen] = useState(false);
  const [dateTime, setDateTime] = useState(null);

  // Klick auf Tag öffnet Zeitwahl, wenn Limit nicht erreicht
  const handleDateClick = date => {
    const key = date.format('YYYY-MM-DD');
    if ((bookedDays[key] || 0) >= RED_LIMIT) {
      enqueueSnackbar(`Maximal ${RED_LIMIT} Termine pro Tag erlaubt.`, { variant: 'error' });
      return;
    }
    setSelectedDate(date);
    setSelectedTime(null);
    setTimeDialogOpen(true);
  };

  // Erstellt 15-Minuten-Slots von 12:00–15:00
  const buildTimeSlots = () => {
    const slots = [];
    let cursor = selectedDate.hour(12).minute(0);
    const end = selectedDate.hour(15).minute(0);
    while (cursor.isBefore(end) || cursor.isSame(end, 'minute')) {
      slots.push(cursor.format('HH:mm'));
      cursor = cursor.add(15, 'minute');
    }
    return slots;
  };

  // Wahl einer Uhrzeit bestätigt, öffnet Gast-Dialog
  const confirmTime = time => {
    setSelectedTime(time);
    setDateTime(dayjs(`${selectedDate.format('YYYY-MM-DD')} ${time}`, 'YYYY-MM-DD HH:mm'));
    setTimeDialogOpen(false);
    setGuestDialogOpen(true);
  };

  // Nach erfolgreicher Buchung: Dialog schließen und Parent benachrichtigen
  const handleBookingSuccessDialog = () => {
    setGuestDialogOpen(false);
    setSelectedDate(dayjs());
    setSelectedTime(null);
    onBookingSuccess();
  };

  return (
    <div className="calendar-container">
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
        {/* Monatsansicht mit Fade-In */}
        <Fade in timeout={600}>
          <DateCalendar
            className="animated-calendar"
            value={selectedDate}
            onChange={(date, state) => state === 'finish' && handleDateClick(date)}
            disablePast
            slots={{ day: ColoredDay }}
            slotProps={{ day: { bookedDays } }}
          />
        </Fade>

        {/* Zeitwahl-Dialog */}
        <Dialog open={timeDialogOpen} onClose={() => setTimeDialogOpen(false)} TransitionComponent={Grow} TransitionProps={{ timeout: 300 }}>
          <DialogTitle>Uhrzeit wählen</DialogTitle>
          <DialogContent>
            <Box className="time-grid">
              {buildTimeSlots().map(time => (
                <Button
                  key={time}
                  variant={time === selectedTime ? 'contained' : 'outlined'}
                  onClick={() => confirmTime(time)}
                  className="time-slot-btn animated-button"
                >
                  <Typography>{time}</Typography>
                </Button>
              ))}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setTimeDialogOpen(false)} className="confirm-button">Abbrechen</Button>
          </DialogActions>
        </Dialog>

        {/* Gastformular-Dialog */}
        <Dialog open={guestDialogOpen} onClose={() => setGuestDialogOpen(false)} fullWidth maxWidth="sm" TransitionComponent={Grow} TransitionProps={{ timeout: 300 }}>
          <DialogActions className="dialog-close">
            <Button onClick={() => setGuestDialogOpen(false)}>✕</Button>
          </DialogActions>
          <DialogContent>
            <GuestForm selectedDateTime={dateTime} onBookingSuccess={handleBookingSuccessDialog} onCancel={() => setGuestDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </LocalizationProvider>
    </div>
  );
}
