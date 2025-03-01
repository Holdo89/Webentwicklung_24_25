document.getElementById("button").addEventListener("click", addNew);

function addNew() {
  const aktuell = document.querySelectorAll("div");

  const neu = document.querySelector("#new");
  const newItem = neu.cloneNode(true);

  if (aktuell.length > 0) {
    aktuell[aktuell.length - 1].parentNode.appendChild(newItem);
  }
  const button = document.getElementById("button");
  document.body.appendChild(button);
}
