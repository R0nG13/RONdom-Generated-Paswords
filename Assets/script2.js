// Get references to the #generate element
var generateBtn = document.querySelector("#generate");



// Write password to the #password input
function writePassword() {
    var createdPassword = generatePassword();
    var passwordText = document.querySelector("#password");

passwordText.value = createdPassword;        // This is the generated password
}

// Add event listener to generate button

generateBtn.addEventListener("click", writePassword);

// Password Length
function getPassWordLength() {
    var passWordLength = 0;                
  while( !( passWordLength >= 8  && passWordLength <= 128 ) ) {
        passWordLength = Number( window.prompt("Enter desired password length (8-128 characters): ") );
    }
    return passWordLength;
}



// Functions for characters

function getLowerCase() {

  var allowLowerCase = true;  
    allowLowerCase = window.confirm( "Would you like to use lower case letters (abcde...z)? ") ;
    return allowLowerCase;
}


function getUpperCase() {
  var allowUpperCase = true;   
    allowUpperCase = window.confirm( "Allow upper case letters (ABCDE....Z)\n(Ok=Yes or Cancel=No): ") ;
    return allowUpperCase;
}


function getNumbers() {
    var allowNumbers = true;    
        allowNumbers = window.confirm( "Allow numbers (0123....9)\n(Ok=Yes or Cancel=No): ") ;
        return allowNumbers;
}


function getSpecials() {
    var allowSpecials = true;   
        allowSpecials = window.confirm( "Allow special characters (!@#$...?><)\n(Ok=Yes or Cancel=No): ") ;
        return allowSpecials;
}


function generatePassword() {



    var createdPassWord = "";
  
  
  
    // First, obtain the characteristics of the password to be generated.
  
  
  
    var passWordLength = getPassWordLength();
  
    var allowLowerCase = getLowerCase();
  
    var allowUpperCase = getUpperCase();
  
    var allowNumbers   = getNumbers();
  
    var allowSpecials  = getSpecials();
  
  
  
    // Verify that at least one character set was selected.
  
    var somethingSelected = allowLowerCase | allowUpperCase | allowNumbers | allowSpecials;
  
  
  
    if( !somethingSelected ) {
  
      window.alert( "Error, you must select at least one character set, please try again." );
  
      createdPassWord = generatePassword();
  
    }
  
  
  
    // Build the password according to the criteria.
  
  
  
    if (createdPassWord == 0) {
  
      createdPassWord = buildPassword(passWordLength, allowLowerCase, allowUpperCase, allowNumbers, allowSpecials);
  
    }
  
  
  
    return createdPassWord;
  
  }



  function buildPassword(passWordLength, allowLowerCase, allowUpperCase, allowNumbers, allowSpecials ) {



    // Define the various character sets that possible make up the password.
  
  
  
    var lowerCaseLetters  = "abcdefghihklmnopqrstuvwxyz";
  
    var upperCaseLetters  = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
    var numberCharacters  = "1234567890";
  
    var specialCharacters   = "!@#$%^&*()_+=-?><,.:;[]{}/~|";
  
  
  
    var characterSet1 = ""; // the combined set of password characters based on the user's selections
  
  
  
    if( allowLowerCase ) {  // include lower case letters if requested
  
      characterSet1 += lowerCaseLetters;
  
    }
  
  
  
    if( allowUpperCase ) {  // include upper case letters if requested
  
      characterSet1 += upperCaseLetters;
  
    }
  
  
  
    if( allowNumbers ) {  // include numbers if requested
  
      characterSet1 += numberCharacters;
  
    }
  
    
  
    if( allowSpecials ) {  // include special characters if requested
  
      characterSet1 += specialCharacters;
  
    }
  
  
  
  
  
    // Shuffle the character set (into the working set of characters)
  
    var characterSet2 = shuffle( characterSet1 );
  
  
  
    // When building the password, we will pick random characters from both characterSet2 and characterSet3.
  
    // When the password (of the desired length is complete), we must insure that we
  
    // have characters from each of the required categories.
  
  
  
    var requirementSatisfied = false;
  
  
  
    /* while( !requirementSatisfied ) {
  
      // Construct the password string
  
      var passWord = formPassWord( characterSet2, characterSet3, passWordLength );
  
  
  
      // Verify that the password string meets requirements
  
      requirementSatisfied = verifyPassword( specialCharacters, passWord, passWordLength, allowLowerCase, allowUpperCase, allowNumbers, allowSpecials );
  
  
  
    }
  */
  
  
    // Have a password that meets requirements.
  
   
  
    console.log( "The generated password is: ", passWord );
  
    return passWord;
  
  }





