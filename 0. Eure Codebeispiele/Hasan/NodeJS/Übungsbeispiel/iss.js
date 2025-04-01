function getIssLocation() {
    fetch("http://localhost:3000/endpoint", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })