//Part 1

// manipuliere den DOM, um Folgendes zu erreichen:
// Wähle das <p>-Element mit der ID "output" aus und ändere seinen Textinhalt auf "Text geändert!".
document.getElementById("output").innerText = "Text geändert";
// Wähle das <h1>-Element innerhalb des <div> mit der ID "main-container" aus und ändere seinen Textinhalt auf "DOM-Manipulationsübung abgeschlossen!".
document.querySelector("#main-container h1").innerHTML = "DOM-Manipulationsübung abgeschlossen"

// Wähle das <button>-Element mit der ID "changeTextButton" aus und ändere seinen Textinhalt auf "Klick mich!„ und seine Hintergrundfarbe auf blau.
document.getElementsByTagName("button")[0].innerHTML="klick mich"
document.getElementsByTagName("button")[0].style.backgroundColor = "blue"

//Part 2

// Aktualisiere deine index.js-Datei, um die Ereignisbehandlung einzubeziehen:
// Füge dem main-container einen weiteren Button mit dem Text „Dark Mode“ nur unter Verwendung von Javascript hinzu
const furtherButton = document.createElement("button")
furtherButton.innerText = "Dark Mode"

const mainContainer = document.getElementById("main-container")
mainContainer.appendChild(furtherButton);

function changeBackgroundColor(){
   
    if (mainContainer.style.backgroundColor == "blue") {
        changeToLightMode();

    } else {
        changeToDarkMode();
    }
}

function changeToLightMode(){
    mainContainer.style.backgroundColor = "white"
        mainContainer.style.color = "black";
        furtherButton.innerText = "Dark Mode"; 
}

function changeToDarkMode(){
    mainContainer.style.backgroundColor = "blue";
    mainContainer.style.color = "white";
    furtherButton.innerText = "Light Mode";
}
furtherButton.addEventListener("click",changeBackgroundColor)
// Füge dem neuen Button einen Ereignis Listener hinzu. Wenn darauf geklickt wird, ändert sich 
// Hintergrundfarbe des <div> mit der ID "main-container" zu schwarz 
// und die Schrift darin wird weiß, 
// und der Text innerhalb des Buttons ändert sich zu „Light Mode“

// Wird der Button erneut geklickt dann ändert sich die Hintergrundfarbe wieder auf weiß und der Text des neuen Button zu „Dark Mode“

