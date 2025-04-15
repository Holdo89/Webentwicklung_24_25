let counter = 0;
let tasksList = document.getElementById('list');
let side2List = document.querySelector('.outList');
loadElements();
function addTask() {
    let add = document.getElementById('task-input');
    let text = add.value.trim();
    let priority = document.querySelector('input[name="priority"]:checked').value;
    if (text === "") {
        alert("Bitte eine Aufgabe eingeben!");
        return;
    }
    let task = {
        text: text,
        priority: priority,
        addedTime:new Date().getTime()
    };
    let taskItem = createTaskElement(task);
    tasksList.appendChild(taskItem);
    add.value = "";
    addNewTask(task);    
}
/*****************set Tasks ******************** */
function createTaskElement(task) {
    let taskItem = document.createElement('li');
    taskItem.innerHTML = `
        <input type="checkbox" class="task-checkbox">
        <li class="task-text" id="${task.id}">${task.text}</li>
        <button class="delete" onclick="deleteTask(this)"><i class="fa-solid fa-trash"></i></button>`;
    taskItem.classList.add(task.priority);
    const checkbox = taskItem.querySelector('.task-checkbox');
    taskItem.classList.toggle('completed', task.completed);

    checkbox.addEventListener('change', function () {
        const isCompleted = checkbox.checked ? 1 : 0;
        taskItem.classList.toggle('completed', isCompleted);
        task.completed = isCompleted;
        updateTask(task, isCompleted);
    });
    return taskItem;
}
/***********************Priority Update************ */
function updatePriority(task) {
    let now = Date.now();
    let oneMinute = 60 * 1000;
    if (task.addedTime && now - task.addedTime > oneMinute) {
        if (task.priority === 'medium') {
            task.priority = 'high';
            task.addedTime = task.addedTime;
            updatePriorityTask(task);
        }
        if (task.priority === 'low') {
            task.priority = 'medium';
            task.addedTime = now;
            updatePriorityTask(task);
        }
    }
}
/******************delete ************************* */
function deleteTask(button) {
    let taskId = button.previousElementSibling.id;
    let taskItem = button.parentElement;
    taskItem.remove();
    deleteTasks(taskId);
}
/******************load************ */
function loadElements() {
    tasksList.innerHTML = "";
    side2List.innerHTML = "";
    counter = 0;
    getTasks();
}
/*****************Enter**************************** */
document.getElementById('task-input').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
});
/************************book*************************** */
document.getElementById('toggleButton').addEventListener("click", function () {
    document.querySelector('.listCont').classList.toggle('active');
});
/******************************************************** */
function getTasks(){
    fetch('http://localhost:5000/tasks', {
        method: 'GET',
        headers: {  'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(tasksArray => {
            let text = document.getElementById('list');
            tasksArray.forEach(task => {
                if(task.id !== null) {
                    let taskItem = createTaskElement(task);
                    text.appendChild(taskItem);
                    if (task.completed) {
                        const checkbox = taskItem.querySelector('input[type="checkbox"]');
                        checkbox.checked = true;
                    }else {
                        updatePriority(task);
                    }
                if (counter < 5 && task.priority === 'high' && !task.completed ) {
                    let copyoftask = document.createElement('li');
                    copyoftask.innerHTML =`<li class="task-text" id="${task.id}">${task.text}</li>`;
                    copyoftask.classList.add(task.priority);
                    side2List.appendChild(copyoftask);
                    counter++;
                }
            }
            });
        });
}
/*************************************************** */
function deleteTasks(id) {
    fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
            loadElements();
            console.log("Task deleted");
        } else {
            console.error('Failed to delete task');
        }
    })
    .catch(error => console.error('Error:', error));
}
/************************************************** */
function addNewTask(task) {
    fetch('http://localhost:5000/tasks/task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    })
    .then(response => {
        if (response.ok) {
            loadElements();
            console.log('Task added');
        } else {
            console.error('Failed to add task');
        }
    })
    .catch(error => console.error('Error:', error));
}
/************************************************* */
function updateTask(task, isCompleted) {
    fetch(`http://localhost:5000/tasks/completed/${task.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: isCompleted })
    })
    .then(response => {
        if (response.ok) {
            loadElements();
            console.log('Task updated');
        } else {
            console.error('Failed to update task');
        }
    })
    .catch(error => console.error('Error:', error));
}
/****************priority********************** */
function updatePriorityTask(task) {
    fetch(`http://localhost:5000/tasks/priority/${task.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priority: task.priority, addedTime: task.addedTime})
    })
    .then(response => {
        if (response.ok) {
            loadElements();
            console.log('Task updated');
        } else {
            console.error('Failed to update task');
        }
    })
    .catch(error => console.error('Error:', error));
}
