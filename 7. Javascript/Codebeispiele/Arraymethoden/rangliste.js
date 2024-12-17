const participants = [
    { name: 'Alice', points: 120 },
    { name: 'Bob', points: 80 },
    { name: 'Charlie', points: 95 },
    { name: 'David', points: 110 },
    { name: 'Eva', points: 60 }
  ];
  
  // 1. forEach - Teilnehmer und ihre Punktzahlen ausgeben
  console.log("Teilnehmer und Punktzahlen:");
  participants.forEach(participant => {
    console.log(`${participant.name}: ${participant.points} Punkte`);
  });
  
  // 2. map - Neues Array mit den Namen der Teilnehmer erstellen
  const names = participants.map(participant => participant.name);
  console.log("\nNamen der Teilnehmer:", names);
  
  // 3. filter - Teilnehmer mit mehr als 100 Punkten
  const highScorers = participants.filter(participant => participant.points > 100);
  console.log("\nTeilnehmer mit mehr als 100 Punkten:", highScorers);
  
  
  // 4. sort - Nach Punkten aufsteigend sortieren
  const sortedAscending = [...participants].sort((a, b) => a.points - b.points);
  console.log("\nNach Punkten aufsteigend sortiert:", sortedAscending);
  
  // 5. reverse - Nach Punkten absteigend sortieren
  const sortedDescending = [...sortedAscending].reverse();
  console.log("\nNach Punkten absteigend sortiert (Rangliste):");
  sortedDescending.forEach((participant, index) => {
    console.log(`#${index + 1} ${participant.name}: ${participant.points} Punkte`);
  });
  