import React, { useEffect, useState } from 'react';
import ExerciseList from '../../components/Trainingsübungen/ExerciseList';
import TrainingstagButton from '../../components/Trainingsübungen/TrainingsTagButton';
import '../../styles/TrainingstagButton.css';


const muscles = [
  { id: 1, name: "Brust" },
  { id: 2, name: "Schulter" },
  { id: 3, name: "Bauch" },
  { id: 4, name: "Trizeps" },
  { id: 5, name: "Bizeps" },
  { id: 6, name: "Beine" },
  { id: 7, name: "Rücken" },
];

const trainingPlanData = {
  beginner: [
    { tag: 1, label: '1. Trainingstag', muscles: 'Schulter/Brust/Trizeps' },
    { tag: 2, label: '2. Trainingstag', muscles: 'Rücken/Bizeps' },
    { tag: 3, label: '3. Trainingstag', muscles: 'Beine/Bauch' },
  ],
  intermediate: [
    { tag: 1, label: '1. Trainingstag', muscles: 'Schulter/Brust' },
    { tag: 2, label: '2. Trainingstag', muscles: 'Beine' },
    { tag: 3, label: '3. Trainingstag', muscles: 'Trizeps/Bizeps' },
    { tag: 4, label: '4. Trainingstag', muscles: 'Rücken/Bauch' },
  ],
  pro: [
    { tag: 1, label: '1. Trainingstag', muscles: 'Brust/Bizeps' },
    { tag: 2, label: '2. Trainingstag', muscles: 'Beine/Bauch' },
    { tag: 3, label: '3. Trainingstag', muscles: 'Trizeps/Bizeps/Schulter' },
    { tag: 4, label: '4. Trainingstag', muscles: 'Rücken/Bauch' },
    { tag: 5, label: '5. Trainingstag', muscles: 'Beine/Bizeps' },
  ],
};


export default function Trainingsplan() {
const [selectedMuscle, setSelectedMuscle] = useState(1);
  const [level, setLevel] = useState(() => localStorage.getItem('level') || 'beginner');
  const [completedTags, setCompletedTags] = useState([]);

  
  const toggleTag = (tag) => {
    if (completedTags.includes(tag)) {
      setCompletedTags(completedTags.filter(trainingstag => trainingstag !== tag));
    } else {
      setCompletedTags([...completedTags, tag]);
    }
  };


  return (
    <div className='trainingsplan-only'>
      <h1>Wochenplan</h1>
       <div className="trainingstage-container">
        {trainingPlanData[level].map(({ tag, label, muscles }) => (
          <div key={tag} className="trainingstag-row">
            <span className="trainingstag-label">
              {label} = {muscles}
            </span>
            <TrainingstagButton 
              tag={tag} 
              completed={completedTags.includes(tag)} 
              onToggle={toggleTag} 
            />
          </div>
  ))}
</div>

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
