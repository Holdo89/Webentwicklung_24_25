import React, { useEffect, useState } from 'react';
import ExerciseList from '../../components/Trainingsübungen/ExerciseList';


const muscles = [
  { id: 1, name: "Brust" },
  { id: 2, name: "Schulter" },
  { id: 3, name: "Bauch" },
  { id: 4, name: "Trizeps" },
  { id: 5, name: "Bizeps" },
  { id: 6, name: "Beine" },
  { id: 7, name: "Rücken" },
];

export default function Trainingsplan() {
  const [level, setLevel] = useState("beginner");
  const [selectedMuscle, setSelectedMuscle] = useState(1);

  useEffect(() => {
  const savedLevel = localStorage.getItem('level');
  if (savedLevel) {
    setLevel(savedLevel);
  }
}, []);

  return (
    <div>
      <h1>Trainingsplan</h1>
      <div>
        <label>Muskelgruppe wählen: </label>
        <select
          value={selectedMuscle}
          onChange={(e) => setSelectedMuscle(Number(e.target.value))}
        >
          {muscles.map(m => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>
      </div>

      <ExerciseList level={level} muscle={selectedMuscle} />
    </div>
  );
}
