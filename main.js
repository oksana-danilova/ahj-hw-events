/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 842:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "2dbd01ce16c0fa83cb67.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/

;// ./src/js/game.js
class Game {
  constructor(boardSelector) {
    this.board = document.querySelector(boardSelector);
    this.cells = [];
    this.goblinImgSrc = __webpack_require__(842);
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
    this.cells.forEach(cell => {
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
;// ./src/js/start.js

class Start {
  static init() {
    this.game = new Game("#game-board");
    this.game.startGame();
  }
}
/* harmony default export */ const start = (Start);
;// ./src/js/app.js

document.addEventListener("DOMContentLoaded", () => {
  start.init();
});
;// ./src/index.js


/******/ })()
;