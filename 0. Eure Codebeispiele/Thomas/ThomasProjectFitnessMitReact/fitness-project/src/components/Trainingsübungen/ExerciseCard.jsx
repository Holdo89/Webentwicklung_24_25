import React from 'react';
import '../../styles/Trainingsplan.css';
import liegestuetze from '../../assets/exercises/liegestütz.png'
import brustpresse from '../../assets/exercises/brustpresse.png'
import fliegende_kurzhantel from '../../assets/exercises/fliegende.png'
import fallback from '../../assets/exercises/fallback.png'


const images ={
  liegestuetze,
  brustpresse,
  fliegende_kurzhantel,
  bankdruecken,
  kabelzug_ueberzuege,
  schraegbankdruecken,
  fliegende_kabelzug,
  dips_ringe,
  einarm_bankdruecken

}



export default function ExerciseCard({ exercise }) {
  const image=images[exercise.image_path] || fallback

  return (
    <div className="exercise-card">
      <img
        src={image}
        alt={exercise.name}
        className="exercise-image"
      />
      <div className="exercise-info">
        <h3>{exercise.name}</h3>
        <p>{exercise.description}</p>
      </div>
    </div>
  );
}
