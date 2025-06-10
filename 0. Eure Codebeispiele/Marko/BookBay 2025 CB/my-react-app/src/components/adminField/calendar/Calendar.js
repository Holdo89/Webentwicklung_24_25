import * as React from "react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/de";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { useSnackbar, SnackbarProvider } from "notistack";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";

import "./Calendar.css";

dayjs.locale("de");

function CalendarComponent() {
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [bookingsCount, setBookingsCount] = useState({}); // Termine pro Tag
  const { enqueueSnackbar } = useSnackbar();

  // Beispiel: Termine von Backend laden
  useEffect(() => {
    async function fetchBookingsCount() {
      try {
        const res = await axios.get("http://localhost:3001/bookingsCount"); 

        setBookingsCount(res.data);
      } catch (error) {
        console.error("Fehler beim Laden der Buchungen:", error);
      }
    }
    fetchBookingsCount();
  }, []);

  const handleAccept = async (value) => {
    if (!value) return;

    if (value.isBefore(dayjs())) {
      enqueueSnackbar("Termine in der Vergangenheit sind nicht erlaubt.", {
        variant: "warning",
        autoHideDuration: 3000,
      });
      return;
    }

    try {
      await axios.post("http://localhost:3001/bookings", {
        title: "Geburtstagsfeier",
        date: value.format("YYYY-MM-DD HH:mm:ss"),
        time: value.format("00:00:00"),
      });
      

      enqueueSnackbar("Termin erfolgreich gespeichert!", {
        variant: "success",
        autoHideDuration: 3000,
      });
      setSelectedDateTime(null);
      // Optional: hier nochmal bookingsCount aktualisieren, wenn möglich
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
      enqueueSnackbar("Fehler beim Speichern.", {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  // renderDay anpassen: zeigt Tag + Warnung wenn mehr als 5 Termine
  const renderDayWithWarning = (day, selectedDates, pickersDayProps) => {
    const dayStr = day.format("YYYY-MM-DD");
    const count = bookingsCount[dayStr] || 0;

    return (
      <PickersDay {...pickersDayProps}>
        {day.date()}
        {count > 5 && <span style={{ marginLeft: 4 }}>⚠️</span>}
      </PickersDay>
    );
  };

  return (
    <div className="calendar-container">
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
        <StaticDateTimePicker
          orientation="landscape"
          ampm={false}
          value={selectedDateTime}
          onChange={(newValue) => setSelectedDateTime(newValue)}
          onAccept={handleAccept}
          minTime={dayjs().hour(10).minute(0)}
          maxTime={dayjs().hour(19).minute(0)}
          renderDay={renderDayWithWarning}
        />
      </LocalizationProvider>
    </div>
  );
}

export default function StaticDateTimePickerLandscape() {
  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      <CalendarComponent />
    </SnackbarProvider>
  );
}
