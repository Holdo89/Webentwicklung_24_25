


let username;
document.getElementById("myButton").onclick=function(){
    username=document.getElementById("myText").value;
    document.getElementById("myH1").textContent=`Hello ${username}`

}

let listitem=document.createElement("li");
listitem.innerText=4;

let normalItem=document.createElement("li")
normalItem.innerText="hallo mal halblang"

let item1=document.createElement("li")
item1.innerText="ok"

const list= document.querySelector("ul")
list.appendChild(listitem)
list.appendChild(normalItem)
list.appendChild(item1)



let darkmode;
document.getElementById("darkmode").onclick=function(){
    document.body.classList.toggle("dark-mode");
}


