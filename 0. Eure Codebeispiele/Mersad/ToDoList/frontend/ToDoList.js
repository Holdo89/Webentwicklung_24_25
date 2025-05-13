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
        <input type="checkbox" class="checkbox" />
        <input class="text" value="${task.todo}" id="${task.id}" readonly />
        <button class="delete-btn" disabled>&#x1F5D1;</button>
      `;

      document.getElementById("todo").appendChild(newItem);

      // Event-Listener für Checkbox und Löschen hinzufügen
      addCheckboxEventListener(newItem);
    });
  });

document.getElementById("button").addEventListener("click", addNew);

function postNewTodo() {
  const newTodo = document.getElementById("eingabe").value;
  fetch("http://localhost:3000/newTodo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task: newTodo }),
  });
}

function deleteTodo(item) {
  const oldTodoId = item.querySelector(".text").id;
  fetch("http://localhost:3000/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: oldTodoId }),
  })
    .then((response) =>
      response.json().then((data) => ({ status: response.status, body: data }))
    )
    .then(({ status, body }) => {
      if (status === 200) {
        item.remove();
      } else {
        alert("Fehler beim Löschen! Server-Antwort: " + JSON.stringify(body));
      }
    })
    .catch((error) => console.error("Fehler:", error));
}

function addNew() {
  const listContainer = document.querySelector("#todo");
  const inputText = document.querySelector("#eingabe");

  if (inputText.value.trim().length === 0) {
    alert("Bitte eine Aufgabe eingeben!");
    return;
  }

  // Neues Element erstellen
  const newItem = document.createElement("div");
  newItem.classList.add("item");
  newItem.innerHTML = `
    <input type="checkbox" class="checkbox" />
    <input class="text" value="${inputText.value}" readonly />
    <button class="delete-btn" disabled>&#x1F5D1;</button>
  `;

  listContainer.appendChild(newItem);

  postNewTodo();

  // Eingabefeld leeren
  inputText.value = "";

  // Event-Listener für Checkbox und Löschen hinzufügen
  addCheckboxEventListener(newItem);
}

// Event-Listener für die Checkbox hinzufügen
function addCheckboxEventListener(item) {
  let checkbox = item.querySelector(".checkbox");
  let deleteBtn = item.querySelector(".delete-btn");

  if (!checkbox || !deleteBtn) {
    return;
  }

  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      item.classList.add("completed");
      deleteBtn.disabled = false;
    } else {
      item.classList.remove("completed");
      deleteBtn.disabled = true;
    }
  });

  deleteBtn.addEventListener("click", function () {
    if (checkbox.checked) {
      deleteTodo(item);
    }
  });
}

const items = document.querySelectorAll(".item");
if (items.length === 0) {
  console.warn("Es gibt keine .item-Elemente zum Initialisieren.");
} else {
  items.forEach(addCheckboxEventListener);
}

// Bestehende Items initialisieren
document.querySelectorAll(".item").forEach((item) => {
  if (!item.classList.contains("new")) {
    addCheckboxEventListener(item);
  }
});
