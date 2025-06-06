

    let button = document.getElementById("Hinzufügen");
    let deleteAllButton = document.getElementById("delete-all-button"); 
    let taskInput = document.getElementById("task-input");
    let taskList = document.getElementById("Aufgabenliste");
    let errorMessage = document.getElementById("error-message");

    fetch("http://localhost:3000/todos", {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
        },
    })
    .then((response) => response.json())
    .then((data) => {
        data.forEach((task)=>{
            document.getElementById("todo").innerHTML +=
            `<div class="input-section">
            <input type="text" id="task-input" placeholder="${task.title}" />
        </div>`;
    });
    })

    function addTask() {
        let taskText = taskInput.value.trim(); //Hinzufügen einer Aufgabe

        if (taskText === "") {
            errorMessage.style.display = "block";
            return; //Damit ich keine leeren Aufgaben abgeben kann, brauche ich das 
        } else {
            errorMessage.style.display = "none"; //Fehlernachricht ausblenden, wenn die Eingabe korrekt ist
        }


        let taskItem = document.createElement("li");
        taskItem.classList.add("task-item"); //Hiermit hab ich eine neue Listenzeile erstellt

        let taskTextNode = document.createElement("span");
        taskTextNode.textContent = taskText;
        taskItem.appendChild(taskTextNode); //Damit der  Hinzugefügte Text bestehen bleibt

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        taskItem.appendChild(checkbox); //Erledigt Knopf
        checkbox.addEventListener("change", function() {
            if (checkbox.checked) {
                taskItem.classList.add("completed");
            } else {
                taskItem.classList.remove("completed");
            }
        });
        

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Löschen";
        deleteButton.classList.add("delete-btn");
        taskItem.appendChild(deleteButton); //Der Knopf um hinzugefügtes zu löschen


        taskList.appendChild(taskItem);//Aufgabe wird hinzugefügt


        taskInput.value = "";//Um in meinem Feld nichts drinn' stehen zu haben, nachdem ich etwas hinzugefügt habe, benötige ich das


       

        deleteButton.addEventListener("click", function() {
            taskList.removeChild(taskItem); //Damit die Aufgaben gelöscht werden, brauche ich das hier

        });
    }

    button.addEventListener("click", addTask);

    // Möglichkeit, Aufgaben auch mit der Enter-Taste hinzuzufügen
    taskInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addTask();
        }

        });
        deleteAllButton.addEventListener("click", function() {
            taskList.innerHTML = ""; // Löscht alle Aufgaben
    });

