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
      ]
    };

    let currentGroup = "Brust";
    let currentSlide = 0;

    const muscleButtons = document.getElementById("muscleButtons");
    const carouselContent = document.getElementById("carouselContent");

    
    function createButtons() {
      for (let group in exercises) {
        const btn = document.createElement("button");
        btn.textContent = group;
        btn.onclick = () => {
          currentGroup = group;
          currentSlide = 0;
          loadExercises();
          updateButtons();
        };
        muscleButtons.appendChild(btn);
      }
      updateButtons();
    }

   
    function updateButtons() {
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
          <iframe src="${ex.youtube}" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
          <h3>${ex.name}</h3>
        `;
        carouselContent.appendChild(slide);
      });

      updateCarousel();
    }

    
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

    function updateCarousel() {
      const width = carouselContent.clientWidth;
      carouselContent.style.transform = `translateX(-${currentSlide * width}px)`;
    }

    // Start
    createButtons();
    loadExercises();
    window.addEventListener("resize", updateCarousel);