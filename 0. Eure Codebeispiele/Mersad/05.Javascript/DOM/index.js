//Part 1

// manipuliere den DOM, um Folgendes zu erreichen:
// Wähle das <p>-Element mit der ID "output" aus und ändere seinen Textinhalt auf "Text geändert!".
const node = document.getElementById("output");
if (node) {
  node.innerText = "Text geändert!";
}
// Wähle das <h1>-Element innerhalb des <div> mit der ID "main-container" aus und ändere seinen Textinhalt auf "DOM-Manipulationsübung abgeschlossen!".
const hey = document.querySelector("h1");
if (hey) {
  node.innerText = "DOM-Manipulationsübung abgeschlossen!";
}
// Wähle das <button>-Element mit der ID "changeTextButton" aus und ändere seinen Textinhalt auf "Klick mich!„ und seine Hintergrundfarbe auf blau.
const you = document.getElementById("changeTextButton");
if (you) {
  you.innerText = "Klick mich!";
}

//Part 2

// Aktualisiere deine index.js-Datei, um die Ereignisbehandlung einzubeziehen:
// Füge dem main-container einen weiteren Button mit dem Text „Dark Mode“ nur unter Verwendung von Javascript hinzu
const hallo = document.createElement("button");
hallo.innerText = "Dark Mode";
const list = document.querySelector("div");
list.appendChild(hallo);

function changeBackgroundColor() {
  hallo.style.backgroundColor = "blue";
}
// Füge dem neuen Button einen Ereignis Listener hinzu. Wenn darauf geklickt wird, ändert sich
hallo.onclick = changeBackgroundColor;
// Hintergrundfarbe des <div> mit der ID "main-container" zu schwarz
document.getElementById("main-container").style.backgroundColor = "black";
// und die Schrift darin wird weiß,
document.getElementById("main-container").style.color = "white";
// und der Text innerhalb des Buttons ändert sich zu „Light Mode“
hallo.innerText = "Light Mode";
// Wird der Button erneut geklickt dann ändert sich die Hintergrundfarbe wieder auf weiß und der Text des neuen Button zu „Dark Mode“
const mainContainer = document.getElementById("main-container");
mainContainer.appendChild(furtherButton);

function changeBackgroundColor() {
  if (mainContainer.style.backgroundColor == "blue") {
    changeToLightMode();
  } else {
    changeToDarkMode();
  }
}

function changeToLightMode() {
  mainContainer.style.backgroundColor = "white";
  mainContainer.style.color = "black";
  furtherButton.innerText = "Dark Mode";
}

function changeToDarkMode() {
  mainContainer.style.backgroundColor = "blue";
  mainContainer.style.color = "white";
  furtherButton.innerText = "Light Mode";
}
furtherButton.addEventListener("click", changeBackgroundColor);
// Füge dem neuen Button einen Ereignis Listener hinzu. Wenn darauf geklickt wird, ändert sich
// Hintergrundfarbe des <div> mit der ID "main-container" zu schwarz
// und die Schrift darin wird weiß,
// und der Text innerhalb des Buttons ändert sich zu „Light Mode“

// Wird der Button erneut geklickt dann ändert sich die Hintergrundfarbe wieder auf weiß und der Text des neuen Button zu „Dark Mode“
