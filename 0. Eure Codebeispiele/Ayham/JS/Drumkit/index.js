//Todo

document.addEventListener('keydown', function(drum){
    let p = new Audio('./sounds/'+drum.key+'.mp3');
    p.play();
});
const elements = document.querySelectorAll('.drum');
for(let element of elements){
    element.addEventListener('click', function(){
        let text = element.textContent;
        let pS = new Audio('./sounds/'+text+'.mp3');
        pS.play();
    });
};


