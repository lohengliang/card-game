/* This file contains the code for the Game class, which represents a table of players with a randomly shuffled 
deck. The class contains functions to deal the cards to the players and compare the hands to get the winner. */

const Deck = require("./Deck");
const Player = require("./Player");

class Game {
  constructor(players, handSize) {
    this.players = players.map((player) => new Player(player));
    this.handSize = handSize;
    this.hands = [];
    this.extraHands = [];
    this.deck;
    this.cardRankings = { "3": 4, "2,1": 1, "1,1,1": 0 };
    this.winner;
  }

  /* Play the game */
  play() {
    this.deck = new Deck();
    this.hands = [];
    this.extraHands = [];
    for (const player of this.players) {
      player.hand = [];
      player.extraHand = [];
    }
    this.deal();
    this.getWinner();
  }

  /* Print out the result of the game */
  printResult() {
    console.log("Hands of the Game: \n");
    for (const player of this.players) {
      if (player.extraHand.length === 0) {
        console.log(player.name + ": " + player.hand.join(" "));
      } else {
        console.log(
          player.name +
            ": " +
            player.hand.join(" ") +
            "   Extra Round: " +
            player.extraHand.join(" ")
        );
      }
    }
    console.log("\nWinner: " + this.winner[0].name);
  }

  /* Deal out cards for the players */
  deal() {
    for (let i = 0; i < this.handSize; ++i) {
      for (const player of this.players) {
        player.receiveCard(this.deck.deal());
      }
    }
    for (const player of this.players) {
      this.hands.push(player.hand);
    }
  }

  /* Get the winner of the game */
  getWinner() {
    this.winner = this.allMax(this.hands);
    while (this.winner.length > 1) {
      this.extraHands = [];
      for (const winner of this.winner) {
        let card = this.deck.deal();
        winner.receiveExtraCard(card);
        this.extraHands.push([card]);
      }
      this.winner = this.singleMax(this.extraHands);
    }
  }

  /* Group cards with the same rank together so that pairs and trails can be identified 
  Return arrays of [count of card, card] */
  group(items) {
    let itemsSet = new Set(items);
    let groups = [];
    for (let x of itemsSet) {
      groups.push([items.filter((y) => y === x).length, Number(x)]);
    }
    return groups
      .sort(function (a, b) {
        if (a[0] === b[0]) {
          if (a[1] === b[1]) {
            return 0;
          } else if (a[1] < b[1]) {
            return -1;
          } else {
            return 1;
          }
        } else if (a[0] < b[0]) {
          return -1;
        } else {
          return 1;
        }
      })
      .reverse();
  }

  /* Split the group array into count array and rank array */
  zip(arrays) {
    return arrays[0].map(function (_, i) {
      return arrays.map(function (array) {
        return array[i];
      });
    });
  }

  /* Join counts to string so that the string can be used as key */
  countsToString(counts) {
    return counts.join(",");
  }

  /* Return a value that represents the rank of a hand. The larger the value, the higher the rank of the hand. */
  handRank(hand) {
    let groups = this.group(hand.map((r) => "--23456789TJQKA".indexOf(r[0])));
    let counts, ranks;
    [counts, ranks] = this.zip(groups);

    /* 'Ace' is considered to have a value of 1 instead of 14 when it is in a sequence. */
    if (ranks === [14, 3, 2]) {
      ranks = [3, 2, 1];
    }
    let straight =
      ranks.length === 3 && Math.max(...ranks) - Math.min(...ranks) === 2;

    return [
      Math.max(this.cardRankings[this.countsToString(counts)], 3 * straight),
      ranks,
    ];
  }

  /* Return the winner that has the largest hand */
  allMax(iterable) {
    let maxRank = this.handRank(
      iterable.reduce((prev, curr) =>
        this.largerRank(this.handRank(curr), this.handRank(prev)) ? curr : prev
      )
    );
    let result = [];
    for (const player of this.players) {
      if (
        JSON.stringify(this.handRank(player.hand)) === JSON.stringify(maxRank)
      ) {
        result.push(player);
      }
    }
    return result;
  }

  /* Determine which hand has the larger rank */
  largerRank(hand1, hand2) {
    let result = false;
    if (hand1[0] > hand2[0]) {
      result = true;
    } else if (hand1[0] === hand2[0]) {
      for (let idx = 0; idx < hand1.length; idx++) {
        if (hand1[1][idx] > hand2[1][idx]) {
          result = true;
          break;
        } else if (hand1[1][idx] < hand2[1][idx]) {
          break;
        }
      }
    }
    return result;
  }

  /* Return the rank of the card */
  singleRank(hand) {
    return Number(hand.map((r) => "--23456789TJQKA".indexOf(r[0])));
  }

  /* Return the winner that has the largest single card during a tie breaker */
  singleMax(iterable) {
    let maxRank = this.singleRank(
      iterable.reduce((prev, curr) =>
        this.singleRank(curr) > this.singleRank(prev) ? curr : prev
      )
    );
    let result = [];
    for (const player of this.players) {
      if (
        JSON.stringify(this.singleRank(player.extraHand.slice(-1))) ===
        JSON.stringify(maxRank)
      ) {
        result.push(player);
      }
    }
    return result;
  }
}

module.exports = Game;
