const names = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const submitBtn = document.getElementById("submit-btn");
const form = document.getElementById("form");
submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  let nameValue = names.value.trim();
  let emailValue = email.value.trim();
  let passwordValue = password.value.trim();

  //  name vlaidation
  if (nameValue === " ") {
    alert("Name cannot be empty!");
    return;
  }
  let nameRegex = /^[a-zA-Z\s]+$/;
  if (!nameRegex.include(nameValue)) {
    alert("Name can only contain letters and spaces!");
    return;
  }
  // email validation

  if (emailValue === " ") {
    alert("Email cannot be empty!");
    return;
  }
  // password validation

  if (passwordValue === " ") {
    alert("Password cannot be empty!");
    return;
  }
  if (passwordValue.length < 6) {
    alert("Password must be at least 6 characters long!");
    return;
  }

});
