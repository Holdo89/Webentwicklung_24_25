
/*document.querySelector
switch(sounds){
    case 'w':
        play.w.mp3()
        break;
    case 'a':
        play.a.mp3()
        break;
    case 's':
        play.s.mp3()
        break;
    case 'd':
        play.d.mp3()
        break;
    case 'j':
        play.j.mp3()
        break;
    case 'k':
        play.k.mp3()
        break;
    case 'l':
        play.l.mp3()
        break;    

}*/


//document.addEventListener("keydown",function (event){
   // console.log(event.key);
   // if(event.key==="w"){
     //   let sound=new Audio("sounds/w.mp3");
     //   sound.play();
  //  }
//}

document.addEventListener("keydown",function(event){
    if(event.key==="w"|| event.key==="l" || event.key==="a"){
        playSound(event.key)
    }
});

function playSound(key){
    let sound=new Audio("sounds/"+key+".mp3");
        sound.play();
}



