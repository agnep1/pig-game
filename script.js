'use strict';

/* 
Abiejų žaidėjų taškų total atskiruose kintamuosiuose laiko
Nunulina taškus, kad atsidariu būtų 0
paslepia 'kauliuką' kad nesimatytų, pasirodo, po pirmo ridenimo.

*/

//Reaching elements (.texContent is property)
const newGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const holdPoints = document.querySelector('.btn--hold');
const dicePicture = document.querySelector('.dice');

dicePicture.classList.add('hidden');

const nextPlayer = function () {
  document.querySelector(`.player--0`).classList.toggle('player--active');
  document.querySelector(`.player--1`).classList.toggle('player--active');
};

rollDice.addEventListener('click', function () {
  const diceValue = Math.trunc(Math.random() * 6) + 1;
  dicePicture.src = `dice-${diceValue}.png`;
  dicePicture.classList.remove('hidden');
  //Can not move currentScore outside because it would have the value of the moment of declaration
  //and will not update each time it is used in code
  const currentScore = document.querySelector(`.player--active .current-score`);
  if (diceValue === 1) {
    currentScore.textContent = 0;
    nextPlayer();
  } else {
    currentScore.textContent = Number(currentScore.textContent) + diceValue;
  }
});

holdPoints.addEventListener('click', function () {
  //Can not move currentScore outside because it would have the value of the moment of declaration
  //and will not update each time it is used in code
  const currentScore = document.querySelector(`.player--active .current-score`);
  const totalScore = document.querySelector(`.player--active .score`);
  totalScore.textContent =
    Number(totalScore.textContent) + Number(currentScore.textContent);
  if (totalScore.textContent >= 10) {
    document.querySelector(`.player--active`).classList.add('player--winner');
  } else {
    currentScore.textContent = 0;
    nextPlayer();
  }
});

newGame.addEventListener('click', function () {
  document.querySelector('.player--active').classList.remove('player--winner');
  document.querySelector('#current--0').textContent = 0;
  document.querySelector('#current--1').textContent = 0;
  document.querySelector('#score--0').textContent = 0;
  document.querySelector('#score--1').textContent = 0;
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
  dicePicture.classList.add('hidden');
});
