import React from 'react';

export default function TextBlock() {
  return (
    <div className="text">
      <h1>
        Jetzt durchstarten<br />
        mit <span className="highlight">Imperial Fitness</span>
      </h1>
      <p>Trainiere smarter. Werde stärker. Hol dir deinen Traumkörper.</p>
      <a href="/login" className="button">Starte jetzt</a>
    </div>
  );
}
