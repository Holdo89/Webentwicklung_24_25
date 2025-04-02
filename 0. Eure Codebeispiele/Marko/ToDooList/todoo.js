

// document.addEventListener("DOMContentLoaded", function () {
//   const inputField = document.getElementById("newText");
//   const addButton = document.querySelector(".klick");
//   const deleteButton = document.querySelector(".delete");
//   const listsContainer = document.getElementById("todo");

  

//   addButton.addEventListener("click", function () {
//     const newTask = inputField.value.trim();
//     console.log(newTask)
//     if (newTask !== "") {
//       const newDiv = document.createElement("div");
//       newDiv.innerHTML = `
//                 <input type="checkbox" class="task-checkbox" />
//                 <input type="text" value="${newTask}" />
//             `;
//       listsContainer.insertBefore(newDiv, listsContainer.lastElementChild);
//       inputField.value = "";
//     }
//   });

//   deleteButton.addEventListener("click", function () {
//     const checkboxes = document.querySelectorAll(
//       ".lists input[type='checkbox']:checked"
//     );
//     checkboxes.forEach((checkbox) => {
//       checkbox.parentElement.remove();
//     });
//   });
// });


// fetch("http://localhost:8090/todo", {
//   method: "GET",
//   headers: { "Content-Type": "application/json" },
// })
//   .then((response) => response.json())
//   .then((data) => {
//     data.forEach((task) => addTask(task.todo));
//   });

document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.getElementById("newText");
  const addButton = document.querySelector(".klick");
  const deleteButton = document.querySelector(".delete");
  const listsContainer = document.getElementById("todo");

  function addTask(text) {
    const newDiv = document.createElement("div");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-checkbox");

    const taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.value = text;

    newDiv.appendChild(checkbox);
    newDiv.appendChild(taskInput);
    listsContainer.appendChild(newDiv);
  }

  addButton.addEventListener("click", function () {
    const newTask = inputField.value.trim();
    if (newTask !== "") {
      addTask(newTask);
      inputField.value = "";
    }
  });

  deleteButton.addEventListener("click", function () {
    const checkboxes = document.querySelectorAll(".lists input[type='checkbox']:checked");
    checkboxes.forEach((checkbox) => checkbox.parentElement.remove());
  });


  fetch("http://localhost:8090/todo", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((task) => addTask(task.title)); 
    })
    .catch((error) => console.error("Error fetching data:", error));
});
