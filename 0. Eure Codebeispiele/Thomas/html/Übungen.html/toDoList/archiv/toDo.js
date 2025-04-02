const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");


const tooDoo =[
    {id:1, doDo:"play golf"},
    {id:2, doDo:"play football"},
    {id:3, doDo:"play tennis"}
 ];
 function displayFixedTasks() {
    tooDoo.forEach(task => addTask(task.doDo));}

    function addTask(taskText = null) {
        if (taskText === null) {
            taskText = taskInput.value.trim();
            if (taskText === "") return;
        }

    const li = document.createElement("li");
    li.classList.add("task-item");

    const span = document.createElement("span");
    span.textContent = taskText;

    const editButton = document.createElement("button");
    editButton.innerHTML = "✏️";
    editButton.classList.add("edit-btn");
    editButton.onclick = function () {
        const newText = prompt("Bearbeite deine Aufgabe:", span.textContent);
        if (newText !== null && newText.trim() !== "") {
            span.textContent = newText.trim();
        }
    };

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "🗑️";
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = function () {
        taskList.removeChild(li);
    };

    li.appendChild(span);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);

    taskInput.value = "";
}

taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
displayFixedTasks();
 