//document.write('<div>Tic Tac Toe Game</div>');
let char = 'x';
function game (id){
    let element = document.getElementById(id);
    let blocks = document.querySelectorAll('.square').innerHTML;
    if(char === 'x' && element.innerHTML !== 'X'){
        element.innerHTML = 'O';
        element.style.backgroundColor = 'rgb(127, 118, 246)';
        char = 'o';
    }else if(char === 'o' && element.innerHTML !== 'O'){
        element.innerHTML = 'X';
        element.style.backgroundColor = 'rgb(127, 118, 246)';
        char = 'x';
    }
    if(blocks){
        setTimeout(function(){location.reload},1000);
    }
}