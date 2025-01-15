//Part 1

// manipuliere den DOM, um Folgendes zu erreichen:
// Wähle das <p>-Element mit der ID "output" aus und ändere seinen Textinhalt auf "Text geändert!".
// Wähle das <h1>-Element innerhalb des <div> mit der ID "main-container" aus und ändere seinen Textinhalt auf "DOM-Manipulationsübung abgeschlossen!".
// Wähle das <button>-Element mit der ID "changeTextButton" aus und ändere seinen Textinhalt auf "Klick mich!„ und seine Hintergrundfarbe auf blau.
let but = document.querySelector('#changeTextButton');
but.onmouseover = () => {
    but.innerText = ('KLICK HER');
    but.style.backgroundColor = 'red';
}
but.onclick = () => {
    alert('NOOOOOOOOOOOOOOO');
    but.style.backgroundColor = 'blue';
}


//Part 2

// Aktualisiere deine index.js-Datei, um die Ereignisbehandlung einzubeziehen:
// Füge dem main-container einen weiteren Button mit dem Text „Dark Mode“ nur unter Verwendung von Javascript hinzu
// Füge dem neuen Button einen Ereignis Listener hinzu. Wenn darauf geklickt wird, ändert sich 
// Hintergrundfarbe des <div> mit der ID "main-container" zu schwarz 
// und die Schrift darin wird weiß, 
// und der Text innerhalb des Buttons ändert sich zu „Light Mode“
// Wird der Button erneut geklickt dann ändert sich die Hintergrundfarbe wieder auf weiß und der Text des neuen Button zu „Dark Mode“

let dark = document.createElement('button');
dark.innerText = ('Dark Mode')
dark.style.backgroundColor = '#aaa';

document.querySelector("#main-container").appendChild(dark);
dark.onclick = () =>{
    if(dark.innerText.includes('Dark')){
        document.querySelector('body').style.backgroundColor = 'black';
        document.querySelector('body').style.color= 'white';
        dark.innerText = ('Light Mode');
        dark.style.color = 'white';
    }else{
        document.querySelector('body').style.backgroundColor = 'white';
        document.querySelector('body').style.color= 'black';
        dark.innerText = ('Dark Mode');
        dark.style.color = 'black';
    }
}
