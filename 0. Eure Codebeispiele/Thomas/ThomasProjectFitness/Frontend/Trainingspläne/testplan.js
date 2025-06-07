const exercises = {
  Brust: [
    {
      name: "Liegestütze",
      youtube: "https://www.youtube.com/embed/IODxDxX7oi4",
      info: "Klassische Brustübung, auch für Schultern und Trizeps."
    },
    {
      name: "Kurzhantel Brustdrücken",
      youtube: "https://www.youtube.com/embed/6sujIbB1D98",
      info: "Stärkt die Brustmuskulatur mit Fokus auf Stabilität."
    }
  ],
  Bizeps: [
    {
      name: "Bizeps Curls",
      youtube: "https://www.youtube.com/embed/ykJmrZ5v0Oo",
      info: "Isolationstraining für den Bizeps. Langsam ausführen!"
    }
  ]
};

const wochenplan = {
  Montag: ["Brust", "Bizeps"],
  Dienstag: "Pause",
  Mittwoch: ["Brust"],
  Donnerstag: "Pause",
  Freitag: ["Bizeps"],
  Samstag: "Pause",
  Sonntag: "Pause"
};

const muscleButtons = document.getElementById("muscleButtons");
const carouselContent = document.getElementById("carouselContent");
const daySelector = document.getElementById("wochentagSelector");
const currentDayTitle = document.getElementById("currentDay");

let currentGroup = "Brust";
let currentSlide = 0;

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
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.innerHTML = `<h3>Heute ist Pause – gönn dir etwas Erholung!</h3>`;
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

function updateButtons(plan) {
  const allButtons = muscleButtons.querySelectorAll("button");
  allButtons.forEach(btn => {
    btn.classList.toggle("active", btn.textContent === currentGroup);
  });
}

function loadExercises() {
  carouselContent.innerHTML = "";

  const groupExercises = exercises[currentGroup];
  groupExercises.forEach(ex => {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.innerHTML = `
      <div class="exercise-left">
        <iframe src="${ex.youtube}" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
      </div>
      <div class="exercise-info">
        <h3>${ex.name}</h3>
        <p>${ex.info}</p>
      </div>
    `;
    carouselContent.appendChild(slide);
  });

  updateCarousel();
}

function moveSlide(dir) {
  const total = exercises[currentGroup].length;
  currentSlide += dir;
  currentSlide = Math.max(0, Math.min(currentSlide, total - 1));
  updateCarousel();
}

function updateCarousel() {
  const width = carouselContent.clientWidth;
  carouselContent.style.transform = `translateX(-${currentSlide * width}px)`;
}

window.addEventListener("resize", updateCarousel);

// Init
const startDay = "Montag";
daySelector.value = startDay;
currentDayTitle.textContent = startDay;
loadDayPlan(startDay);
