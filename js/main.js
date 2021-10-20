const playButton = document.querySelector(".btn--play");
const NUMBER_OF_BOMBS = 16;
createNewLevel();

playButton.addEventListener("click", createNewLevel);

function createNewLevel() {
  let levelSelect = document.querySelector("#level-select");

  newLevel = parseInt(levelSelect.value);
  let numberOfCells = getHowManyCellsNeededFor(newLevel);
  let numberOfColumns = getNumberOfColumnsNeededFor(numberOfCells);

  createColumns(numberOfColumns);
  createCells(numberOfCells);

  let bombsIndexesArray = generateBombIndexes(numberOfCells);
  createBombs(bombsIndexesArray);

  addEventListenerToCells();
  addEventListenerToBombs();
}

function getHowManyCellsNeededFor(newLevel) {
  const cellsPerLevel = [100, 81, 49];
  let numberOfCells;
  for (let i = 0; i < cellsPerLevel.length; i++) {
    if (i === newLevel) {
      numberOfCells = cellsPerLevel[i];
    }
  }
  return numberOfCells;
}

function getNumberOfColumnsNeededFor(numberOfCells) {
  return Math.sqrt(numberOfCells);
}

function createColumns(numberOfColumns) {
  let gridContainer = document.querySelector(".minefield");
  gridContainer.style.gridTemplateColumns = `repeat(${numberOfColumns}, 1fr)`;
}

function createCells(numberOfCells) {
  let gridContainer = document.querySelector(".minefield");
  gridContainer.textContent = "";

  for (let i = 0; i < numberOfCells; i++) {
    let cell = createNewSingleCell(i);
    gridContainer.append(cell);
  }
}

function createNewSingleCell(index) {
  let cell = document.createElement("div");
  let ratio = document.createElement("div");
  let cellContent = document.createElement("div");

  cell.classList.add("cell");
  ratio.classList.add("ratio");
  cellContent.classList.add("cell-content");

  cellContent.textContent = index + 1;
  cell.append(cellContent);

  return cell;
}

function generateBombIndexes(numberOfCells) {
  let bombsIndexArray = [];
  while (bombsIndexArray.length < NUMBER_OF_BOMBS) {
    let randomNumber = generateRandomIndex(numberOfCells);
    if (!bombsIndexArray.includes(randomNumber)) {
      bombsIndexArray.push(randomNumber);
    }
  }
  return bombsIndexArray;
}

function generateRandomIndex(maxNumber) {
  return Math.round(Math.random() * (maxNumber - 1));
}

function createBombs(bombsIndexesArray) {
  const cells = document.querySelectorAll(".cell");
  for (let i = 0; i < bombsIndexesArray.length; i++) {
    bombIndex = bombsIndexesArray[i];
    cells[bombIndex].classList.add("bomb");
  }
}

function addEventListenerToCells() {
  let cells = document.querySelectorAll(".cell:not(.bomb)");
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", clickCell);
  }
}

function removeEventListenerToCells() {
  let cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.removeEventListener("click", clickCell);
  });
}

function clickCell() {
  this.classList.add("active");
}

function addEventListenerToBombs() {
  let bombs = document.querySelectorAll(".bomb");
  for (let i = 0; i < bombs.length; i++) {
    bombs[i].addEventListener("click", function () {
      clickBomb.call(bombs);
      removeEventListenerToCells();
      displayResult();
    });
  }
}

function clickBomb() {
  for (let i = 0; i < this.length; i++) {
    this[i].classList.add("active");
  }
}

function displayResult() {
  let score = getScore();
  displayScore(score);
}

function getScore() {
  return document.querySelectorAll(".active:not(.bomb)").length;
}

function displayScore(score) {
  let scoreDisplay = document.querySelector(".score");
  let winnerDisplay = document.querySelector(".winner");
  let message = generateWinOrLoseMessage(score);

  scoreDisplay.textContent = `Punteggio: ${score}pt`;
  winnerDisplay.textContent = message;
  winnerDisplay.style.color = "crimson";
}

function generateWinOrLoseMessage(score) {
  let numberOfCellsNotBomb = getnumberOfCellsNotBomb();
  let message;
  if (score === numberOfCellsNotBomb) {
    message = "Hai vinto!";
  } else {
    message = "Hai perso!";
  }
  return message;
}

function getnumberOfCellsNotBomb() {
  return document.querySelectorAll(".cell:not(.bomb)").length;
}