function shuffle( characterSet1 ) {
    var characterSet2 = ""; 
    var arraySet1 = characterSet1.split('');
    var setLength = characterSet1.length;
    var indexRandom = Math.floor( Math.random() * setLength+1 );  // starting random position
  for (var i = 0; i < setLength; i++) {   // loop over the positions to fill in characterSet2


    while (arraySet1[indexRandom] === null) {

      indexRandom = Math.floor(Math.random() * setLength);
    }
    // Take the randomly located character from set1 and put it in the current position [i] of set2.

    // Then set the character position in set1 to "null" so it can't be selected again.
    characterSet2 += arraySet1[indexRandom];
    arraySet1[indexRandom] = null;
  }
  return characterSet2;
}
/*


///////////////////////////////////////////////////////////////////////////

function formPassWord( characterSet2, characterSet3, passWordLength ) {



  // Loop over the desired length, and extract that many characters, from random positionss

  // in characterSet2 & characterSet3, and stuff them into the passWord string.



  var passWord  = "";

  var setLength = characterSet2.length;



  for( var i = 0; i < passWordLength; i++ ) {

    indexRandom = Math.floor( Math.random() * setLength );



    // Alternate between the two character sets, based on odd/even "loop-index" values.

    if( (i%2) ) {

        // If "i" is odd, use characterSet2, if "i" is even use characterSet3

        passWord += characterSet2[indexRandom];

    }

    else {  // even value of loop index

        passWord += characterSet3[indexRandom];

    }

  

  }



  return passWord;

}



///////////////////////////////////////////////////////////////////////////////////////////////////

function verifyPassword(specialCharacters, passWord, passWordLength, allowLowerCase, allowUpperCase, allowNumbers, allowSpecials) {



  // Verify the length of the generated password.



  if( passWord.length !== passWordLength ){

      window.alert( "Error, the generated password length is different from the required length. ");

  }





  // Define another set of boolean values indicating if we have satisfied the four component requirements.

  // We will set each of these "tracker variables" to "true" as a corresponding character is found.



  var haveLowerCase = false;

  if (allowLowerCase) {  // only need to perform this check if lower case letters are required.

    for (var i = 0; i < passWordLength; i++) {

      var characterToTest = passWord[i];

      var asciiValue = characterToTest.charCodeAt(0);    // get the ascii code for the character



      if (asciiValue > 96 && asciiValue < 123) {         // Do we have a-z ?

        haveLowerCase = true;

        break;                 // no need to test further

      }

    }

  }



  var haveUpperCase = false;

  if (allowUpperCase) {  // only need to perform this check if upper case letters are required.

    for (var i = 0; i < passWordLength; i++) {

      var characterToTest = passWord[i];

      var asciiValue = characterToTest.charCodeAt(0);    // get the ascii code for the character



      if (asciiValue > 64 && asciiValue < 91) {          // Do we have A-Z ?

        haveUpperCase = true;

        break;                 // no need to test further

      }

    }

  }



  var haveNumbers = false;

  if (allowNumbers) {  // only need to perform this check if numbers are required.

    for (var i = 0; i < passWordLength; i++) {

      var characterToTest = passWord[i];

      var asciiValue = characterToTest.charCodeAt(0);    // get the ascii code for the character



      if (asciiValue > 47 && asciiValue < 58) {          // Do we have 0-9 ?

        haveNumbers = true;

        break;                 // no need to test further

      }

    }

  }



  var haveSpecials = false;

  if (allowSpecials) {   // only perform this check if special characters are required.

    for (var i = 0; i < passWordLength; i++) {



      var characterToTest = passWord[i];

      if (specialCharacters.indexOf(characterToTest) != -1) {



        //If the password character is a member of "specialCharacters"

        haveSpecials = true;

        break;                 // no need to test further

      }

    }

  }



  // Now compare what we have with what is required.



  var requirementSatisfied = true;    // assume we're good



  if( allowLowerCase && !haveLowerCase)  {

    requirementSatisfied = false;

  }

  if( allowUpperCase && !haveUpperCase)  {

    requirementSatisfied = false;

  }



  if( allowNumbers && !haveNumbers)  {

    requirementSatisfied = false;

  }

  

  if( allowSpecials && !haveSpecials)  {

    requirementSatisfied = false;

  }



  return requirementSatisfied;

  

}





///////////////////////////////////////////////////////////////////////////////////////////////////////

function buildPassword( passWordLength, allowLowerCase, allowUpperCase, allowNumbers, allowSpecials ) {



  // Define the various character sets that possible make up the password.



  var lowerCaseLetters  = "abcdefghihklmnopqrstuvwxyz";

  var upperCaseLetters  = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  var numberCharacters  = "1234567890";

  var specialCharacters   = "!@#$%^&*()_+=-?><,.:;[]{}/~|";



  var characterSet1 = ""; // the combined set of password characters based on the user's selections



  if( allowLowerCase ) {  // include lower case letters if requested

    characterSet1 += lowerCaseLetters;

  }



  if( allowUpperCase ) {  // include upper case letters if requested

    characterSet1 += upperCaseLetters;

  }



  if( allowNumbers ) {  // include numbers if requested

    characterSet1 += numberCharacters;

  }

  

  if( allowSpecials ) {  // include special characters if requested

    characterSet1 += specialCharacters;

  }





  // Shuffle the character set (into the working set of characters)

  var characterSet2 = shuffle( characterSet1 );

  var characterSet3 = shuffle( characterSet2 );



  // When building the password, we will pick random characters from both characterSet2 and characterSet3.

  // When the password (of the desired length is complete), we must insure that we

  // have characters from each of the required categories.



  var requirementSatisfied = false;



  while( !requirementSatisfied ) {

    // Construct the password string

    var passWord = formPassWord( characterSet2, characterSet3, passWordLength );



    // Verify that the password string meets requirements

    requirementSatisfied = verifyPassword( specialCharacters, passWord, passWordLength, allowLowerCase, allowUpperCase, allowNumbers, allowSpecials );



  }



  // Have a password that meets requirements.

 

  console.log( "The generated password is: ", passWord );

  return passWord;

}





///////////////////////////////////////////////////////////////////////////
*/
