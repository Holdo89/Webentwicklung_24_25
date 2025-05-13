import React from 'react';
import TimeClockViews from './CalenderTime';
import DateCalendarServerRequest from './CalenderDates';

export default function Calender() {
  return (
    <div
      style={{
        display: 'flex',
        gap: '40px',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '40px',
      }}
    >
      <DateCalendarServerRequest />
      <TimeClockViews />
    </div>
  );
}
