document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.querySelector(".newText");
  const addButton = document.querySelector(".klick");
  const deleteButton = document.querySelector(".delete");
  const listsContainer = document.querySelector(".lists");

  addButton.addEventListener("click", function () {
    const newTask = inputField.value.trim();
    if (newTask !== "") {
      const newDiv = document.createElement("div");
      newDiv.innerHTML = `
                <input type="checkbox" class="task-checkbox" />
                <input type="text" value="${newTask}" />
            `;
      listsContainer.insertBefore(newDiv, listsContainer.lastElementChild);
      inputField.value = "";
    }
  });

  deleteButton.addEventListener("click", function () {
    const checkboxes = document.querySelectorAll(
      ".lists input[type='checkbox']:checked"
    );
    checkboxes.forEach((checkbox) => {
      checkbox.parentElement.remove();
    });
  });
});
inputField.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTask();
  }
});
