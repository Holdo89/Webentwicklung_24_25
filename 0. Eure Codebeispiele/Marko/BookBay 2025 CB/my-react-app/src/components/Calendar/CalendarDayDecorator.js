import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';

export default function CalendarDayDecorator({ date, pickersDayProps }) {
  const [bookingsMap, setBookingsMap] = useState({});

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:3001/bookings');
        const counts = {};

        response.data.forEach((booking) => {
          const dateKey = dayjs(booking.date).format('YYYY-MM-DD');
          counts[dateKey] = (counts[dateKey] || 0) + 1;
        });

        setBookingsMap(counts);
      } catch (error) {
        console.error('Fehler beim Laden der Buchungen:', error);
      }
    };

    fetchBookings();
  }, []);

  const dateKey = date.format('YYYY-MM-DD');
  const count = bookingsMap[dateKey] || 0;

  let emoji = '';
  if (count > 10) emoji = '⛔';
  else if (count > 5) emoji = '⚠️';

  return (
    <Badge overlap="circular" badgeContent={emoji}>
      <PickersDay {...pickersDayProps} />
    </Badge>
  );
}
