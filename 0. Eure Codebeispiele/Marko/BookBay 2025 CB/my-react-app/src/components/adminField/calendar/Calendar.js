// React und Hooks
import * as React from "react";
import { useState, useEffect } from "react";

// dayjs für Datumslogik + deutsche Lokalisierung
import dayjs from "dayjs";
import "dayjs/locale/de";

// HTTP-Client zur Kommunikation mit dem Backend
import axios from "axios";

// MUI-Komponenten für Datumsauswahl mit dayjs-Unterstützung
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";

// Snackbar für Benutzerfeedback
import { useSnackbar, SnackbarProvider } from "notistack";

// Badge für Statusanzeige im Kalender
import Badge from "@mui/material/Badge";

// CSS-Styles
import "./Calendar.css";

// Locale setzen
dayjs.locale("de");

// -----------------------------------------------
// Haupt-Komponente mit Kalenderanzeige
// -----------------------------------------------
function CalendarComponent({ onDateTimeSelected }) {
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [bookingsCount, setBookingsCount] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  const HALF_BOOKED_LIMIT = 5;
  const FULLY_BOOKED_LIMIT = 10;

  // Buchungen vom Server laden
  useEffect(() => {
    const fetchBookingsCount = async () => {
      try {
        const response = await axios.get("http://localhost:3001/bookingsCount");
        setBookingsCount(response.data);
      } catch (error) {
        console.error("Fehler beim Laden der Buchungen:", error);
        enqueueSnackbar("Fehler beim Laden der Buchungen", { variant: "error" });
      }
    };
    fetchBookingsCount();
  }, [enqueueSnackbar]);

  // Datumsauswahl verarbeiten
  const handleAccept = (value) => {
    if (!value || value.isBefore(dayjs())) {
      enqueueSnackbar("Datum ungültig oder in der Vergangenheit", { variant: "warning" });
      return;
    }

    if (onDateTimeSelected) {
      onDateTimeSelected(value); // Gib das gewählte Datum zurück an Dashboard
    }

    setSelectedDateTime(null); // Reset Auswahl
  };

  // Tagesanzeige mit Warnsymbolen
  const renderDayWithWarning = (day, _selectedDates, pickersDayProps) => {
    const dayStr = day.format("YYYY-MM-DD");
    const count = bookingsCount[dayStr] || 0;

    let badge = null;
    if (count >= FULLY_BOOKED_LIMIT) {
      badge = "❌";
    } else if (count >= HALF_BOOKED_LIMIT) {
      badge = "⚠️";
    }

    return (
      <Badge overlap="circular" badgeContent={badge} color="error">
        <PickersDay {...pickersDayProps} />
      </Badge>
    );
  };

  // UI
  return (
    <div className="calendar-container">
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
        <StaticDateTimePicker
          orientation="landscape"
          ampm={false}
          value={selectedDateTime}
          onChange={setSelectedDateTime}
          onAccept={handleAccept}
          minTime={dayjs().hour(12).minute(0)}
          maxTime={dayjs().hour(15).minute(0)}
          renderDay={renderDayWithWarning}
        />
      </LocalizationProvider>
    </div>
  );
}

// -----------------------------------------
// Wrapper mit SnackbarProvider als Kontext
// -----------------------------------------
export default function StaticDateTimePickerLandscape({ onDateTimeSelected }) {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <CalendarComponent onDateTimeSelected={onDateTimeSelected} />
    </SnackbarProvider>
  );
}
