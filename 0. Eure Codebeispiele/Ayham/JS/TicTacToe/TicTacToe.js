let char = 'X';
let title = document.querySelector('.name');
let squares = document.querySelectorAll('.square');
const winPatterns = [
    [0, 1, 2],[3, 4, 5], [6, 7, 8], 
    [0, 3, 6],[1, 4, 7],[2, 5, 8], 
    [0, 4, 8],[2, 4, 6] ];
function game(id) {
    let element = document.getElementById(id);
    if(element.innerHTML === ''){
        element.innerHTML = char;
        element.style.backgroundColor = 'rgb(127, 118, 246)';
        isWins(winPatterns,squares);
        char === 'X'?char = 'O':char = 'X';
        title.textContent = `${char}'s- TURN`;
    }
}

/****************************************************************************/

function isWins(winPatterns,squares) {
    let blocks = [];
    let drow = true;
    let win = document.querySelector('.winer');
    for (let i = 1; i < 10; i++) {
        blocks.push(document.getElementById(`block${i}`).textContent);
    }
    for (let pattern of winPatterns){
        const [a, b, c] = pattern;
        if (blocks[a] === blocks[b] && blocks[b] === blocks[c] && blocks[a] !== ''){
            drow = false;
            for (let index of pattern) {
                for (let square of squares) square.onclick = null;
                document.getElementById(`block${index + 1}`).style.backgroundColor = 'bisque';
            }
            win.innerHTML = `<h2>${blocks[a]}<br> wins!</h2>`;
            reload(win);
        }else if(drow && blocks.every(block => block !== '')){
            win.innerHTML = "<h2>It's<br> a draw!</h2>";
            reload(win);
        }
    }
}
function reload(ele){
    setTimeout(()=>{ele.style.display = 'block';},750);
    setTimeout(() => { location.reload(); }, 2500);
}


