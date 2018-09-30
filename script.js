// Page Setup
$(document).ready(function () {
  // hide buttons not needed initially
  $('#guessView').hide();
  $('#reset-btn').hide();
  $('#challenge-btn').hide();
   // disable the guess and clear button here so that all disabled property handlings are in the same place
  $('#guess-btn').prop('disabled', true);
  $('#clear-btn').prop('disabled', true);
  // set the disabled property of button element using jq 1.6, once user types anything into the guessInput, the keyup function will enable buttons
  $('#guessInput').keyup(function () {
    $('#guess-btn').prop('disabled', this.value == '' ? true : false);
    $('#clear-btn').prop('disabled', this.value == '' ? true : false);
    $('#reset-btn').prop('disabled', this.value == '' ? true : false);
  })
});  

// Global Vars
// the reason I used ES5- this was more or less a spike, I didn't even know what ES5 or ES6 were prior to this assignment so I started with ES5- Browser Driven Development made me do it?
// I suppose I could have put these in designated spots where needed but I preferred to organize them here to protect consistency as I built out each path
var minInput = document.querySelector('#minInput');
var maxInput = document.querySelector('#maxInput');
var submitButton = document.querySelector('#submit-btn');
var guessButton = document.querySelector('#guess-btn');
var clearButton = document.querySelector('#clear-btn');
var resetButton = document.querySelector('#reset-btn');
var challengeButton = document.querySelector('#challenge-btn');
// had to initially store answer in global var as 0 for scope purposes, down in the generate answer function, I reset it based on min and max values.  This way it's accessible in the generateFeedback function
var answer = 0;


// Event Listeners
// I saw this approach of setting variables and then adding event listeners onto the variable and it seemed clean so I ran with it.  Again, I liked the consistency of storing them here for workflow support purposes
// Essentially when a particular button is clicked, a particular method is called as a result
submitButton.addEventListener('click', validateNumbers);
guessButton.addEventListener('click', validateGuess);
clearButton.addEventListener('click', clearGuessInput);
resetButton.addEventListener('click', resetGame);
challengeButton.addEventListener('click', increaseDifficulty);


// Validations
function validateNumbers() {
  // parseInt(015, 10); will return 15 based on lines 44 and 45...setting the radix to 10 seemed harmless
  var min = parseInt(minInput.value, 10);
  var max = parseInt(maxInput.value, 10);
  // if min or max are non numbers, alert the user that new values need to be entered
  // if min is greater than or equal to max I also alert the user that the min is not the min or the max is not the max based on their input
  // if the min and max are both numbers and are in the right order, I switch up the view, update the html range elements (min, max and placeholder) and generate an answer in the "background"
  if (isNaN(min) || isNaN(max)) {
    alert("Check your min and max values, they need to be whole numbers.");
  } else if (min >= max) {
    alert("The number on the left must be lower than the number on the right.");
  } else {
    toggleViews();
    setRangeParams(min, max);
    generateAnswer(min, max);
  }
}

function validateGuess() {
  event.preventDefault();
  var userGuess = document.getElementById('guessInput');
  var guess = parseInt(userGuess.value, 10);
  var min = parseInt(minInput.value, 10);
  var max = parseInt(maxInput.value, 10);
  
  if (min <= guess && guess <= max) {
    generateFeedback(guess);
  } else {
    alert("That number is out of range, guess again.");
  }
}

// Challenge
  function increaseDifficulty() {
    event.preventDefault();
    var lastMin = parseInt(minInput.value, 10);
    var lastMax = parseInt(maxInput.value, 10);

    var min = lastMin - 10;
    var max = lastMax + 10;

    toggleViews();
    setRangeParams(min, max);
    generateAnswer(min, max);
    clearGuessInput();
    alert("Your new range has increased by 10 in both directions. Good Luck!");
  }


// Helpers
function generateFeedback(guess) {
  $('#reset-btn').show();
  $('#gameFeedback').show();

  if (answer > guess) {
    standardFeedback(guess);
    alert("That guess was too low, guess again.");
  } else if (answer < guess) {
    standardFeedback(guess);
    alert("That guess was too high, guess again.");
  } else {
    document.getElementById('prompt').innerHTML = ''
    document.getElementById('lastGuess').innerHTML = 'BOOM!';
    document.getElementById('instruction').innerHTML = 'You guessed the number! CHALLENGE to increase difficulty, RESET to start a new game.'
    disableButtons();
    $('#challenge-btn').show();
  }
}

function generateAnswer(min, max) {
  answer = Math.floor(Math.random() * (max - min + 1)) + min;
}

function standardFeedback(guess) {
  document.getElementById('prompt').innerHTML = 'Your last guess was:'
  document.getElementById('lastGuess').innerHTML = guess;
  document.getElementById('instruction').innerHTML = 'CLEAR to guess again, RESET to start a new game.'
}

function toggleViews() {
  $('#rangeView').hide();
  $('#gameFeedback').hide();
  $('#guessView').show();
}

function setRangeParams(min,max) {
  document.getElementById("guessInput").placeholder = `Enter a guess between ${min} and ${max}`;
  document.getElementById("guessInput").min = min
  document.getElementById("guessInput").max = max
}

function resetGame() {
  location.reload();
}

function clearGuessInput() {
  document.getElementById('guessInput').value = ''
  disableButtons();
  $('#reset-btn').hide();
  $('#challenge-btn').hide();
}

function disableButtons() {
  $('#guess-btn').prop('disabled', true);
  $('#clear-btn').prop('disabled', true);
}