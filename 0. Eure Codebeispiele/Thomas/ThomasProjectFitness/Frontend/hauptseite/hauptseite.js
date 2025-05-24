
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

  function neuerTipp(){
  const zufallsTipp = tipps[Math.floor(Math.random() * tipps.length)];
  document.getElementById("tipp-text").textContent = zufallsTipp;
  }
  const username=localStorage.getItem("username")
  const email=localStorage.getItem("email")
  document.getElementById("usernameDisplay").innerText = `Willkommen, ${username}!`;

  const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const markDoneBtn = document.getElementById("markDoneBtn");

let totalDays = 7;
let completedDays = 0;

function updateProgress() {
  const percent = (completedDays / totalDays) * 100;
  progressBar.style.width = percent + "%";
  progressText.textContent = `${completedDays} von ${totalDays} Trainingstagen erledigt`;

  if (completedDays === totalDays) {
    markDoneBtn.textContent = "Alles erledigt! 🎉";
    markDoneBtn.disabled = true;
  }
}

markDoneBtn.addEventListener("click", () => {
  if (completedDays < totalDays) {
    completedDays++;
    updateProgress();
  }
});

// Initial update
updateProgress();

