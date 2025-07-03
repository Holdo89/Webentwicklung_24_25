// import React, { useState, useEffect } from "react";
// import dayjs from "dayjs";
// import "dayjs/locale/de";
// import axios from "axios";
// import { useSnackbar } from "notistack";
// import { LocalizationProvider, StaticDateTimePicker, PickersDay } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import "./Calendar.css";

// dayjs.locale("de");

// const FULLY_BOOKED_LIMIT = 10;
// const HALF_BOOKED_LIMIT = 5;

// export default function Calendar({ onDateTimeSelected }) {
//   const [selectedDateTime, setSelectedDateTime] = useState(null);
//   const [bookingsCount, setBookingsCount] = useState({});
//   const { enqueueSnackbar } = useSnackbar();

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const { data } = await axios.get("http://localhost:3001/bookingsCount");
//         console.log("Bookings Count:", data); 
//         setBookingsCount(data);
//       } catch (error) {
//         enqueueSnackbar("Fehler beim Laden der Buchungen", { variant: "error" });
//       }
//     };

//     fetchBookings();
//   }, [enqueueSnackbar]);

//   const handleDateAccept = (date) => {
//     if (!date || date.isBefore(dayjs())) {
//       enqueueSnackbar("Datum ungültig oder in der Vergangenheit", { variant: "warning" });
//       return;
//     }

//     const dateKey = date.startOf("day").format("YYYY-MM-DD");
//     const count = bookingsCount[dateKey] || 0;

//     if (count >= FULLY_BOOKED_LIMIT) {
//       enqueueSnackbar("Dieser Tag ist bereits voll ausgebucht.", { variant: "error" });
//       return;
//     }

//     onDateTimeSelected?.(date);
//     setSelectedDateTime(null);
//   };

//   const renderDay = (day, _, pickersDayProps) => {
//     const dateKey = day.startOf("day").format("YYYY-MM-DD");
//     const count = bookingsCount[dateKey] || 0;

//     let bgColor = "transparent";
//     if (count >= FULLY_BOOKED_LIMIT) {
//       bgColor = "#ff0000"; // rot
//     } else if (count >= HALF_BOOKED_LIMIT) {
//       bgColor = "#ffeb3b"; // gelb
//     }

//     return (
//       <PickersDay
//         {...pickersDayProps}
//         sx={{
//           backgroundColor: bgColor,
//           borderRadius: "50%",
//           color: bgColor === "#ffeb3b" ? "black" : "white",
//           "&:hover, &.Mui-selected": {
//             backgroundColor: bgColor,
//           },
//         }}
//       />
//     );
//   };

//   return (
//     <div className="calendar-container">
//       <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
//         <StaticDateTimePicker
//           orientation="landscape"
//           ampm={false}
//           value={selectedDateTime}
//           onChange={setSelectedDateTime}
//           onAccept={handleDateAccept}
//           minTime={dayjs().hour(12).minute(0)}
//           maxTime={dayjs().hour(15).minute(0)}
//           renderDay={renderDay}
//         />
//       </LocalizationProvider>
//     </div>
//   );
// }
import * as React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/de';

import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';

dayjs.locale('de');


function ServerDay({ bookedDays = {}, day, outsideCurrentMonth, ...other }) {
  const dateStr = day.format('DD.MM.YYYY');
  const isHalfBooked = bookedDays[dateStr] >= 5;

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={isHalfBooked ? '😊' : undefined}
    >
      <PickersDay 
        {...other} 
        outsideCurrentMonth={outsideCurrentMonth} 
        day={day}
      />
    </Badge>
  );
}

const BookingCalendar = ({ onDateSelect, bookedDays }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [today] = React.useState(dayjs('DD.MM.YYYY'));

  const handleDateChange = (date) => {
    if (onDateSelect) {
      onDateSelect(date.format('DD.MM.YYYY'));
    }
  };

  return (
    <LocalizationProvider 
      dateAdapter={AdapterDayjs}
      adapterLocale="de"
    >
      <DateCalendar
        defaultValue={today}
        loading={isLoading}
        onChange={handleDateChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: (props) => (
            <ServerDay 
              {...props} 
              bookedDays={bookedDays}
            />
          ),
        }}
      />
    </LocalizationProvider>
  );

};

export default BookingCalendar;