import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function LevelCard({ level, onSelect }) {
  const navigate=useNavigate();
  return (
    <div
      className="card"
      style={{ backgroundImage: `url(${level.imageUrl})` }}
      onClick={() => onSelect(level)}
    >
      <div className="card-content">
        <h2>{level.title}</h2>
        <p>{level.description}</p>
      </div>
    </div>
  );
}
