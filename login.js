// 1. Show and hide the password
const eye = document.getElementById("eye");
eye.addEventListener("click", () => {
  const password1 = document.getElementById("password1");
  if (eye.className === "fa-solid fa-eye" && password1.type === "text") {
    eye.className = "fa-solid fa-eye-slash";
    password1.type = "password";
  } else {
    eye.className = "fa-solid fa-eye";
    password1.type = "text";
  }
});

// Login Page JavaScript
const form = document.getElementById("myForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password1");
const finalResult = document.getElementById("finalResult");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  const storedCredentials = localStorage.getItem("userCredentialsArray");

  if (storedCredentials) {
    const credentialsArray = JSON.parse(storedCredentials);
    const user = credentialsArray.find(
      (cred) => cred.username === username && cred.password === password
    );

    if (user) {
      localStorage.setItem("currentUser", username);
      window.location.href = "toDo.html";
    } else {
      finalResult.textContent = "Invalid username or password.";
    }
  } else {
    finalResult.textContent = "No user credentials found.";
  }
});