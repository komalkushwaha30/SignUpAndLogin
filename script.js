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

// 2. Password validation and form submission handling
const submitBtn = document.getElementById("submitBtn");
const password1Input = document.getElementById("password1");
const password2Input = document.getElementById("password2");
const passResult = document.getElementById("passResult");
const passResult2 = document.getElementById("passResult2");

const validatePassword = () => {
    const password1 = password1Input.value;
    const password2 = password2Input.value;
    let isValid = true;
    passResult.textContent = '';
    passResult2.textContent = '';

    // Password length check
    if (password1.length < 8) {
        passResult.textContent = 'Password length is less than 8 characters.';
        isValid = false;
    } else if (!/[A-Z]/.test(password1)) {
        passResult.textContent = 'Password must contain at least one uppercase letter.';
        isValid = false;
    } else if (!/[a-z]/.test(password1)) {
        passResult.textContent = 'Password must contain at least one lowercase letter.';
        isValid = false;
    } else if (!/[0-9]/.test(password1)) {
        passResult.textContent = 'Password must contain at least one number.';
        isValid = false;
    } else if (!/[@$!%*?&#]/.test(password1)) {
        passResult.textContent = 'Password must contain at least one special character (@, $, !, %, *, ?, &, #).';
        isValid = false;
    }

    passResult.style.color = isValid ? 'green' : 'red';

    // Check if both passwords match
    if (password1 !== password2) {
        passResult2.textContent = "Passwords do not match.";
        passResult2.style.color = "red";
        isValid = false;
    } else if (password1 === password2 && isValid) {
        passResult2.textContent = "Passwords match.";
        passResult2.style.color = "green";
    }

    // Enable or disable the submit button based on validity
    submitBtn.disabled = !isValid;
};

// Validate password on keyup
password1Input.addEventListener('keyup', validatePassword);
password2Input.addEventListener('keyup', validatePassword);


// Handle username validation
let user = document.getElementById('username');
let usernameResult = document.getElementById('usernameResult');
user.addEventListener('keyup', ()=> {
    usernameResult.innerHTML = '';
    let userValue = user.value;
    if(userValue.length < 3){
        usernameResult.innerText = `Username has less than three characters`;
        usernameResult.style.color = 'red';
    }
    else if(userValue.length > 15){
        usernameResult.innerHTML = `Username has more than 15 characters`;
        usernameResult.style.color = 'red';
    }
    else{
        usernameResult.innerText = `Username is valid!`; 
        usernameResult.style.color = 'green';
    }
    usernameResult.style.fontSize = 'small';
});

// Handle form submission and store data in localStorage with username uniqueness check
submitBtn.addEventListener('click', (event) => {
    // Prevent default form submission
    event.preventDefault();

    const password = password1Input.value;
    const userName = user.value;

    // Retrieve existing credentials from localStorage
    let storedCredentials = localStorage.getItem('userCredentialsArray');

    let credentialsArray = [];
    if (storedCredentials) {
        credentialsArray = JSON.parse(storedCredentials);  // Parse the stored array if it exists
    }

    // Check if the username already exists in the credentials array
    const usernameExists = credentialsArray.some(credential => credential.username === userName);

    if (usernameExists) {
        alert('Username already exists! Please choose a different one.');
        return; // Stop execution if the username is already taken
    }

    // Create a new object for the current sign-up
    const newCredentials = {
        username: userName,
        password: password
    };

    // Add the new credentials to the array
    credentialsArray.push(newCredentials);

    // Store the updated array in localStorage
    localStorage.setItem('userCredentialsArray', JSON.stringify(credentialsArray));

    console.log('Credentials stored successfully');

    // Redirect to another page (e.g., toDo.html)
    window.location.href = 'login.html';  // Replace with your target URL
});
