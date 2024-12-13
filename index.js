f; // Caching form elements
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const errorDisplay = document.getElementById("message");

// Error Display Helper Function
function displayError(message) {
  errorDisplay.innerHTML = `<p>${message}</p>`;
  errorDisplay.style.display = "block";
}

// Hide Error
function hideError() {
  errorDisplay.innerHTML = "";
  errorDisplay.style.display = "none";
}

// Username validation
function validateUsername(username) {
  if (!username) return "Username can't be blank.";
  if (username.length < 4) return "Username must be at least 4 characters.";
  if (!/[A-Za-z0-9]{2,}/.test(username))
    return "Username must contain at least two unique characters.";
  if (/[^A-Za-z0-9]/.test(username))
    return "Username can't contain special characters or spaces.";
  return "";
}

// Email validation
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) return "Please enter a valid email address.";
  if (email.includes("example.com"))
    return "Email cannot be from 'example.com'.";
  return "";
}

// Password validation
function validatePassword(password, username) {
  if (password.length < 12) return "Password must be at least 12 characters.";
  if (!/[A-Z]/.test(password))
    return "Password must contain at least one uppercase letter.";
  if (!/[a-z]/.test(password))
    return "Password must contain at least one lowercase letter.";
  if (!/[0-9]/.test(password))
    return "Password must contain at least one number.";
  if (!/[^A-Za-z0-9]/.test(password))
    return "Password must contain at least one special character.";
  if (password.toLowerCase().includes("password"))
    return "Password cannot contain the word 'password'.";
  if (password.toLowerCase().includes(username.toLowerCase()))
    return "Password cannot contain the username.";
  return "";
}

// Check if username already exists
function isUsernameTaken(username) {
  const users = JSON.parse(localStorage.getItem("users")) || {};
  return users.hasOwnProperty(username.toLowerCase());
}

// Handle Register Form
registerForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const terms = document.getElementById("terms").checked;

  // Clear previous errors
  hideError();

  // Validation
  const usernameError = validateUsername(username);
  if (usernameError) return displayError(usernameError);

  const emailError = validateEmail(email);
  if (emailError) return displayError(emailError);

  const passwordError = validatePassword(password, username);
  if (passwordError) return displayError(passwordError);

  if (password !== confirmPassword)
    return displayError("Passwords do not match.");
  if (!terms) return displayError("You must accept the terms and conditions.");

  if (isUsernameTaken(username))
    return displayError("Username is already taken.");

  // Save to localStorage
  const users = JSON.parse(localStorage.getItem("users")) || {};
  users[username.toLowerCase()] = {
    email: email.toLowerCase(),
    password: password,
  };
  localStorage.setItem("users", JSON.stringify(users));

  // Clear form fields
  registerForm.reset();
  displayError("Registration successful! You can now login.");
});

// Handle Login Form
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const loginUsername = document.getElementById("loginUsername").value;
  const loginPassword = document.getElementById("loginPassword").value;

  // Clear previous errors
  hideError();

  const users = JSON.parse(localStorage.getItem("users")) || {};
  if (!users[loginUsername.toLowerCase()])
    return displayError("Username does not exist.");
  if (users[loginUsername.toLowerCase()].password !== loginPassword)
    return displayError("Incorrect password.");

  // Login Success
  displayError("Login successful!");
});
