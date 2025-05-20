async function register() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const geschlecht = document.querySelector(
    'input[name="geschlecht"]:checked'
  )?.value;

  if (!username || !email || !password || !geschlecht) {
    showMessage(" Bitte alle Felder ausfüllen.", "error");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password, geschlecht }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("username", username);
      localStorage.setItem("geschlecht", geschlecht);
      localStorage.setItem("email", email);

      showMessage(" Registrierung erfolgreich!","green");
      setTimeout(() => {
        window.location.href = "../../../hauptseite/hauptseite.html";
      }, 7500);

    } else {
      document.getElementById("responseMessage").innerText =
        " Fehler: " + (data.error || "Unbekannter Fehler");
    }
  } catch (error) {
    document.getElementById("responseMessage").innerText =
      " Netzwerkfehler: " + error.message;
  }
}

function showMessage(text, color = "red") {
  const messageElement = document.getElementById("responseMessage");
  messageElement.innerText = text;
  messageElement.style.color = color;
  messageElement.classList.add("show");

  setTimeout(() => {
    messageElement.classList.remove("show");
    messageElement.innerText = "";
  }, 7000);
}
