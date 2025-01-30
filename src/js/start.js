import Game from "./game";

class Start {
  static init() {
    this.game = new Game("#game-board");
    this.game.startGame();
  }
}

export default Start;
