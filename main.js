const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const timeDisplay = document.querySelector('.timer');
let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  // If hole is same as last one selected, skip it and run randomHole again
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

// Show/Hide Mole
function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    // After random time hide the mole
    hole.classList.remove('up');
    // If timeUp is set to false run peep again (show another mole)
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  // Reset the countdown timer
  clearInterval(countdown);
  timeDisplay.textContent = 10;
  // Reset the scoreboard
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => timeUp = true, 10000);
  startCountdown();
}

let countdown;
function startCountdown(seconds = 10) {
  countdown = setInterval(() => {
    if (seconds < 1) {
      clearInterval(countdown);
      return;
    }
    seconds--;
    timeDisplay.textContent = seconds;
  }, 1000);
}

function whack(e) {
  if (!e.isTrusted) return; // Check for cheating with fake clicks
  score++;
  // Mole drops down if hit
  this.classList.remove('up');
  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', whack));