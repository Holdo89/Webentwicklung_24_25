import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/de";
import axios from "axios";
import { useSnackbar } from "notistack";
import Badge from "@mui/material/Badge";
import { LocalizationProvider, StaticDateTimePicker, PickersDay } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./Calendar.css";

dayjs.locale("de");

const FULLY_BOOKED_LIMIT = 10;
const HALF_BOOKED_LIMIT = 5;

export default function Calendar({ onDateTimeSelected }) {
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [bookingsCount, setBookingsCount] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/bookingsCount");
        setBookingsCount(data);
      } catch (error) {
        enqueueSnackbar("Fehler beim Laden der Buchungen", { variant: "error" });
      }
    };

    fetchBookings();
  }, [enqueueSnackbar]);

  const handleDateAccept = (date) => {
    if (!date || date.isBefore(dayjs())) {
      enqueueSnackbar("Datum ungültig oder in der Vergangenheit", { variant: "warning" });
      return;
    }

    onDateTimeSelected?.(date);
    setSelectedDateTime(null);
  };

  const getBadgeForDay = (count) => {
    if (count >= FULLY_BOOKED_LIMIT) return "❌";
    if (count >= HALF_BOOKED_LIMIT) return "⚠️";
    return null;
  };

  const renderDay = (day, _, pickersDayProps) => {
    const dateKey = day.startOf("day").format("YYYY-MM-DD");
    const count = bookingsCount[dateKey] || 0;
    const badge = getBadgeForDay(count);

    return (
      <Badge overlap="circular" badgeContent={badge}>
        <PickersDay {...pickersDayProps} />
      </Badge>
    );
  };

  return (
    <div className="calendar-container">
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
        <StaticDateTimePicker
          orientation="landscape"
          ampm={false}
          value={selectedDateTime}
          onChange={setSelectedDateTime}
          onAccept={handleDateAccept}
          minTime={dayjs().hour(12).minute(0)}
          maxTime={dayjs().hour(15).minute(0)}
          renderDay={renderDay}
        />
      </LocalizationProvider>
    </div>
  );
}