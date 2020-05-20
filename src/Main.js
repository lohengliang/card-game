/* The file contains code for a simulation run. */

const Game = require("./Game");

game = new Game(["Player A", "Player B", "Player C", "Player D"], 3);
game.play();

/* Run simulation until tie situation reached, uncomment to activate */
/* while (game.extraHands.length === 0) {
  game.play();
} */

game.printResult();
