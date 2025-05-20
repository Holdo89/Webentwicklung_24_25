import React from 'react';

const BookingForm = () => {
  return (
    <div>
      <h2>Termin buchen</h2>
      <form>
        <input type="text" placeholder="Name" />
        <input type="datetime-local" />
        <button type="submit">Buchen</button>
      </form>
    </div>
  );
};

export default BookingForm;
