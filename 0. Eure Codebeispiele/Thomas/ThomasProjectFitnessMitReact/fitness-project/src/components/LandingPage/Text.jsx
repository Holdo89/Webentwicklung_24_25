import React from 'react';
  import { Navigate, useNavigate } from 'react-router-dom';

export default function TextBlock() {
  const navigate=useNavigate();
  return (
    <div className="text">
      <h1>
        Imperial Fitness
      </h1>
      <p>Trainiere smarter. Werde stärker. Hol dir deinen Traumkörper.</p>
      <button className="button" onClick={()=>navigate("login")}>Starte jetzt</button>
    </div>
  );
}
