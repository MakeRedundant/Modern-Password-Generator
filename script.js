// Assignment Code
//Assign various HTML elements to JS using document.querySelector
var generateBtn = document.querySelector("#generate");  
/*document.querySelector is a method in JavaScript that allows you to select and retrieve the first element within the document that matches a specified CSS selector, in this case
its the #id generate */
var saveBtn = document.querySelector("#save");
var characterLimitSlider = document.querySelector("#characterLimit"); 
var characterLimitValue = document.querySelector("#characterLimitValue");
var includeLowercaseCheckbox = document.querySelector("#includeLowercase");
var includeUppercaseCheckbox = document.querySelector("#includeUppercase");
var includeNumbersCheckbox = document.querySelector("#includeNumbers");
var includeSpecialCharactersCheckbox = document.querySelector("#includeSpecialCharacters");
var passwordTextarea = document.querySelector("#password");
var passwordList = document.querySelector("#passwordList");

// Write password to the #password input
function writePassword() { //This function is responsible for writing the generated password to the passwordTextarea element on the webpage.
  var password = generatePassword(); //It calls the generatePassword function to generate a random password and assigns it to the password variable.
  passwordTextarea.value = password; //It sets the value property of the passwordTextarea element to the generated password, displaying it in the text area.
}

// Generates a random password
function generatePassword() {
    var length = parseInt(characterLimitSlider.value);
    var charset = [];
  
    if (includeLowercaseCheckbox.checked) {
      charset = charset.concat("abcdefghijklmnopqrstuvwxyz".split('')); //split function is used to split each string of character into an array of individual characters and than concat combines them
    }
  
    if (includeUppercaseCheckbox.checked) {
      charset = charset.concat("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(''));
    }
  
    if (includeNumbersCheckbox.checked) {
      charset = charset.concat("0123456789".split(''));
    }
  
    if (includeSpecialCharactersCheckbox.checked) {
      charset = charset.concat("@%+\\/'!#$^?:,)(}{][~-_.".split(''));
    }

  var password = ""; //using a loop, you can iterate length each time in each iteration to generate a random index from the charset length which gets added to the password string 
  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}

// Save password to the page
function savePassword() {
  var password = passwordTextarea.value.trim(); //used trim to remove whitespace
  if (password === "") { //validation it checks if the password and if so displays the alert message no password generated and returns exiting the function. 
    alert("No password generated.");
    return;
  }

  var listItem = document.createElement("li"); //if it;s not empty it creates a new list item with document.create li 
  listItem.textContent = password; 
  listItem.addEventListener("click", function() {
    copyToClipboard(listItem.textContent); //I wanted to copy modern websites so i added copy to Clipboard , when it is clicked 
  });

  passwordList.appendChild(listItem);
  passwordTextarea.value = "";
  alert("Password saved successfully!");
}

// Copies text to clipboard feature use this for reference https://stackoverflow.com/questions/61429649/copy-to-clipboard-using-navigator-clipboard-writetext-not-working-in-android-web
function copyToClipboard(text) { //function takes a text and calls the writeText method 
    navigator.clipboard.writeText(text)
      .then(function() { // the writeText will return a promise if the text is copied to the clipboard if there is a error the catch block will be executed and log a error 
        alert("Password copied to clipboard!");
      })
      .catch(function(error) {
        console.error("Unable to copy to clipboard:", error);
      });
  }
//This is apparently a more reliable method than the older execCommand method 
// Update character limit value display
function updateCharacterLimitValue() {
  characterLimitValue.textContent = characterLimitSlider.value;
}
//Event listerners are functions triggered by the user
// This event listerner is attached to the click of the saveBtn
generateBtn.addEventListener("click", writePassword);

// Event listener to save button
saveBtn.addEventListener("click", savePassword);

// This here is based on the character limit slider when the user changes the length of the desired password
characterLimitSlider.addEventListener("input", updateCharacterLimitValue);

// THis is not a event listener and instead sets up the chracter limit value on the screen 
updateCharacterLimitValue();
