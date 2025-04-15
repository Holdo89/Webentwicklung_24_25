const API_URL = 'http://localhost:3000';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Načítanie zoznamu úloh
async function loadTasks() {
    const res = await fetch(`${API_URL}/tasks`);
    const tasks = await res.json();
    listContainer.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.title;
        li.dataset.id = task.id;

        if (task.completed) li.classList.add("checked");

        const span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        listContainer.appendChild(li);
    });
}

async function addTask() {
    const title = inputBox.value.trim();

    if (title === "") {
        alert("You must write something!");
        return;
    }

    await fetch(`${API_URL}/add-task`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title })
    });

    inputBox.value = "";
    loadTasks();
}

listContainer.addEventListener("click", async function(e) {
    const li = e.target.closest("li");
    const id = li?.dataset?.id;

    if (!id) return;

    if (e.target.tagName === "SPAN") {
        await fetch(`${API_URL}/delete-task/${id}`, { method: "DELETE" });
    } else if (e.target.tagName === "LI") {
        await fetch(`${API_URL}/toggle-task/${id}`, { method: "PUT" });
    }

    loadTasks();
});

window.addEventListener("DOMContentLoaded", loadTasks);
