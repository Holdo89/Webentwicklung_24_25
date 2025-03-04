document.getElementById("button").addEventListener("click", addNew);

function addNew() {
  const aktuell = document.querySelectorAll("div");

  const neu = document.querySelector("#new");
  const newItem = neu.cloneNode(true);

  if (aktuell.length > 0) {
    aktuell[aktuell.length - 1].parentNode.appendChild(newItem);
  }
  const button = document.getElementById("button");
  document.body.appendChild(button);
}

// Alle div-Elemente mit der Klasse "item" auswählen
let finish = document.querySelectorAll(".item");

finish.forEach(function (item) {
  item.addEventListener("click", start);
});

function start(event) {
  // Finde das Checkbox-Element innerhalb des geklickten divs
  let checkbox = event.target;

  // Prüfen, ob die Checkbox angeklickt wurde
  if (checkbox.classList.contains("checkbox") && checkbox.checked) {
    // Das übergeordnete div (eltern div) löschen
    event.target.parentElement.remove();
  }
}
