fetch('http://localhost:5000/tasks', {
method: 'GET',
headers: {  'Content-Type': 'application/json' }
})
.then(response => response.json())
.then(tasks => {
    let text = document.getElementById('outList');
    tasks.forEach(task => {
        text.innerHTML += `<li>${task.text}</li>`;
    });
});