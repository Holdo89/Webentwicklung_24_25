// Calendar.js
import * as React from "react";
import { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/de";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { useSnackbar, SnackbarProvider } from "notistack";
import CalendarDayDecorator from "./CalendarDayDecorator";
import "./Calendar.css";

dayjs.locale("de");

function CalendarComponent() {
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

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
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
      enqueueSnackbar("Fehler beim Speichern.", {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
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
          renderDay={(day, selectedDates, pickersDayProps) => (
            <CalendarDayDecorator
              date={day}
              selectedDate={selectedDates}
              pickersDayProps={pickersDayProps}
            />
          )}
        />
      </LocalizationProvider>
    </div>
  );
}

// Exportiert mit SnackbarProvider
export default function StaticDateTimePickerLandscape() {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <CalendarComponent />
    </SnackbarProvider>
  );
}
