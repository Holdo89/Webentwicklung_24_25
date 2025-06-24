import React, { useEffect, useState } from 'react';
import '../../styles/Trainingsplan.css';
import liegestuetze from '../../assets/exercises/liegestütz.png'
import brustpresse from '../../assets/exercises/brustpresse.png'
import fliegende_kurzhantel from '../../assets/exercises/fliegende.png'
import fallback from '../../assets/exercises/fallback.png'
import bankdruecken from '../../assets/exercises_fortgeschritten/brustlanghantel.png'
import dips_ringe from '../../assets/exercises_pro/dipss.png'
import ExerciseModal from './ExerciseModal';

const images ={
  liegestuetze,
  brustpresse,
  fliegende_kurzhantel,
  bankdruecken,
  dips_ringe
  //kabelzug_ueberzuege,
  //schraegbankdruecken,
  //fliegende_kabelzug,
  //dips_ringe,
  //einarm_bankdruecken

}



export default function ExerciseCard({ exercise }) {
  const [showModal, setShowModal] = useState(false);
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
          <button type='button' onClick={() => setShowModal(true)} className="button-more-info">
              Mehr Infos
        </button>
      </div>
      {showModal && (
        <ExerciseModal
          exercise={exercise}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
