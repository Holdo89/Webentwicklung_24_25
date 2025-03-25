fetch("http://localhost:3000/todos", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    divElement.innerHTML = data.todos;
  });

document.getElementById("button").addEventListener("click", addNew);

function addNew() {
  const listContainer = document.querySelector("#list-container");
  const entry = document.querySelector(".new");
  const inputText = entry.querySelector(".text");

  // Überprüfen, ob das Eingabefeld leer ist oder nur Leerzeichen enthält
  if (inputText.value.length == 0) {
    alert("Bitte eine Aufgabe eingeben!"); // Fehlermeldung anzeigen
    return; // Verhindert das Hinzufügen des neuen Items
  }
  const newItem = document.createElement("div");
  newItem.innerHTML =
    '<span class="item"><input type="checkbox" /><input class="text" value = "' +
    inputText.value +
    '" placeholder="Aufgabe eingeben" /><a>&#x1F58A;</a></span>';

  // Das neue Element zum DOM hinzufügen
  listContainer.appendChild(newItem);

  // Entferne den Inhalt von der "new"-Klasse, um es als Vorlage beizubehalten
  inputText.value = "";

  // Den Event-Listener auf das entrye Element anwenden
  addDeleteEventListener(newItem);
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

// Initiale Event-Listener für die bereits vorhandenen Items
let items = document.querySelectorAll(".item");
items.forEach(function (item) {
  addDeleteEventListener(item); // Den Event-Listener auf jedes bestehende Item anwenden
});
