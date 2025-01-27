//Todo 
/*
document.addEventListener("keydown", function(event){
   console.log(event.key);
   if(event.key === "w")
   {
    let sound = new Audio("sounds/w.mp3");
    sound.play();
   } 
   if(event.key === "w")
    {
     let sound = new Audio("sounds/w.mp3");
     sound.play();
    } 
    if(event.key === "a")
        {
         let sound = new Audio("sounds/a.mp3");
         sound.play();
        } 

     if(event.key === "s")
         {
         let sound = new Audio("sounds/s.mp3");
         sound.play();
            } 
      if(event.key === "d")
                {
                 let sound = new Audio("sounds/d.mp3");
                 sound.play();
                } 
         if(event.key === "j")
                    {
                     let sound = new Audio("sounds/j.mp3");
                     sound.play();
                    } 
                    if(event.key === "k")
                        {
                         let sound = new Audio("sounds/k.mp3");
                         sound.play();
                        } 
                        if(event.key === "l")
                            {
                             let sound = new Audio("sounds/l.mp3");
                             sound.play();
                            } 
                          
    
})
*/
// 
document.addEventListener("keydown", function(event){
    let sound = new Audio("sounds/" + event.key + ".mp3");
    sound.play();
})
