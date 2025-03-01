document.getElementById("button").addEventListener("click", addNew);

function addNew() {
  const aktuell = document.querySelectorAll("div");

  const neu = document.querySelector("#new");
  const newItem = document.createElement(neu);

  if (aktuell.length > 0) {
    aktuell[aktuell.length].appendChild(newItem);
  }
}
