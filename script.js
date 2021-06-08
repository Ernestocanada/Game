'use strict';
const scorePlayer0EL = document.getElementById('score--0');
const scorePlayer1EL = document.getElementById('score--1');
const diceEL = document.querySelector('.dice');
const currentScorePlayer0 = document.getElementById('current--0');
const currentScorePlayer1 = document.getElementById('current--1');
const buttonNewGame = document.querySelector('.btn--new');
const buttonRollDice = document.querySelector('.btn--roll');
const buttonHold = document.querySelector('.btn--hold');
const playerActive0 = document.querySelector('.player--0');
const playerActive1 = document.querySelector('.player--1');

// initial Conditions
let score, currentScore, actPlayer, playing;

const initialCond = () => {
  currentScorePlayer0.textContent = 0;
  currentScorePlayer1.textContent = 0;
  scorePlayer0EL.textContent = 0;
  scorePlayer1EL.textContent = 0;
  diceEL.classList.add('hidden');
  score = [0, 0];
  currentScore = 0;
  actPlayer = 0;
  playing = true;
  playerActive0.classList.add('player--active');
  playerActive1.classList.remove('player--active');
  playerActive0.classList.remove('player--winner');
  playerActive1.classList.remove('player--winner');
  document.getElementById(`name--0`).textContent = 'PLAYER 1';
  document.getElementById(`name--1`).textContent = 'PLAYER 2';
};
initialCond();
// switching player
const switchPlayer = () => {
  document.getElementById(`current--${actPlayer}`).textContent = 0;
  currentScore = 0;
  actPlayer = actPlayer === 0 ? 1 : 0;

  playerActive1.classList.toggle('player--active');
  playerActive0.classList.toggle('player--active');
};

//Roll Dice
buttonRollDice.addEventListener('click', () => {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEL.classList.remove('hidden');
    //Display dice
    diceEL.src = `dice-${dice}.png`;
    //Check for 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${actPlayer}`).textContent =
        currentScore;

      // Switch to next player
    } else {
      switchPlayer();
    }
  }
});
//Hold the score
buttonHold.addEventListener('click', () => {
  if (playing) {
    score[actPlayer] += currentScore;
    document.getElementById(`score--${actPlayer}`).textContent =
      score[actPlayer];
    //winner player
    if (score[actPlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${actPlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${actPlayer}`)
        .classList.remove('player--active');
      diceEL.classList.add('hidden');
      document.getElementById(`name--${actPlayer}`).textContent = 'WINNER🥇';
    } else {
      switchPlayer();
    }
  }
});

buttonNewGame.addEventListener('click', initialCond);

//Game rules
const rules = document.querySelector('.mod');
const overlay = document.querySelector('.overlay');
const gameRulesButton = document.querySelector('.rules');

const closeGameRules = () => {
  rules.classList.add('hidden');
  overlay.classList.add('hidden');
};

const openGamenRules = () => {
  rules.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
rules.addEventListener('click', closeGameRules);
gameRulesButton.addEventListener('click', openGamenRules);
overlay.addEventListener('click', closeGameRules);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !rules.classList.contains('hidden')) {
    closeGameRules();
  }
});
