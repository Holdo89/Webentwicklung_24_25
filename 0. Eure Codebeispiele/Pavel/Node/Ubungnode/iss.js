async function getIssLocation() {
    try {
        const response = await fetch("http://localhost:3000/iss", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        const locationDiv = document.getElementById("isslocation");
       locationDiv.innerHTML = `ISS Latitude: ${data.latitude}, ISS Longitude: ${data.longitude}`;
    } catch (error) {
        console.error("Error :", error);
    }
}