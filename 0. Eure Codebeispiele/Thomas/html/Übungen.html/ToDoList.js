
document.getElementById("button").onclick =()=> {
    let newListItem=document.getElementById("text").value
    let newListItem1=document.createElement("li")
    newListItem1.innerHTML="<input type ='checkbox'></input>"+newListItem
    let list=document.querySelector("ul")
    list.appendChild(newListItem1)
}