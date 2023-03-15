"use strict";

// selected elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const btnNewEl = document.querySelector(".btn--new");
const btnRollEl = document.querySelector(".btn--roll");
const btnHoldEl = document.querySelector(".btn--hold");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");


let currentScore;
let activePlayer;
let scores;
let isPlaying;

// initialize
const reset = () => {
  diceEl.classList.remove("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");

  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  isPlaying = true;
}
reset();

// change player
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  // change player and background
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// when click roll
btnRollEl.addEventListener("click", () => {
  if (isPlaying) {
    let numberRandom = Math.trunc(Math.random() * 6 + 1);
    // show dice
    diceEl.classList.remove("hidden");
    diceEl.src = `imgs/dice-${numberRandom}.png`;

    if (numberRandom !== 1) {
      // update current score
      currentScore += numberRandom;
      // change current score player
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});


// Save score current player
btnHoldEl.addEventListener("click", () => {
  if (isPlaying) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check player win
    if (scores[activePlayer] >= 100) {
      isPlaying = false;
      document.querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");

      diceEl.classList.add("hidden");
      player0El.classList.remove("player--active");
      player1El.classList.remove("player--active");
      
    }else {
      switchPlayer();
    }
  }
});

// reset game
btnNewEl.addEventListener('click', reset)
