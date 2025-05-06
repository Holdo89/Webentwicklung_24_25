document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector('.navbar');
  const fahrzeugeSection = document.getElementById('fahrzeuge'); // ← Hier korrekter ID-Wert!
  const aufbereitungSection = document.getElementById('aufbereitung');
  const kontaktSection = document.getElementById('kontakt');
  const terminSection = document.getElementById('termin');
  const introSplitSection = document.getElementById('intro-split');  // Das ist die Sektion mit den Bildern

  let navbarVisible = false;

  // Observer für das Scrollen
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      // Wenn eine der relevanten Sektionen im Sichtbereich ist und die Navbar nicht schon sichtbar ist
      if (entry.target === fahrzeugeSection || entry.target === aufbereitungSection || entry.target === kontaktSection || entry.target === terminSection) {
        if (entry.isIntersecting && !navbarVisible) {
          navbar.classList.add('visible');  // Navbar anzeigen
          navbarVisible = true;
        }
      } else if (entry.target === introSplitSection) {
        // Wenn die Intro-Split-Sektion sichtbar ist, die Navbar ausblenden
        if (entry.isIntersecting) {
          navbar.classList.remove('visible');  // Navbar ausblenden
          navbarVisible = false;
        }
      }
    });
  }, { threshold: 0.1 });

  // Beobachte alle relevanten Sektionen
  observer.observe(fahrzeugeSection);
  observer.observe(aufbereitungSection);
  observer.observe(kontaktSection);
  observer.observe(terminSection);
  observer.observe(introSplitSection);  // Auch die Intro-Split-Sektion beobachten

  // Formularabsendung abfangen
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const status = document.getElementById("formStatus");
      status.textContent = "Vielen Dank für Ihre Nachricht!";
      status.style.color = "green";
      this.reset();
    });
  }
});
