// Spike: ES5. I didn't even know what ES5 or ES6 were prior to this assignment so I started with ES5- Browser Driven Development made me do it?

$(document).ready(function () { // Page Setup (let jquery setup the initial page view lines 2-16)
  $('#guessView').hide(); // hide guess inputs and submit button upon start
  $('#reset-btn').hide(); // hide reset button upon start
  $('#challenge-btn').hide(); // hide challenge button upon start
  $('#guess-btn').prop('disabled', true); // disable guess button to start
  $('#clear-btn').prop('disabled', true); // disable clear button to start
  $('#guessInput').keyup(function () { // set the keyup function to enable guess & clear buttons once a guess has been entered, disable buttons if text removed
    $('#guess-btn').prop('disabled', this.value == '' ? true : false); // if this(being guessInput) value is populated return true, else return false
    $('#clear-btn').prop('disabled', this.value == '' ? true : false); // if this(being guessInput) value is populated return true, else return false
    $('#reset-btn').prop('disabled', this.value == '' ? true : false); // if this(being guessInput) value is populated return true, else return false
  })
});  

// Global Vars (let javascript handle variable declaration)
// not sure if this is the proper way to organize but keeping all of these together made the most sense for me and my flow
var minInput = document.querySelector('#minInput'); // get the first element in the document with id="minInput" and assign it to minInput
var maxInput = document.querySelector('#maxInput'); // get the first element in the document with id="maxInput" and assign it to maxInput
var submitButton = document.querySelector('#submit-btn'); // get the first element in the document with id="submit-btn" and assign it to submitButton
var guessButton = document.querySelector('#guess-btn'); // get the first element in the document with id="guess-btn" and assign it to guessButton
var clearButton = document.querySelector('#clear-btn'); // get the first element in the document with id="clear-btn" and assign it to clearButton
var resetButton = document.querySelector('#reset-btn'); // get the first element in the document with id="reset-btn" and assign it to resetButton 
var challengeButton = document.querySelector('#challenge-btn'); // get the first element in the document with id="challenge-btn" and assign it to challengeButton 
var answer = 0;  // initially declare answer as 0, use generateAnswer function to reset it based on min and max values.  This way it's accessible in the generateFeedback function


// Event Listeners (let javascript handle event listeners)
// Essentially when a particular button is clicked, a particular method is called as a result
submitButton.addEventListener('click', validateNumbers);
guessButton.addEventListener('click', validateGuess);
clearButton.addEventListener('click', clearGuessInput);
resetButton.addEventListener('click', resetGame);
challengeButton.addEventListener('click', increaseDifficulty);


