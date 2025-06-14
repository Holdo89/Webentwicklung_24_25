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

function CalendarComponent({ onBookingAdded }) {
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [bookingsCount, setBookingsCount] = useState({});
  const { enqueueSnackbar } = useSnackbar();

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

    const userStr = localStorage.getItem("user");
    if (!userStr) {
      enqueueSnackbar("User nicht angemeldet!", {
        variant: "error",
        autoHideDuration: 3000,
      });
      return;
    }

    const user = JSON.parse(userStr);

    try {
      const res = await axios.post("http://localhost:3001/bookings", {
        title: "Geburtstagsfeier",
        date: value.format("YYYY-MM-DD HH:mm:ss"),
        userId: user.id,
      });

      enqueueSnackbar("Termin erfolgreich gespeichert!", {
        variant: "success",
      });
      setSelectedDateTime(null);

      const dayStr = value.format("YYYY-MM-DD");
      setBookingsCount((prev) => ({
        ...prev,
        [dayStr]: (prev[dayStr] || 0) + 1,
      }));

      if (onBookingAdded) {
        onBookingAdded({
          id: res.data.id,
          title: res.data.title,
          firstName: res.data.firstName || "",
          lastName: res.data.lastName || "",
          date: res.data.date,
          time: res.data.time,
        });
      }
    } catch (error) {
      console.error(
        "Fehler beim Speichern:",
        error?.response?.data || error.message
      );
      enqueueSnackbar(
        "Fehler beim Speichern: " + (error?.response?.data || error.message),
        {
          variant: "error",
          autoHideDuration: 5000,
        }
      );
    }
  };

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

export default function StaticDateTimePickerLandscape({ onBookingAdded }) {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <CalendarComponent onBookingAdded={onBookingAdded} />
    </SnackbarProvider>
  );
}
