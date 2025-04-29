import React from 'react';
import { Box, TextField, Button, Stack } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default function BookingForm() {
  const [date, setDate] = React.useState(dayjs());

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Buchung gesendet!');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Stack spacing={2}>
          <TextField label="Titel der Buchung" width="500px" />
          <DatePicker label="Datum auswählen" value={date} onChange={setDate} />
          <TextField label="Bemerkung" multiline rows={4} width="200px" />
          <Button type="submit" variant="contained">Buchen</Button>
        </Stack>
      </Box>
    </LocalizationProvider>
  );
}
