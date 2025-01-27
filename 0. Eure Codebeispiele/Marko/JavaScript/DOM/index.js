//Part 1

// manipuliere den DOM, um Folgendes zu erreichen:
// Wähle das <p>-Element mit der ID "output" aus und ändere seinen Textinhalt auf "Text geändert!".
// Wähle das <h1>-Element innerhalb des <div> mit der ID "main-container" aus und ändere seinen Textinhalt auf "DOM-Manipulationsübung abgeschlossen!".
// Wähle das <button>-Element mit der ID "changeTextButton" aus und ändere seinen Textinhalt auf "Klick mich!„ und seine Hintergrundfarbe auf blau.

//Part 2

// Aktualisiere deine index.js-Datei, um die Ereignisbehandlung einzubeziehen:
// Füge dem main-container einen weiteren Button mit dem Text „Dark Mode“ nur unter Verwendung von Javascript hinzu
// Füge dem neuen Button einen Ereignis Listener hinzu. Wenn darauf geklickt wird, ändert sich
// Hintergrundfarbe des <div> mit der ID "main-container" zu schwarz
// und die Schrift darin wird weiß,
// und der Text innerhalb des Buttons ändert sich zu „Light Mode“
// Wird der Button erneut geklickt dann ändert sich die Hintergrundfarbe wieder auf weiß und der Text des neuen Button zu „Dark Mode“

document.getElementById("output").innerHTML = "<p>Text geändert!</p>";
document.querySelector("div h1").innerText =
  "DOM-Manipulationsübung abgeschlossen!";

document.getElementById("changeTextButton").innerText = "Klick mich!";
document.getElementById("changeTextButton").style.backgroundColor = "blue";

let buttonDark = document.createElement("button");
buttonDark.innerText = "Dark Mode";
let dark = document.getElementById("main-container");
dark.appendChild(buttonDark);

function darkButton() {
  if (dark.style.backgroundColor == "blue") {
    dark.style.backgroundColor = "white";
    buttonDark.innerText = "Dark Mode";
    dark.style.color = "black";
  } else {
    dark.style.backgroundColor = "blue";
    dark.style.color = "white";
    buttonDark.innerText = "Light Mode";
  }
}

buttonDark.onclick = darkButton;
