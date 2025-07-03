import React from 'react';
import { navigate, useNavigate } from 'react-router-dom';

export default function TextBlock() {
  const navigate=useNavigate();
  return (
    <div className="text">
      <h1>
        Imperial Fitness
      </h1>
      <p>Trainiere smarter. Werde stärker. Hol dir deinen Traumkörper.</p>
      <button className="button_start" onClick={()=>navigate("login")}>Starte jetzt</button>
    </div>
  );
}
