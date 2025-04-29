const form = document.getElementById("chat-form");
const input = document.getElementById("userInput");
const responseDiv = document.getElementById("response");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const prompt = input.value;

    responseDiv.innerHTML = "<em>Denke nach...</em>";
    const bearerToken = "1e08e801371b3ca78989e36af0cbdf6e";
  
    try {
        const res = await fetch("http://192.168.22.6:5000/v1/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + bearerToken, //Um Zugriff zu erlangen, benötige ich das nötige PW
            },
            body: JSON.stringify({
                prompt: prompt,
                max_tokens: 100,
                model: "text-davinci-003",
            }),
        });

        const data = await res.json();
        responseDiv.innerHTML = `<strong>Antwort:</strong><br>${data.choices[0].text}`;
        input.value = "";
    } catch (error) {
        responseDiv.innerHTML = "<span style='color:red;'>Fehler beim Abrufen der Antwort.</span>";
        console.error(error);
    }
});