// Validation Functions
function validateNumbers() { // once a user submits the range, input is validated
  var min = parseInt(minInput.value, 10); // parseInt(015, 10); will return integer 15 based on lines 39 and 40...setting the radix to 10 seemed harmless
  var max = parseInt(maxInput.value, 10); // same as above for max value
  if (isNaN(min) || isNaN(max)) { // if min or max are non numbers, alert the user that new values need to be entered
    alert("Check your min and max values, they need to be whole numbers.");
  } else if (min >= max) {// if min is greater than or equal to max, alert the user that the min is not the min or the max is not the max based
    alert("The number on the left must be lower than the number on the right.");
  } else {// if the min and max are both numbers in the right order...
    toggleViews(); // switch up the view
    setRangeParams(min, max; // updated the html values for the guessInput element (min, max, placeholder)
    generateAnswer(min, max); // rewrite the answer from 0 to a random number
  }
}

function validateGuess() {
  event.preventDefault(); // still not 100% sure about this, I just know that it allows me to have access to minInput and maxInput, without it the fields are null
  var userGuess = document.getElementById('guessInput'); // retrieve the user's guess in string format
  var guess = parseInt(userGuess.value, 10); // parse user guess as done with min and max, to integer format
  var min = parseInt(minInput.value, 10); // bring min back into play for guess comparison as integer
  var max = parseInt(maxInput.value, 10); // bring max back into play for guess comparison as integer
  if (min <= guess && guess <= max) { // confirm that the user's guess is a number within the set range 
    generateFeedback(guess); // if so, generate feedback based on the guess
  } else {
    alert("That number is out of range, guess again."); // alert user that a new guess is needed, within range.
  }
}

// Challenge
// If a winner accepts the challenge, per the spec, a new range will be calculated to increase the difficulty.
  function increaseDifficulty() {
    event.preventDefault(); // still not 100% sure about this, I just know that it allows me to have access to minInput and maxInput, without it the fields are null
    var lastMin = parseInt(minInput.value, 10); // store last round min to carry out challenge per spec
    var lastMax = parseInt(maxInput.value, 10); // store last round max to carry out challenge per spec
    var min = lastMin - 10; // 10 will be subtracted from the last rounds min 
    var max = lastMax + 10; // 10 will be added to the last rounds max
    toggleViews(); // toggle views just like we did in a regular game
    setRangeParams(min, max); // updated the html values for the guessInput element (min, max, placeholder)
    generateAnswer(min, max); // rewrite the answer from 0 to a random number
    clearGuessInput(); // the last rounds user guess was still in the guessInput line so it is cleared 
    alert("Your new range has increased by 10 in both directions. Good Luck!"); // user is alerted of the new range preseented for the challenge
  }


// Helpers
function generateFeedback(guess) {
  $('#reset-btn').show(); // reveal id reset button
  $('#gameFeedback').show(); // reveal div with id gameFeedback
  if (answer > guess) { // if the answer is greater than the guess
    standardFeedback(guess); // layout the standard feedback as requested by the spec
    alert("That guess was too low, guess again."); //  alert the user that the guess was too low
  } else if (answer < guess) { // if answer is less than the guess
    standardFeedback(guess); // layout the standard feedback as request by the spec
    alert("That guess was too high, guess again."); // alert the user that the guess was too high
  } else { // otherwise, the user guess must be equal to the answer...
    document.getElementById('prompt').innerHTML = '' // clear the prompt "Your last guess was:" from the standard feedback
    document.getElementById('lastGuess').innerHTML = 'BOOM!'; // replace last guess integer with text: BOOM! as requested by spec
    document.getElementById('instruction').innerHTML = 'You guessed the number! CHALLENGE to increase difficulty, RESET to start a new game.' // update the instructions to announce win and include challenge
    disableButtons(); // disable the buttons guess and clear
    $('#challenge-btn').show(); // reveal the challenge button -jquery
  }
}

function generateAnswer(min, max) { // pass in min max values to 
  answer = Math.floor(Math.random() * (max - min + 1)) + min; // generate a random number within range and overwrite the original answer var
}

function standardFeedback(guess) { // pulled this out into a helper method as they are unchanged unless user guesses correctly
  document.getElementById('prompt').innerHTML = 'Your last guess was:' // based on spec
  document.getElementById('lastGuess').innerHTML = guess; // populate the user guess as last guess
  document.getElementById('instruction').innerHTML = 'CLEAR to guess again, RESET to start a new game.' // inform user of options
}

function toggleViews() {
  $('#rangeView').hide(); // hide the div with the id rangeView -jquery
  $('#gameFeedback').hide(); // hide the div with the id gameFeedback -jquery
  $('#guessView').show(); // show the field with the id guessView, guess button and clear button -jquery
}

function setRangeParams(min,max) {
  document.getElementById("guessInput").placeholder = `Enter a guess between ${min} and ${max}`; // populate a place holder for the user with range reminder, string interpolate with back ticks
  document.getElementById("guessInput").min = min // populate the min for the html element with id guessInput so that the arrows will not allow number below min
  document.getElementById("guessInput").max = max // populate the max for the html element with id guessInput so that the arrows will not allow number above max
  // user can still type in number above or below, but should they use the arrows, only a number within range can be selected
}

function resetGame() {
  location.reload(); // this might be aggressive but it did the trick, reload the page for a brand new game
}

function clearGuessInput() {
  document.getElementById('guessInput').value = '' // remove any guess remaining in the element with id guessInput
  disableButtons(); // disable the guess and clear buttons to follow spec request
  $('#reset-btn').show(); // show the element with the id reset-btn- jquery
}

function disableButtons() {
  $('#guess-btn').prop('disabled', true); // find the element with id guess-btn, set the property to disabled -jquery
  $('#clear-btn').prop('disabled', true); // find the element with id clear-btn, set the property to disabled -jquery
}