/* This file contains the code for the Player class, which contains the name of the player and his/her hand. */

class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
    this.extraHand = [];
  }

  /* Player receive card from dealer */
  receiveCard(card) {
    this.hand.push(card);
  }

  /* Player receive card from dealer in a tie situation */
  receiveExtraCard(card) {
    this.extraHand.push(card);
  }
}

module.exports = Player;
