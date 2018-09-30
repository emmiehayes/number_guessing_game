// Page Setup
$(document).ready(function () {
  $('#guessView').hide();
  $('#reset-btn').hide();
  $('#challenge-btn').hide();
  $('#guess-btn').prop('disabled', true);
  $('#clear-btn').prop('disabled', true);
  $('#guessInput').keyup(function () {
    $('#guess-btn').prop('disabled', this.value == '' ? true : false);
    $('#clear-btn').prop('disabled', this.value == '' ? true : false);
    $('#reset-btn').prop('disabled', this.value == '' ? true : false);
  })
});  

// Global Vars
var minInput = document.querySelector('#minInput');
var maxInput = document.querySelector('#maxInput');
var submitButton = document.querySelector('#submit-btn');
var guessButton = document.querySelector('#guess-btn');
var clearButton = document.querySelector('#clear-btn');
var resetButton = document.querySelector('#reset-btn');
var challengeButton = document.querySelector('#challenge-btn');
var answer = 0;


// Event Listeners
submitButton.addEventListener('click', validateNumbers);
guessButton.addEventListener('click', validateGuess);
clearButton.addEventListener('click', clearGuessInput);
resetButton.addEventListener('click', resetGame);
challengeButton.addEventListener('click', increaseDifficulty);


// Validations
function validateNumbers() {
  var min = parseInt(minInput.value, 10);
  var max = parseInt(maxInput.value, 10);

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