const listContainer = document.getElementById("liste");
const inputField = document.getElementById("text");
const addButton = document.getElementById("button");


function addTaskTo(taskText) {
  let newListItem = document.createElement("li");
  newListItem.innerHTML = `
    <input type="checkbox" class="line">
    <span>${taskText}</span>
    <button class="delete">X</button>
  `;

  listContainer.appendChild(newListItem);

  newListItem.querySelector(".delete").onclick = () => {
    newListItem.remove();
  };

  newListItem.querySelector(".line").onclick = (event) => {
    const textElement = newListItem.querySelector("span");
    textElement.style.textDecoration = event.target.checked
      ? "line-through"
      : "none";
  };
}

function fetchToDoList() {
  fetch("http://localhost:3000/toDo", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((task) => addTaskTo(task.title));
    })
    .catch((error) =>
      console.error("Fehler beim Abrufen der To-Do-Liste:", error)
    );
}

fetchToDoList();

function addNewTask() {
  let newTaskText = inputField.value.trim();
  if (newTaskText === "") return;

  addTaskTo(newTaskText);
  postNewToDo();
  inputField.value = "";
}
addButton.onclick = addNewTask;

function postNewToDo() {
  const newToDo = document.getElementById("text").value;
  fetch("http://localhost:3000/newToDo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task: newToDo }),
  });
}
