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
function isWins (){
    let blocks = [];
    let win = document.querySelector('.winer');
    for(let i = 1; i < 10; i++) {
        blocks.push(document.getElementById(`block${i}`).textContent);
    }
    if(
        (blocks[0] === blocks[1] && blocks[1] === blocks[2] && blocks[0] !== '') ||
        (blocks[3] === blocks[4] && blocks[4] === blocks[5] && blocks[3] !== '') || 
        (blocks[6] === blocks[7] && blocks[7] === blocks[8] && blocks[6] !== '') || 
        (blocks[0] === blocks[3] && blocks[3] === blocks[6] && blocks[0] !== '') || 
        (blocks[1] === blocks[4] && blocks[4] === blocks[7] && blocks[1] !== '') || 
        (blocks[2] === blocks[5] && blocks[5] === blocks[8] && blocks[2] !== '') ||  
        (blocks[0] === blocks[4] && blocks[4] === blocks[8] && blocks[0] !== '') || 
        (blocks[2] === blocks[4] && blocks[4] === blocks[6] && blocks[2] !== '') ){ 
        win.style.display = 'block';
        win.innerHTML += `<h2>${char}</h2>`;
        setTimeout(() =>{location.reload()},2500);
    } else if (blocks.every((block) => block !== '')) {
        win.style.display = 'block';
        win.innerHTML = "<h2>It's a draw!</h2>";
        setTimeout(() => { location.reload(); }, 2500);
    }
}
