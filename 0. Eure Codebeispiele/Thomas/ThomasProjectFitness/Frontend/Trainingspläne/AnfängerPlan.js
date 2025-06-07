// Übungen pro Muskelgruppe
const exercises = {
  Brust: [
    { name: "Liegestütze", youtube: "https://www.youtube.com/embed/IODxDxX7oi4" },
    { name: "Kurzhantel Brustdrücken", youtube: "https://www.youtube.com/embed/6sujIbB1D98" }
  ],
  Bizeps: [
    { name: "Bizeps Curls", youtube: "https://www.youtube.com/embed/ykJmrZ5v0Oo" },
    { name: "Konzentrationscurl", youtube: "https://www.youtube.com/embed/u2v0R4pMumk" }
  ],
  Schultern: [
    { name: "Schulterdrücken", youtube: "https://www.youtube.com/embed/B-aVuyhvLHU" },
    { name: "Seitheben", youtube: "https://www.youtube.com/embed/3VcKaXpzqRo" }
  ],
  Trizeps: [
    { name: "Pull downs", youtube: "https://www.youtube.com/embed/0WEot369EfE" },
    { name: "Dips", youtube: "https://www.youtube.com/embed/SXBksC78v8M" }
  ],
  Beine: [
    { name: "Kniebeugen", youtube: "https://www.youtube.com/embed/aclHkVaku9U" },
    { name: "Ausfallschritte", youtube: "https://www.youtube.com/embed/QF0BQS2W80k" }
  ],
  
  
};


const wochenplan = {
  Montag: ["Brust", "Bizeps"],
  Dienstag: "Pause",
  Mittwoch: ["Schultern", "Trizeps"],
  Donnerstag: "Pause",
  Freitag: ["Beine"],
  Samstag: ["Brust"],
  Sonntag: "Pause"
};

let currentGroup = "Brust";
let currentSlide = 0;

const muscleButtons = document.getElementById("muscleButtons");
const carouselContent = document.getElementById("carouselContent");
const daySelector = document.getElementById("wochentagSelector");
const currentDayTitle = document.getElementById("currentDay");


daySelector.addEventListener("change", () => {
  const selectedDay = daySelector.value;
  currentDayTitle.textContent = selectedDay;
  loadDayPlan(selectedDay);
});


function loadDayPlan(day) {
  const plan = wochenplan[day];
  muscleButtons.innerHTML = "";
  carouselContent.innerHTML = "";

  if (plan === "Pause") {
    const randomIndex = Math.floor(Math.random() * pauseImages.length);
    const imgSrc = pauseImages[randomIndex];

    const slide = document.createElement("div");
  slide.className = "slide";
  slide.innerHTML = `
    <img src="${imgSrc}" alt="Ruhetag Bild" style="max-width:100%; height:auto; border-radius:10px; margin-bottom:10px;">
    <h3>Heute ist Pause, gönn dir</h3>
    <p style=";font-size:20px; color:#666;">Gönn dir eine Pause!</p>
  `;
  carouselContent.appendChild(slide);
  return;

  }



  plan.forEach(group => {
    const btn = document.createElement("button");
    btn.textContent = group;
    btn.onclick = () => {
      currentGroup = group;
      currentSlide = 0;
      loadExercises();
      updateButtons(plan);
    };
    muscleButtons.appendChild(btn);
  });

  currentGroup = plan[0];
  currentSlide = 0;
  loadExercises();
  updateButtons(plan);
}

// Aktive Muskelgruppen-Buttons hervorheben
function updateButtons(plan) {
  const allButtons = muscleButtons.querySelectorAll("button");
  allButtons.forEach(btn => {
    btn.classList.toggle("active", btn.textContent === currentGroup);
  });
}

// Übungen für aktuelle Muskelgruppe laden
function loadExercises() {
  carouselContent.innerHTML = "";

  const groupExercises = exercises[currentGroup];
  groupExercises.forEach(ex => {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.innerHTML = `
      <iframe src="${ex.youtube}" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
      <h3>${ex.name}</h3>
    `;
    carouselContent.appendChild(slide);
  });

  updateCarousel();
}

// Karussell verschieben
function moveSlide(direction) {
  const total = exercises[currentGroup].length;
  currentSlide += direction;

  if (currentSlide < 0) {
    currentSlide = 0;
  } else if (currentSlide >= total) {
    currentSlide = total - 1;
  }

  updateCarousel();
}

// Karussellanzeige aktualisieren
function updateCarousel() {
  const width = carouselContent.clientWidth;
  carouselContent.style.transform = `translateX(-${currentSlide * width}px)`;
}

// Seite initial mit Montag starten
const startDay = "Montag";
daySelector.value = startDay;
currentDayTitle.textContent = startDay;
loadDayPlan(startDay);

// Responsives Verhalten
window.addEventListener("resize", updateCarousel);

const pauseImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=600&q=80"
];



