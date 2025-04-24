document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const status = document.getElementById("formStatus");
    status.textContent = "Vielen Dank für Ihre Nachricht!";
    status.style.color = "green";
    this.reset();
  });
  