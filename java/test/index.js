let list = document.getElementById("add");
let text = document.createElement("li");
text.textContent = "New Item";
list.appendChild(text);
let button = document.createElement("button");
button.textContent = "Add Item";
button.id = "add-item-btn";
text.appendChild(button);