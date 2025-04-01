function getIssLocation() {
  fetch("http://localhost:3000/endpoint", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      const longitude = data.longitude;
      const latitude = data.latitude;
      document.getElementById("issLocation").innerHTML = `
          Longitude: ${longitude} <br>
          Latitude: ${latitude} <br>
          <iframe
            width="50%"
            height="600"
            frameborder="0"
            scrolling="no"
            id="gmap_canvas"
            src="https://maps.google.com/maps?height=400&hl=en&q=${latitude},${longitude}&t=&z=12&ie=UTF8&iwloc=B&output=embed"
          ></iframe>`;
    })
    .catch((error) =>
      console.error("Fehler beim Abrufen der ISS-Daten:", error)
    );
}
