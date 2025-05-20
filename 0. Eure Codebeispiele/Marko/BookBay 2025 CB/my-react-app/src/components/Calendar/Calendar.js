import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import "./Calendar.css";

export default function BasicDateCalendar() {
  return (
    <div className="calendar-container">
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar 
      />
    </LocalizationProvider>
    </div>
  );
}