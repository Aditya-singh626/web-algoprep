let button = document.getElementById("add-task-btn");
let list = document.getElementById("task-list");
button.addEventListener("click", function () {
  let input = document.getElementById("task-input");
  let task = input.value.trim();

  if (task == "") {
    alert("Please enter a task!");
    return;
  }

  let listItem = document.createElement("li");
  listItem.textContent = task;

  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.addEventListener("click", function () {
    listItem.remove();
  });

  listItem.appendChild(deleteBtn);
  list.appendChild(listItem);
  input.value = "";
});
