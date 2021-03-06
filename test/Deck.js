var assert = require("chai").assert;
const Deck = require("../src/Deck.js");

describe("Verify Deck class has the correct cards during initialization", function () {
  context("Create a Deck instance and check its cards", function () {
    it("Deck should have cards that are shuffled", function () {
      deck = new Deck();
      assert.notDeepEqual(deck.cards, [
        "2C",
        "2D",
        "2H",
        "2S",
        "3C",
        "3D",
        "3H",
        "3S",
        "4C",
        "4D",
        "4H",
        "4S",
        "5C",
        "5D",
        "5H",
        "5S",
        "6C",
        "6D",
        "6H",
        "6S",
        "7C",
        "7D",
        "7H",
        "7S",
        "8C",
        "8D",
        "8H",
        "8S",
        "9C",
        "9D",
        "9H",
        "9S",
        "AC",
        "AD",
        "AH",
        "AS",
        "JC",
        "JD",
        "JH",
        "JS",
        "KC",
        "KD",
        "KH",
        "KS",
        "QC",
        "QD",
        "QH",
        "QS",
        "TC",
        "TD",
        "TH",
        "TS",
      ]);
    });
  });

  context("Check cards", function () {
    it("Deck should have the correct cards (same cards as a standard 52 card deck)", function () {
      deck = new Deck();
      assert.deepEqual(deck.cards.sort(), [
        "2C",
        "2D",
        "2H",
        "2S",
        "3C",
        "3D",
        "3H",
        "3S",
        "4C",
        "4D",
        "4H",
        "4S",
        "5C",
        "5D",
        "5H",
        "5S",
        "6C",
        "6D",
        "6H",
        "6S",
        "7C",
        "7D",
        "7H",
        "7S",
        "8C",
        "8D",
        "8H",
        "8S",
        "9C",
        "9D",
        "9H",
        "9S",
        "AC",
        "AD",
        "AH",
        "AS",
        "JC",
        "JD",
        "JH",
        "JS",
        "KC",
        "KD",
        "KH",
        "KS",
        "QC",
        "QD",
        "QH",
        "QS",
        "TC",
        "TD",
        "TH",
        "TS",
      ]);
    });
  });
});
