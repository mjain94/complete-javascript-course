'use strict';

// Selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const currScoreElems = document.querySelectorAll('.current-score');
const scoreElems = document.querySelectorAll('.score');
const playerElems = document.querySelectorAll('.player');

// State variables
const currScore = [0, 0];
const score = [0, 0];
let currPlayer = 0; // Player 1 (idx 0) always start first
let playing = true;
let winningScore = 10;

function startNewGame() {
  // update game state
  playing = true;

  const players = 2;
  for (let i = 0; i < players; i++) {
    //   update player states
    score[i] = 0;
    currScore[i] = 0;

    // update player elements
    currScoreElems[i].textContent = 0;
    scoreElems[i].textContent = 0;
    playerElems[i].classList.remove('player--winner');
  }

  // update game elements
  if (currPlayer === 1) swapActivePlayer();
  diceEl.classList.remove('hidden');
  diceEl.classList.add('hidden');
}

function updateCurrentScore(delta) {
  currScore[currPlayer] += delta;
  currScoreElems[currPlayer].textContent = currScore[currPlayer];
}

function swapActivePlayer() {
  // 1. Remove player--active style from current active player
  playerElems[currPlayer].classList.remove('player--active');

  // 2. Swap current player
  currPlayer = 1 - currPlayer;

  // 3. Add player--active style to next player
  playerElems[currPlayer].classList.add('player--active');
}

function updateScore() {
  // 1. Update score
  score[currPlayer] += currScore[currPlayer];
  scoreElems[currPlayer].textContent = score[currPlayer];

  // 2. Update current score
  updateCurrentScore(-1 * currScore[currPlayer]);

  // 3. Check is the current player won else swap control
  if (score[currPlayer] >= winningScore) {
    playerElems[currPlayer].classList.add('player--winner');
    diceEl.classList.add('hidden');
    playing = false;
  } else {
    swapActivePlayer();
  }
}

// Starts a new game from scratch
startNewGame();

// Rolling Dice
btnRoll.addEventListener('click', () => {
  if (playing) {
    // 1. Roll dice
    const diceNum = Math.trunc(Math.random() * 6) + 1;
    console.log(`Dice: ${diceNum} for Player ${currPlayer + 1}.`);

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceNum}.png`;

    // 3. Check if 1, switch to other player
    if (diceNum !== 1) {
      updateCurrentScore(diceNum);
    } else {
      updateCurrentScore(-1 * currScore[currPlayer]);
      swapActivePlayer();
    }
  }
});

// Hold the score
btnHold.addEventListener('click', () => {
  if (playing) updateScore();
});

// Start a fresh game
btnNew.addEventListener('click', startNewGame);
