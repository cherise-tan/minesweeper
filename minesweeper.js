document.addEventListener('DOMContentLoaded', startGame)

var clickSound = document.getElementById("click");
var winSound = document.getElementById("applause");
var loseSound = document.getElementById("explosion");
var flagSound = document.getElementById("flag");

document.addEventListener("click", function (event) {
  if (event.target.classList.contains('mine')) {
    playSound(loseSound);
  } else {
    playSound(clickSound);
  }
});

document.addEventListener("contextmenu", function (event) {
  playSound(flagSound);
})

var board = undefined;

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

  document.addEventListener("click", checkForWin);
  document.addEventListener("contextmenu", checkForWin);

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
        isMine: Boolean(Math.round(Math.random())),
        isMarked: false,
        hidden: true
      });
    }
  }
  // ,
};




// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin() {

  for (let i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine && !board.cells[i].isMarked) {
      return;
    } else if (!board.cells[i].isMine && board.cells[i].hidden) {
      return;
    }
  }

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
  lib.displayMessage('You win!');
  playSound(winSound);


}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
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
  startGame();
}

function playSound(sound) {
  sound.play();
  return;
}