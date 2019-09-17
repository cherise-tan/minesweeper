document.addEventListener('DOMContentLoaded', startGame)

var clickSound = document.getElementById("click");
var winSound = document.getElementById("applause");
var loseSound = document.getElementById("explosion");
var flagSound = document.getElementById("flag");

var board = undefined;
var mines = 1;

// Don't remove this function call: it makes the game work!
function startGame() {
  var gameSize = window.prompt("What size board would you like to play - Small, Medium or Large?", "Small");

  do {
    if (gameSize.toLowerCase() === "small") {
      createBoard(3);
    } else if (gameSize.toLowerCase() === "medium") {
      createBoard(4);
    } else if (gameSize.toLowerCase() === "large") {
      createBoard(5);
    } else {
      gameSize = window.prompt("Please enter another response. Small, Medium or Large?", "Small")
    }
  }
  while (board === undefined);

  for (let i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }

  document.addEventListener("click", function (event) {
    checkForWin();
    if (event.target.classList.contains('mine')) {
      playSound(loseSound);
    } else {
      playSound(clickSound);
    }
  });
  
  document.addEventListener("contextmenu", function (event) {
    checkForWin();
    playSound(flagSound);
  })

  lib.initBoard()
  document.getElementById('btn').addEventListener("click", restartGame)
}

function createBoard(size) {
  board = {
    cells: []
  }

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      board.cells.push({
        row: x,
        col: y,
        isMine: Boolean(generateMines(size)),
        isMarked: false,
        hidden: true
      });
    }
  }
};

// randomly generate mines with mine cap
function generateMines(size) {
  if (mines < (size * size) / 3) {
    var randomNumber = Math.round(Math.random());
    if (randomNumber === 1) {
      mines++
    }
    return randomNumber;
  } else {
    return false;
  }
}

// Define this function to look for a win condition:
function checkForWin() {
  for (let i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine && !board.cells[i].isMarked) {
      return;
    } else if (!board.cells[i].isMine && board.cells[i].hidden) {
      return;
    }
  }

  lib.displayMessage('You win!');
  playSound(winSound);
}

// Define this function to count the number of mines around the cell
function countSurroundingMines(cell) {
  var surroundingMines = lib.getSurroundingCells(cell.row, cell.col);
  var count = 0;
  for (var i = 0; i < surroundingMines.length; i++) {
    if (surroundingMines[i].isMine === true) {
      count++;
    }
  }
  return count;
}

function restartGame() {
  document.querySelector('.board').innerHTML = "";
  board = undefined;
  mines = 1;
  startGame();
}

function playSound(sound) {
  sound.play();
  return;
}