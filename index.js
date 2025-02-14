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

// Select the strength indicator element
const strengthLevel = document.getElementById("strengthLevel");
const strengthLevelIconsWrapper = document.querySelector(".icons");

// Character sets
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()";

// Function to calculate password strength
const calculateStrength = () => {
  let inclusionCount = 0;
  if (includeUppercase.checked) inclusionCount++;
  if (includeLowercase.checked) inclusionCount++;
  if (includeNumbers.checked) inclusionCount++;
  if (includeSymbols.checked) inclusionCount++;

  // Determine strength level based on inclusion count
  if (inclusionCount === 0) {
    strengthLevel.classList.remove("d-none");
    strengthLevel.textContent = "Too Weak";
  } else if (inclusionCount === 1) {
    strengthLevel.classList.remove("d-none");
    strengthLevel.textContent = "Too Weak";
  } else if (inclusionCount === 2) {
    strengthLevel.textContent = "Weak";
    strengthLevel.classList.remove("d-none");
  } else if (inclusionCount === 3) {
    strengthLevel.textContent = "Medium";
    strengthLevel.classList.remove("d-none");
  } else if (inclusionCount === 4) {
    strengthLevel.textContent = "Strong";
    strengthLevel.classList.remove("d-none");
  }

  // Reset all strength indicators
  strengthLevelIconsWrapper.querySelectorAll("span").forEach((bar) => {
    bar.className = "rect"; // Reset to default class
  });

  // Update the strength indicator
  for (let i = 0; i < inclusionCount; i++) {
    if (inclusionCount === 1) {
      strengthLevelIconsWrapper
        .querySelectorAll("span")
        [i].classList.add("too_weak");
    }
    if (inclusionCount === 2) {
      strengthLevelIconsWrapper
        .querySelectorAll("span")
        [i].classList.add("weak");
    }
    if (inclusionCount === 3) {
      strengthLevelIconsWrapper
        .querySelectorAll("span")
        [i].classList.add("medium");
    }
    if (inclusionCount === 4) {
      strengthLevelIconsWrapper
        .querySelectorAll("span")
        [i].classList.add("strong");
    }
  }
};

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

  calculateStrength(); // Update strength indicator
});

clipboardIcon.addEventListener("click", function () {
  if (passwordField.placeholder === "P4$5W0rD!") {
    alert("Please generate a password!");
  } else {
    alert(`${passwordField.placeholder} copied to clipboard!`);
  }
});
