//document.write('<div>Tic Tac Toe Game</div>');
let char = 'X';
let title = document.querySelector('.name');
function game (id){
    let element = document.getElementById(id);
    let blocks = document.querySelectorAll('.square');
    if(char === 'X' && element.innerHTML !== 'X' && element.innerHTML ==''){
        element.innerHTML = 'O';
        element.style.backgroundColor = 'rgb(127, 118, 246)';
        title.textContent = `${char} - TURN`;
        char = 'O';
        isWins();
    }else if(char === 'O' && element.innerHTML !== 'O' && element.innerHTML ==''){
        element.innerHTML = 'X';
        element.style.backgroundColor = 'rgb(127, 118, 246)';
        title.textContent = `${char} - TURN`;
        char = 'X';
        isWins();
    }
}
function isWins (){
    let win = document.querySelector('.winer');
    let bord = document.querySelector('.game');
    const b1 = document.getElementById('block1').textContent;
    const b2 = document.getElementById('block2').textContent;
    const b3 = document.getElementById('block3').textContent;
    const b4 = document.getElementById('block4').textContent;
    const b5 = document.getElementById('block5').textContent;
    const b6 = document.getElementById('block6').textContent;
    const b7 = document.getElementById('block7').textContent;
    const b8 = document.getElementById('block8').textContent;
    const b9 = document.getElementById('block9').textContent;
    if ((b1 === b2 && b2 === b3 && b1 !== '') ||
        (b4 === b5 && b5 === b6 && b4 !== '') ||
        (b7 === b8 && b8 === b9 && b7 !== '') ||
        (b1 === b4 && b4 === b7 && b1 !== '') ||
        (b2 === b5 && b5 === b8 && b2 !== '') ||
        (b3 === b6 && b6 === b9 && b3 !== '') ||
        (b1 === b5 && b5 === b9 && b5 !== '') ||
        (b3 === b5 && b5 === b7 && b5 !== '')) {
        //bord.style.display = 'none';
        win.style.display = 'block';
        setInterval(() => {win.innerHTML += char}, 450);
        setTimeout(() =>{location.reload()},2000);
    }
}