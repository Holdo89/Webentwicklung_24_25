document.getElementById("button").addEventListener("click", addNew);

function addNew() {
  const aktuell = document.querySelectorAll(".item");

  const neu = document.querySelector(".new");
  const newItem = neu.cloneNode(true);

  // Das neue Element zum DOM hinzufügen
  if (aktuell.length > 0) {
    aktuell[aktuell.length - 1].parentNode.appendChild(newItem);
  }

  // Entferne den Inhalt von der "new"-Klasse, um es als Vorlage beizubehalten
  newItem.querySelector(".text").value = "";

  // Den Event-Listener auf das neue Element anwenden
  addDeleteEventListener(newItem);

  // Den Button am Ende der Liste positionieren
  positionButtonAtEnd();
}

// Event-Listener für das Löschen eines Items hinzufügen
function addDeleteEventListener(item) {
  item.addEventListener("click", function (event) {
    // Wenn das angeklickte Element die Checkbox ist und sie angekreuzt ist
    let checkbox = event.target;

    if (checkbox.type === "checkbox" && checkbox.checked) {
      // Das übergeordnete div löschen
      item.remove();
    }
  });
}

// Den Button immer am Ende der Liste positionieren
function positionButtonAtEnd() {
  const button = document.getElementById("button");
  const listContainer = document.getElementById("list-container");

  // Verschiebt den Button an das Ende des Containers
  listContainer.appendChild(button);
}

// Initiale Event-Listener für die bereits vorhandenen Items
let items = document.querySelectorAll(".item");
items.forEach(function (item) {
  addDeleteEventListener(item); // Den Event-Listener auf jedes bestehende Item anwenden
});
