fetch("http://localhost:3000/todos", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    data.forEach((task) => {
      const newItem = document.createElement("div");
      newItem.classList.add("item");
      newItem.innerHTML = `
        <input type="checkbox" />
        <input class="text" value="${task.todo}" />
        <a>&#x1F58A;</a>
      `;

      document.getElementById("todo").appendChild(newItem);

      // Event-Listener für das Löschen hinzufügen
      addDeleteEventListener(newItem);
    });
  });

document.getElementById("button").addEventListener("click", addNew);

function addNew() {
  const listContainer = document.querySelector("#todo"); // Der Hauptcontainer
  const inputText = document.querySelector("#eingabe");

  if (inputText.value.trim().length === 0) {
    alert("Bitte eine Aufgabe eingeben!");
    return;
  }

  // Neues Element erstellen
  const newItem = document.createElement("div");
  newItem.classList.add("item");
  newItem.innerHTML = `
    <input type="checkbox" />
    <input class="text" value="${inputText.value}" placeholder="Aufgabe eingeben" />
    <a>&#x1F58A;</a>
  `;

  // Vor der ".new.item" einfügen, damit es nicht verschachtelt wird
  const newItemForm = document.querySelector(".new");
  listContainer.appendChild(newItem);

  // Eingabefeld leeren
  inputText.value = "";

  // Event-Listener für das Löschen hinzufügen
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
