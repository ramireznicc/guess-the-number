// HTML ELEMENTS
const LEVEL = document.querySelector("#lvl-num");
const MAX_NUM = document.querySelector("#max-num");
const TRIES = document.querySelector("#tries");
const USER_INPUT = document.querySelector("#user-input");
const RESULT = document.querySelector("#result");
const CONGRATS = document.querySelector("#congrats");
// BUTTONS
const BTN_NEXT_LVL = document.querySelector("#btn-next-level");
const BTN_SUBMIT = document.querySelector("#btn-submit");
const BTN_NEW_GAME = document.querySelector("#btn-new-game");

// VARIABLES
let toGuess;
let userNumbers = [];
let lvlPassed = false;

const WIN_MUSIC = new Audio("./src/WIN.mp3");

// MESSAGES
const MESSAGE_TYPE = {
  INVALID: "Please, enter a valid number!",
  REPEATED: "You already tried with that number!",
  GUESSED: "Yes! You guessed it! 😁",
  ALMOST_THERE: "Almost there!",
  VERY_CLOSE: "Very close!",
  CLOSE: "Close!",
  FAR_AWAY: "Far away!",
  GAME_OVER: "Game over 😥 The number was ",
};

// COLORS
const COLORS = {
  INVALID: "#aaaaaa",
  GUESSED: "#95f480",
  ALMOST_THERE: "#fe5100",
  VERY_CLOSE: "#ff5c5c",
  CLOSE: "#f48585",
  FAR_AWAY: "#4d88ff",
  GAME_OVER: "#acacac",
  NORMAL: "#545e73",
};

//STARTING THE GAME
let triesLeft = 10;
let maxNumber = 50;
let level = 1;

newLevel(triesLeft, maxNumber, level);

// FUNCTIONS
function game() {
  if (level != 3) {
    RESULT.hidden = false;
  }
  isValid() && checkingNumber();
  checkingGameOver();
  USER_INPUT.value = "";
}

function randomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

function newLevel(triesLeft, maxNumber, level) {
  toGuess = randomNumber(maxNumber);
  USER_INPUT.disabled = false;
  RESULT.hidden = true;
  BTN_NEW_GAME.hidden = true;
  BTN_NEXT_LVL.hidden = true;
  BTN_SUBMIT.hidden = false;
  CONGRATS.hidden = true;
  document.body.style.background = COLORS.NORMAL;
  userNumbers = [];
  TRIES.textContent = triesLeft;
  MAX_NUM.textContent = maxNumber;
  LEVEL.textContent = level;
}

function nextLevel() {
  if (level == 1) {
    lvlPassed = false;
    triesLeft = 10;
    maxNumber = 100;
    level = 2;
    newLevel(triesLeft, maxNumber, level);
  } else if (level == 2) {
    lvlPassed = false;
    triesLeft = 3;
    maxNumber = 10;
    level = 3;
    RESULT.HIDDEN = true;
    newLevel(triesLeft, maxNumber, level);
  }
}

function isValid() {
  if (
    Number(USER_INPUT.value) > maxNumber ||
    Number(USER_INPUT.value) <= 0 ||
    isNaN(USER_INPUT.value) ||
    USER_INPUT.value == ""
  ) {
    RESULT.textContent = MESSAGE_TYPE.INVALID;
    RESULT.style.background = COLORS.INVALID;
    return false;
  } else if (userNumbers.includes(Number(USER_INPUT.value))) {
    RESULT.textContent = MESSAGE_TYPE.REPEATED;
    RESULT.style.background = COLORS.INVALID;
    return false;
  } else {
    return true;
  }
}

function checkingNumber() {
  if (Number(USER_INPUT.value) == toGuess) {
    lvlPassed = true;
    RESULT.hidden = false;
    RESULT.textContent = MESSAGE_TYPE.GUESSED;
    RESULT.style.background = COLORS.GUESSED;
    document.body.style.background = COLORS.GUESSED;
    BTN_SUBMIT.hidden = true;
    BTN_NEXT_LVL.hidden = false;
    USER_INPUT.disabled = true;
    if (level == 3) {
      BTN_NEXT_LVL.hidden = true;
      CONGRATS.hidden = false;
      WIN_MUSIC.play();
    }
  } else if (Math.abs(toGuess - Number(USER_INPUT.value)) <= 1) {
    RESULT.textContent = MESSAGE_TYPE.ALMOST_THERE;
    RESULT.style.background = COLORS.ALMOST_THERE;
    userNumbers.push(Number(USER_INPUT.value));
    triesLeft--;
    TRIES.textContent = triesLeft;
  } else if (Math.abs(toGuess - Number(USER_INPUT.value)) <= 5) {
    RESULT.textContent = MESSAGE_TYPE.VERY_CLOSE;
    RESULT.style.background = COLORS.VERY_CLOSE;
    userNumbers.push(Number(USER_INPUT.value));
    triesLeft--;
    TRIES.textContent = triesLeft;
  } else if (Math.abs(toGuess - Number(USER_INPUT.value)) <= 10) {
    RESULT.textContent = MESSAGE_TYPE.CLOSE;
    RESULT.style.background = COLORS.CLOSE;
    userNumbers.push(Number(USER_INPUT.value));
    triesLeft--;
    TRIES.textContent = triesLeft;
  } else {
    RESULT.textContent = MESSAGE_TYPE.FAR_AWAY;
    RESULT.style.background = COLORS.FAR_AWAY;
    userNumbers.push(Number(USER_INPUT.value));
    triesLeft--;
    TRIES.textContent = triesLeft;
  }
}

function checkingGameOver() {
  if (!lvlPassed && triesLeft == 0) {
    RESULT.hidden = false;
    RESULT.textContent = MESSAGE_TYPE.GAME_OVER + toGuess;
    RESULT.style.background = COLORS.GAME_OVER;
    document.body.style.background = COLORS.GAME_OVER;
    BTN_SUBMIT.hidden = true;
    BTN_NEW_GAME.hidden = false;
    USER_INPUT.disabled = true;
  }
}

// BUTTONS EVENT-LISTENERS
BTN_SUBMIT.addEventListener("click", game);

BTN_NEXT_LVL.addEventListener("click", nextLevel);

BTN_NEW_GAME.addEventListener("click", () => {
  window.location.reload();
});

//SUBMIT NUMBER BY PRESSING ENTER KEY
document.addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    game();
  }
});
