const carouselInner = document.querySelector('.carousel-inner');
let angle = 0; // Startwinkel

document.getElementById('next').addEventListener('click', () => {
  angle -= 72; // Dreht das Karussell um 72 Grad (360/5)
  carouselInner.style.transform = `rotateY(${angle}deg)`;
});

document.getElementById('prev').addEventListener('click', () => {
  angle += 72; // Dreht das Karussell zurück
  carouselInner.style.transform = `rotateY(${angle}deg)`;
});
