import * as React from 'react';
import { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import './Calendar.css';

dayjs.locale('de');

export default function StaticDateTimePickerLandscape() {
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const handleAccept = async (value) => {
    if (!value) return;

    try {
      await axios.post('http://localhost:3001/bookings', {
        title: 'Beratung',
        date: value.format('YYYY-MM-DD HH:mm:ss'),
      });

      alert('Termin erfolgreich gespeichert!');
    } catch (error) {
      console.error('Fehler beim Speichern:', error);
      alert('Fehler beim Speichern.');
    }
  };

  return (
    <div className="calendar-container">
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="de"
      >
        <StaticDateTimePicker
          orientation="landscape"
          ampm={false}
          value={selectedDateTime}
          onChange={(newValue) => setSelectedDateTime(newValue)}
          onAccept={handleAccept}
        />
      </LocalizationProvider>
    </div>
  );
}
