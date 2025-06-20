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
  const [selectedMuscle, setSelectedMuscle] = useState(1);
  const [level, setLevel] = useState(() => {
  return localStorage.getItem('level') || 'beginner';
});


const getMuscleGroupInfo = (level) => {
  switch (level) {
    case "beginner":
      return ( 
        <div className='checkbox-list'>
        <p>1.Trainingstag = Schulter/Brust/Trizeps<input type='checkbox' className='checkbox1'></input></p>
        <p>2.Trainingstag = Rücken/Bizeps<input type='checkbox' className='checkbox1'></input></p>
        <p>3.Trainingstag = Beine/Bauch<input type='checkbox' className='checkbox1'></input></p>
          </div>
          );
    case "intermediate":
      return ( 
        <div className='checkbox-list'>
        <p>1.Trainingstag = Schulter/Brust</p>
        <p>2.Trainingstag = Beine</p>
        <p>3.Trainingstag = Trizeps/Bizeps</p>
        <p>4.Trainingstag = Rücken/Bauch</p>
          </div>
          );
    case "pro":
      return ( 
        <div className='checkbox-list'>
        <p>1.Trainingstag = Brust/Bizeps</p>
        <p>2.Trainingstag = Beine/Bauch</p>
        <p>3.Trainingstag = Trizeps/Bizeps/Schulter</p>
        <p>4.Trainingstag = Rücken/Bauch</p>
        <p>5.Trainingstag = Beine/Bizeps</p>
          </div>
          );
  }
};





  return (
    <div className='trainingsplan-only'>
      <h1>Trainingsplan</h1>
      <p className="muscle-group-info">{getMuscleGroupInfo(level)}</p>
      <div>
        <label>Muskelgruppe wählen: </label>
        <select
          value={selectedMuscle}
          onChange={(e) => setSelectedMuscle(Number(e.target.value))}
        >
          {muscles.map(muscles => (
            <option key={muscles.id} value={muscles.id}>{muscles.name}</option>
          ))}
        </select>
      </div>

      <ExerciseList level={level} muscle={selectedMuscle} />
    </div>
  );
}
