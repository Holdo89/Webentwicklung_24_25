
document.getElementById("button").onclick =()=> {
    let newListItem=document.getElementById("text").value
    let newListItem1=document.createElement("li")
    newListItem1.innerHTML="<input type ='checkbox'class='line'></input><span>"+newListItem +"</span><button class='delete'>X</button>"
    let list=document.querySelector("ul")
    list.appendChild(newListItem1)
    document.getElementById("text").value="";

    newListItem1.querySelector(".delete").onclick=() =>{
        newListItem1.remove();
    }
    newListItem1.querySelector(".line").onclick = (event) => {
        const newListValue=newListItem1.querySelector('span')
        if (event.target.checked) {
            newListValue.style.textDecoration = "line-through";
        } else {
            newListValue.style.textDecoration = "none";
        }
    };
    
   
    
    
}

