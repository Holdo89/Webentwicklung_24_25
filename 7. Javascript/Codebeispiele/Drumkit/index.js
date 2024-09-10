let drums = document.getElementsByClassName("drum");

for(let i=0; i<drums.length; i++){
    drums[i].addEventListener("click",function(){
        console.log(this.innerText)
        let sound = new Audio("sounds/"+this.innerText+".mp3")
        sound.play();
    })
}

document.addEventListener("keypress",function(ev){
    console.log(ev.key)
    let sound = new Audio("sounds/"+ev.key+".mp3")
    sound.play();  
}
)