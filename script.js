"use strict";

// define initial score values
let [humanScore, computerScore] = [0, 0];

// array of possible choices for use within the random choice function;
const choices = ["rock", "paper", "scissors"];

// generate random integer between 0 and 2 (inclusive) and return a random choice from the array;
const getComputerChoice = function () {
  const choiceInd = Math.floor(Math.random() * 3);
  return choices[choiceInd];
};

// function to take a choice from a prompt, validate it, and return it;
const getHumanChoice = function () {
  let valid = false;
  let choice = prompt(
    "make a choice from: paper, scissors or rock"
  ).toLowerCase();
  while (!valid) {
    if (choice !== "paper" && choice !== "scissors" && choice !== "rock") {
      choice = prompt("choose again: paper, scissors or rock").toLowerCase();
    } else {
      valid = true;
      return choice;
    }
  }
  valid = false;
};

// helper functions to call for the possible win/loss/tie conditions;
// in the game loop;
const humanWins = function () {
  humanScore++;
  console.log(`You win this round!`);
};
const computerWins = function () {
  computerScore++;
  console.log(`You lose this round!`);
};

const tie = function () {
  console.log(`TIE!`);
};
// declaring the final winner;
const declareWinner = function (winner, score) {
  console.log(
    `${winner} ${
      winner === "You" ? "are" : "is"
    } the winner! the final score was ${score}`
  );
};

// function for a single round of the game;
const playRound = function (humanChoice, computerChoice) {
  console.log(`you chose ${humanChoice},`);
  console.log(`computer chose ${computerChoice},`);

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

// playRound(getHumanChoice(), getComputerChoice());

// function with a loop to play 5 rounds of the game;
const playGame = function () {
  let winner = "";
  let score = "";
  for (let i = 0; i < 5; i++) {
    playRound(getHumanChoice(), getComputerChoice());
  }
  if (computerScore > humanScore) {
    winner += "Computer";
    score += `${computerScore} to ${humanScore}`;
  } else if (computerScore < humanScore) {
    winner += "You";
    score += `${humanScore} to ${computerScore}`;
  } else if (computerScore === humanScore) {
    winner += "NO-ONE";
    score += `${humanScore} to ${computerScore}`;
  }
  declareWinner(winner, score);
};

// calling the final function to play 5 rounds;

// playGame();
