"use strict";
const startButton = document.querySelector(".start-button");
const userControlSection = document.querySelector(".control-div");
const humanImage = document.querySelector(".human-image");
const computerImage = document.querySelector(".computer-image");
const announceText = document.querySelector(".announcement");
const humanScoreBoard = document.querySelector(".human-score");
const computerScoreBoard = document.querySelector(".computer-score");
const choices = ["rock", "paper", "scissors"];

let [humanScore, computerScore] = [0, 0];

// helper functions to make the reset function smaller and more readable;
function hideImages() {
  humanImage.style.opacity = 0;
  computerImage.style.opacity = 0;
  humanImage.src = "";
  computerImage.src = "";
}

function hideAnnouncementText() {
  announceText.textContent = "";
  announceText.classList.add("hidden");
}

function resetScores() {
  humanScore = 0;
  computerScore = 0;
  humanScoreBoard.textContent = "";
  computerScoreBoard.textContent = "";
}

// function to start a new game or clear all the inputs and reset to a new game once a winning condition has been set;
function startGame(event) {
  hideImages();
  hideAnnouncementText();
  resetScores();
  userControlSection.classList.remove("hidden");
}

// a single round, triggered by the click event on the user's chosen button;

function playRound(humanChoice) {
  const computerChoice = getComputerChoice();
  checkRoundWinner(humanChoice, computerChoice);
  announceText.classList.toggle("hidden");
  if (humanScore === 5 || computerScore === 5) declareWinner();
  else setTimeout(nextRound, 2000);
}

// resets the user input section to accept another choice while the game is valid;
function nextRound() {
  hideAnnouncementText();
  userControlSection.classList.toggle("hidden");
}

// generate random integer between 0 and 2 (inclusive) and return a random choice from the array;
const getComputerChoice = function () {
  const choiceInd = Math.floor(Math.random() * 3);
  const computerChoice = choices[choiceInd];
  computerImage.src = `./images/${computerChoice}.webp`;
  computerImage.style.opacity = 1;
  return computerChoice;
};

// helper functions to call for the possible win/loss/tie conditions, breaks down the larger evaluation;

const humanWins = function () {
  humanScore++;
  humanScoreBoard.textContent = humanScore;
  announceText.textContent = "You Win this round!";
};
const computerWins = function () {
  computerScore++;
  computerScoreBoard.textContent = computerScore;
  announceText.textContent = "Computer won this round!";
};

const tie = function () {
  announceText.textContent = "TIE!";
};

// declaring the final winner if a score has reached 5;
const declareWinner = function () {
  humanImage.style.opacity = 0;
  computerImage.style.opacity = 0;
  humanImage.src = "";
  computerImage.src = "";
  if (humanScore === 5) {
    announceText.textContent = "You Win!";
    humanImage.src = "./images/winner.webp";
    humanImage.style.opacity = 1;
  } else if (computerScore === 5) {
    announceText.textContent = "Computer Won!";
    computerImage.src = "./images/winner.webp";
    computerImage.style.opacity = 1;
  }
  setTimeout(function () {
    hideAnnouncementText();
    startButton.classList.toggle("hidden");
  }, 3000);
};

// helper function : abstracts the evaluation away from the round function;
const checkRoundWinner = function (humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    tie();
  } else if (humanChoice === "rock") {
    if (computerChoice === "paper") {
      computerWins();
    } else if (computerChoice === "scissors") {
      humanWins();
    }
  } else if (humanChoice === "paper") {
    if (computerChoice === "scissors") {
      computerWins();
    } else if (computerChoice === "rock") {
      humanWins();
    }
  } else if (humanChoice === "scissors") {
    if (computerChoice === "rock") {
      computerWins();
    } else if (computerChoice === "paper") {
      humanWins();
    }
  }
};

// event listener starts the clean game or calls the reset if a game has already played;
startButton.addEventListener("click", function () {
  startButton.classList.toggle("hidden");
  announceText.textContent = "First to 5 Wins...";
  announceText.classList.toggle("hidden");
  setTimeout(startGame, 2000);
});

// event listener for taking the user input nd using the id to set the user's played choice image;
userControlSection.addEventListener("click", function (event) {
  const humanChoice = event.target.id;
  humanImage.src = `./images/${humanChoice}.webp`;
  humanImage.style.opacity = 1;
  userControlSection.classList.toggle("hidden");
  playRound(humanChoice);
});
