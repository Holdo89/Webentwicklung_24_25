
  const tipps = [
    "Trink heute mindestens 2 Liter Wasser!",
    "Mach eine 5-minütige Dehneinheit am Morgen.",
    "Versuche heute 10.000 Schritte zu gehen.",
    "Iss heute eine Portion extra Gemüse.",
    "Vermeide Zucker am Abend für besseren Schlaf.",
    "Gönn dir heute bewusst eine Pause zur Regeneration.",
    "Lächle denn positive Einstellung hilft beim Training!",
    "Verschieb nicht was auf morgen was du heute erledigen kannst"
  ];

  const zufallsTipp = tipps[Math.floor(Math.random() * tipps.length)];
  document.getElementById("tipp-text").textContent = zufallsTipp;

  const username=localStorage.getItem("username")
  const email=localStorage.getItem("email")
  document.getElementById("usernameDisplay").innerText = `Willkommen, ${username}!`;
