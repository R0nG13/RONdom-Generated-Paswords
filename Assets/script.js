/* GIVEN I need a new, secure password
WHEN I click the button to generate a password
THEN I am presented with a series of prompts for password criteria
WHEN prompted for password criteria
THEN I select which criteria to include in the password
WHEN prompted for the length of the password
THEN I choose a length of at least 8 characters and no more than 128 characters
WHEN prompted for character types to include in the password
THEN I choose lowercase, uppercase, numeric, and/or special characters
WHEN I answer each prompt
THEN my input should be validated and at least one character type should be selected
WHEN all prompts are answered
THEN a password is generated that matches the selected criteria
WHEN the password is generated
THEN the password is either displayed in an alert or written to the page
```*/





// Assignment Code
const specialCharacters = "!#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
var generateBtn = document.querySelector("#generate");
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);



// Write password to the #password input
 function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

   passwordText.value = password;

 }



// prompts that come up after you click generate

function generatePassword() {
  var passwordLength = determineLength()
  var lowerCase = allowLowerCase()
  var upperCase = allowUpperCase()
  var numbers = allowNumbers()
  var special = allowSpecials()

  // this is a minimum count for numbers, lowerCases, upperCases & specialCharacters
  var minimumCount = 0;


  // empty minimums
var minimumNumbers = "";
var minimumLowerCase = "";
var minimumUpperCase = "";
var minimumSpecial = "";
console.log(passwordLength, numbers, lowerCase, upperCase, special);
console.log(minimumNumbers, minimumLowerCase, minimumUpperCase, minimumSpecial);
// Generator

var functionArray = {

  getNumbers: function() {
    return String.fromCharCode(Math.floor(Math.random() * 10 + 48));
  },
  
  getLowerCase: function() {
    return String.fromCharCode(Math.floor(Math.random() * 26 + 97));
  },

  getUpperCase: function() {
    return String.fromCharCode(Math.floor(Math.random() * 26 + 65));
  },

  getSpecial: function() {
    return specialCharacters[Math.floor(Math.random() * specialCharacters.length)]
  }

}; 

// Checks to make sure user selected ok for all and uses empty minimums from above

if ( numbers ) {
  minimumNumbers = functionArray.getNumbers();
  minimumCount++;
}

if (lowerCase) {
  minimumLowerCase = functionArray.getLowerCase();
  minimumCount++;
}

if (upperCase) {
  minimumUpperCase = functionArray.getUpperCase();
  minimumCount++;
}

if (special) {
  minimumSpecial = functionArray.getSpecial();
  minimumCount++;
 
}

// empty string variable for the for loop below
var randomPasswordGenerated = "";

// loop getting random characters
for (let i = 0; i < (parseInt(passwordLength) - minimumCount); i++) {
  var randomNumberPicked = Math.floor(Math.random() * 9);

  randomPasswordGenerated += randomNumberPicked;
  
}

// to make sure characters are added to the password
randomPasswordGenerated += minimumLowerCase;
randomPasswordGenerated += minimumUpperCase;
randomPasswordGenerated += minimumSpecial;
randomPasswordGenerated += minimumNumbers;



return randomPasswordGenerated;

}

function determineLength() {
  var passwordLength = 0;
  while( !(passwordLength >= 8 && passwordLength <= 128)) {
    passwordLength = Number( window.prompt("Please enter desired password length. (btw 8 - 128): "));
        console.log (passwordLength);
  }
  return passwordLength;
}
// Functions for characters

function allowLowerCase() {

  var lowerCase = true;  
  lowerCase = window.confirm( "Would you like to use lower case letters (abcde...z)? ") ;
    return lowerCase;
}


function allowUpperCase() {
     
  upperCase = window.confirm( "Allow upper case letters (ABCDE....Z)\n(Ok=Yes or Cancel=No): ") ;
    return upperCase;
}


function allowNumbers() {
        
        numbers = window.confirm( "Allow numbers (0123....9)\n(Ok=Yes or Cancel=No): ") ;
        return numbers;
}


function allowSpecials() {
    var special = true;   
        special = window.confirm( "Allow special characters (!@#$...?><)\n(Ok=Yes or Cancel=No): ") ;
        return special;
}
