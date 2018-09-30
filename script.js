$(document).ready(function () {
  $('#guessView').hide();
  $('#reset-btn').hide();
  $('#guess-btn').prop('disabled', true);
  $('#clear-btn').prop('disabled', true);
  $('#guessInput').keyup(function () {
    $('#guess-btn').prop('disabled', this.value == '' ? true : false);
    $('#clear-btn').prop('disabled', this.value == '' ? true : false);
    $('#reset-btn').prop('disabled', this.value == '' ? true : false);
  })
});  

var minInput = document.querySelector('#minInput');
var maxInput = document.querySelector('#maxInput');
var submit = document.querySelector('#submit-btn');
var guess = document.querySelector('#guess-btn');
var clear = document.querySelector('#clear-btn');
var reset = document.querySelector('#reset-btn');
var answer = 0;

submit.addEventListener('click', validateNumbers);
guess.addEventListener('click', validateGuess);
clear.addEventListener('click', clearField);
reset.addEventListener('click', resetGame);


function validateNumbers() {
  var min = parseInt(minInput.value, 10);
  var max = parseInt(maxInput.value, 10);
  if (isNaN(min) || isNaN(max)) {
    alert("Check your min and max values, they need to be whole numbers.");
    return false;
  }
  else if (min >= max) {
    alert("The number on the left must be lower than the number on the right.");
    return false;
  }
  else {
    toggleView();
    setRangeParams(min, max);
    generateAnswer(min, max);
  }
}

function toggleView() {
  $('#rangeView').hide();
  $('#guessView').show();
}

function generateAnswer(min, max) {
  answer = Math.floor(Math.random() * (max - min + 1)) + min;
}

function validateGuess() {
  event.preventDefault();
  var userGuess = document.getElementById('guessInput');
  var guess = parseInt(userGuess.value, 10);
  var min = parseInt(minInput.value, 10);
  var max = parseInt(maxInput.value, 10);

  if (min <= guess && guess <= max) {
    $('#reset').show();
    generateResponse(guess);
  }
  else {
    alert("That number is out of range, guess again.");
    return false;
  }
}

function generateResponse() {
}

function clearField() {
  document.getElementById('guessInput').value = ''
  disableButtons();
}


function disableButtons() {
  $('#guess-btn').prop('disabled', true);
  $('#clear-btn').prop('disabled', true);
  $('#reset-btn').prop('disabled', true);
}

function setRangeParams(min,max) {
  document.getElementById("guessInput").placeholder = `Enter a guess between ${min} and ${max}`;
  document.getElementById("guessInput").min = min
  document.getElementById("guessInput").max = max
}

function resetGame() {
  location.reload();
}