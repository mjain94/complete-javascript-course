'use strict';

console.log('Script Loaded');

let secretNumber = Math.trunc(Math.random() * 20) + 1;
console.log(`secretNumber: ${secretNumber}`);

let score = 20;
let highscore = 0;
let completed = false;

const origAttrs = {
  message: document.querySelector('.message').textContent,
  number: document.querySelector('.number').textContent,
  backgroundColor: document.querySelector('body').style.backgroundColor,
};

document.querySelector('.check').addEventListener('click', () => {
  const inputVal = document.querySelector('.guess').value;
  console.log(`inputVal: ${inputVal}`);

  if (completed) {
    document.querySelector('.message').textContent =
      'You have already won Champ!';
  } else if (!inputVal) {
    document.querySelector('.message').textContent = 'Please input a number!';
  } else if (inputVal > secretNumber) {
    updateScore(-1, 'Too high!');
  } else if (inputVal < secretNumber) {
    updateScore(-1, 'Too low!');
    // game is won
  } else {
    updateScore(0, 'Correct Number!');
    updateHighscore();
    completed = true;
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
  }
});

document.querySelector('.again').addEventListener('click', () => {
  score = 20;
  completed = false;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  console.log(`secretNumber: ${secretNumber}`);

  document.querySelector('.message').textContent = origAttrs.message;
  document.querySelector('.number').textContent = origAttrs.number;
  document.querySelector('body').style.backgroundColor =
    origAttrs.backgroundColor;
  document.querySelector('.score').textContent = score;
  document.querySelector('.guess').value = '';
  console.log('Game reset by the user.');
});

function updateScore(delta, message) {
  score = Math.max(0, score + delta);
  document.querySelector('.score').textContent = score;
  if (score === 0) {
    document.querySelector('.message').textContent = 'Game over!';
    completed = true;
  } else {
    document.querySelector('.message').textContent = message;
  }
}

function updateHighscore() {
  if (score > highscore) {
    highscore = score;
    document.querySelector('.highscore').textContent = highscore;
  }
  console.log(`high score updated to ${highscore}.`);
}
