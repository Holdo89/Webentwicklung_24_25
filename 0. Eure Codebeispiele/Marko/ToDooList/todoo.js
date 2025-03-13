document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.querySelector(".klick");
    const addButton = document.querySelector(".button");
    const listsContainer = document.querySelector(".lists");

    addButton.addEventListener("click", function () {
        const newTask = inputField.value.trim();
        if (newTask !== "") {
            const newDiv = document.createElement("div");
            newDiv.innerHTML = `<input type="checkbox" /> <input type="text" value="${newTask}" />`;
            listsContainer.insertBefore(newDiv, listsContainer.lastElementChild);
            inputField.value = "";
        }
    });
});
document.addEventListener

