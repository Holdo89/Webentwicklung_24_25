const { response } = require("express");

function getIssLocation() {
  fetch("https://api.wheretheiss.at/v1/satellites/25544", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
}
