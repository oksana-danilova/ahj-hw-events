export default class Game {
  constructor(boardSelector) {
    this.board = document.querySelector(boardSelector);
    this.cells = [];
    this.goblinImgSrc = require("../img/goblin.png");
    this.hits = 0;
    this.misses = 0;
    this.maxMisses = 5;
    this.initBoard();
    this.attachCursor();
  }

  initBoard() {
    for (let i = 0; i < 16; i += 1) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      this.board.appendChild(cell);
      this.cells.push(cell);
    }
  }

  attachCursor() {
    this.cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        if (cell.firstChild && cell.firstChild.classList.contains("goblin")) {
          this.updateScore(true, cell);
          cell.firstChild.remove();
        } else {
          this.updateScore(false);
        }
      });
    });
  }

  updateScore(hit = null) {
    if (hit) {
      this.hits++;
      document.querySelector(".score.hit").textContent = this.hits;
    } else {
      this.misses++;
      document.querySelector(".score.miss").textContent = this.misses;
      if (this.misses >= this.maxMisses) {
        alert("Игра окончена!");
        clearInterval(this.intervalId);

        this.hits = 0;
        this.misses = 0;

        document.querySelector(".score.hit").textContent = this.hits;
        document.querySelector(".score.miss").textContent = this.misses;
      }
    }
  }

  startGame() {
    const goblin = document.createElement("img");
    goblin.src = this.goblinImgSrc;
    goblin.classList.add("goblin");
    let previousCellIndex = Math.floor(Math.random() * this.cells.length);
    let currentCell = this.cells[previousCellIndex];
    currentCell.appendChild(goblin);

    this.intervalId = setInterval(() => {
      goblin.classList.add("hidden");

      let randomCellIndex;
      do {
        randomCellIndex = Math.floor(Math.random() * this.cells.length);
      } while (randomCellIndex === previousCellIndex);

      previousCellIndex = randomCellIndex;
      currentCell = this.cells[randomCellIndex];

      currentCell.appendChild(goblin);
      goblin.classList.remove("hidden");
    }, 1000);
  }
}
