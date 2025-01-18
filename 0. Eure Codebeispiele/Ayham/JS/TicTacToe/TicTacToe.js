//document.write('<div>Tic Tac Toe Game</div>');
let char = 'X';
let drow = true;
let title = document.querySelector('.name');
function game(id) {
    let element = document.getElementById(id);
    if(element.innerHTML === ''){
        element.innerHTML = char;
        element.style.backgroundColor = 'rgb(127, 118, 246)';
        isWins();
        char === 'X'?char = 'O':char = 'X';
        title.textContent = `${char}'s- TURN`;
    }
}
function isWins() {
    let blocks = [];
    let win = document.querySelector('.winer');
    let squares = document.querySelectorAll('.square');
    for (let i = 1; i < 10; i++) {
        blocks.push(document.getElementById(`block${i}`).textContent);
    }
    const winPatterns = [
        [0, 1, 2],[3, 4, 5], [6, 7, 8], 
        [0, 3, 6],[1, 4, 7],[2, 5, 8], 
        [0, 4, 8],[2, 4, 6] ];
    for (let pattern of winPatterns){
        const [a, b, c] = pattern;
        if (blocks[a] === blocks[b] && blocks[b] === blocks[c] && blocks[a] !== ''){
            drow = false;
            for (let index of pattern) {
                for (let square of squares) square.onclick = null;
                document.getElementById(`block${index + 1}`).style.backgroundColor = 'bisque';
            }
            setTimeout(()=>{win.style.display = 'block';},750);
            win.innerHTML = `<h2>${blocks[a]}<br> wins!</h2>`;
            setTimeout(() => { location.reload(); }, 2500);
        }else if(drow && blocks.every(block => block !== '')){
            setTimeout(()=>{win.style.display = 'block';},750);
            win.innerHTML = "<h2>It's a draw!</h2>";
            setTimeout(() => { location.reload(); }, 2500);
        }
    }
}


