/* This file contains the code for the Deck class, which represents the deck of randomly shuffled 
cards to be dealt to the players. */

class Deck {
  constructor() {
    this.ranks = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "T",
      "J",
      "Q",
      "K",
      "A",
    ];
    this.suits = ["S", "H", "D", "C"];
    /* Cards are named using rank + suit convention, e.g. '9C' (9 of Clubs) */
    this.cards = this.ranks
      .map((rank) => this.suits.map((suit) => rank + suit))
      .flat();
    this.shuffle();
  }

  /* Shuffle cards using Durstenfeld shuffle algorithm */
  shuffle() {
    for (var i = this.cards.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
  }

  /* Deal out the top card from the deck */
  deal() {
    return this.cards.pop();
  }
}

module.exports = Deck;
