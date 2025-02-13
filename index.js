// Select DOM Elements
const passwordField = document.getElementById("passwordField");
const charLengthSlider = document.getElementById("charLengthSlider");
const charLengthValue = document.getElementById("charLength_value");
const pwdGenBtn = document.getElementById("pwdGenBtn");
const clipboardIcon = document.getElementById("clipboardIcon");

// inclusions
const includeLowercase = document.getElementById("lowercase");
const includeUppercase = document.getElementById("uppercase");
const includeNumbers = document.getElementById("numbers");
const includeSymbols = document.getElementById("symbols");

// Character sets
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()";

// Function to generate a random string based on selected options
const generateRandomString = (length) => {
  let charset = "";
  if (includeUppercase.checked) charset += uppercaseLetters;
  if (includeLowercase.checked) charset += lowercaseLetters;
  if (includeNumbers.checked) charset += numbers;
  if (includeSymbols.checked) charset += symbols;

  // If no options are selected, default to lowercase letters
  if (!charset) charset = lowercaseLetters;

  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }
  return result;
};

// Display the range input value
charLengthSlider.addEventListener("input", (event) => {
  charLengthValue.textContent = event.target.value;
});

pwdGenBtn.addEventListener("click", function () {
  const pwdLength = parseInt(charLengthSlider.value);
  if (pwdLength > 0) {
    passwordField.placeholder = generateRandomString(pwdLength); // Generate and display password
    passwordField.style.opacity = 1;
  } else {
    passwordField.placeholder = "P4$5W0rD!";
    passwordField.style.opacity = 0.25;
  }
});

clipboardIcon.addEventListener("click", function () {
  if (passwordField.placeholder === "P4$5W0rD!") {
    alert("Please generate a password!");
  } else {
    alert(`${passwordField.placeholder} copied to clipboard!`);
  }
});
