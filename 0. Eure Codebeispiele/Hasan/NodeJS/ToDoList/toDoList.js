document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("Hinzufügen");
    const deleteAllButton = document.getElementById("delete-all-button");  //Knopf für alles löschen
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("Aufgabenliste");

    // Funktion zum Hinzufügen einer Aufgabe
    function addTask() {
        const taskText = taskInput.value.trim(); //Liest den Wert aus dem Eingabefeld

        if (taskText === "") {
            return; //Damit ich keine leeren Aufgaben abgeben kann, brauche ich das 
        }

        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item"); //Hiermit hab ich ein neue Listenzeile erstellt

        const taskTextNode = document.createElement("span");
        taskTextNode.textContent = taskText;
        taskItem.appendChild(taskTextNode); //Damit der  Hinzugefügte Text bestehen bleibt

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        taskItem.appendChild(checkbox); //Erledigt Knopf

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Löschen";
        deleteButton.classList.add("delete-btn");
        taskItem.appendChild(deleteButton); //Der Knopf um hinzugefügtes zu löschen


        taskList.appendChild(taskItem);//Aufgabe wird hinzugefügt


        taskInput.value = "";//Um in meinem Feld nichts drinn' stehen zu haben, nachdem ich etwas hinzugefügt habe, benötige ich das


       

        deleteButton.addEventListener("click", function() {
            taskList.removeChild(taskItem); //Damit die Aufgaben gelöscht werden, brauche ich das hier

        });
    }

    // Füge Event Listener zum Hinzufügen der Aufgabe hinzu
    button.addEventListener("click", addTask);

    // Möglichkeit, Aufgaben auch mit der Enter-Taste hinzuzufügen
    taskInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addTask();
        }

        deleteAllButton.addEventListener("click", function() {
            taskList.innerHTML = ""; // Löscht alle Aufgaben
        });
    });
});
