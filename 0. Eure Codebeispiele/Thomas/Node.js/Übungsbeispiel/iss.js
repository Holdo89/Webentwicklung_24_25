function getISSLocation() {
  fetch(" https://api.wheretheiss.at/v1/satellites/25544", {
    method: "GET",
    
  })
    .then((response) => response.json())
    .then((data) => {
      const issdata = document.getElementById("isslocation");
      issdata.innerHTML = `${data.latitude},${data.longitude}`;
    });
}
