import React from 'react';
import { useParams } from 'react-router-dom';

export default function Buchung() {
  const { datum } = useParams();

  return (
    <div>
      <h1>Buchung für den {datum}</h1>
      {/* Hier kommt später das Buchungsformular */}
    </div>
  );
}
