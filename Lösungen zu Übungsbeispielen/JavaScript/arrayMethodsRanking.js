const participants = [
    { name: 'Alice', points: 120 },
    { name: 'Bob', points: 80 },
    { name: 'Charlie', points: 95 },
    { name: 'David', points: 110 },
    { name: 'Eva', points: 60 }
  ];


// 1. Jeden Teilnehmer und seine Punktzahl ausgeben
participants.forEach(participant => {
    console.log(`${participant.name}: ${participant.points} Punkte`);
  });
  
  // 2. Ein neues Array mit nur den Namen der Teilnehmer erstellen
  const names = participants.map(participant => participant.name);
  console.log('Namen der Teilnehmer:', names);
  
  // 3. Ein neues Array mit Teilnehmern, die mehr als 100 Punkte haben, erstellen
  const highScorers = participants.filter(participant => participant.points > 100);
  console.log('Teilnehmer mit mehr als 100 Punkten:', highScorers);
  
  // 4. Die Liste der Teilnehmer nach ihren Punktzahlen sortieren (aufsteigend)
  const sortedParticipants = participants.sort((a, b) => a.points - b.points);
  console.log('Sortierte Rangliste (aufsteigend):', sortedParticipants);
  
  // 5. Die Liste in absteigender Reihenfolge sortieren
  const reverseSortedParticipants = sortedParticipants.reverse();
  console.log('Sortierte Rangliste (absteigend):', reverseSortedParticipants);
  
  // 6. Die sortierte Rangliste ausgeben
  console.log('Endgültige Rangliste:');
  reverseSortedParticipants.forEach(participant => {
    console.log(`${participant.name}: ${participant.points} Punkte`);
  });
  