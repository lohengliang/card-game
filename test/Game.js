var assert = require("chai").assert;
const Game = require("../src/Game.js");
const Deck = require("../src/Deck.js");

describe("Verify Game class runs the game", function () {
  context(
    "Create a Game instance with four players with three cards each, play and check the game status",
    function () {
      it("There should be four players", function () {
        game = new Game(["Player A", "Player B", "Player C", "Player D"], 3);
        game.play();
        assert.equal(game.players.length, 4);
      });
      it("Each player should have three cards", function () {
        for (const player of game.players) {
          assert.equal(player.hand.length, 3);
        }
      });
    }
  );
});

describe("Verify group function", function () {
  context(
    "Create hands and check that the group function group the hands by rank",
    function () {
      it("[2,3,4] should return [[1,4], [1,3] and [1,2]]", function () {
        assert.deepEqual(game.group([2, 3, 4]), [
          [1, 4],
          [1, 3],
          [1, 2],
        ]);
      });
      it("[2,2,4] should return [[2,2] and [1,4]]", function () {
        assert.deepEqual(game.group([2, 2, 4]), [
          [2, 2],
          [1, 4],
        ]);
      });
      it("[2,2,2] should return [[3, 2]]", function () {
        assert.deepEqual(game.group([2, 2, 2]), [[3, 2]]);
      });
    }
  );
});

describe("Verify zip function", function () {
  context(
    "Create group array and verify that the group array is split into count array and rank array",
    function () {
      it("[[1,4], [1,3], [1,2]] should return [[1,1,1], [4,3,2]]", function () {
        assert.deepEqual(
          game.zip([
            [1, 4],
            [1, 3],
            [1, 2],
          ]),
          [
            [1, 1, 1],
            [4, 3, 2],
          ]
        );
      });
      it("[[2,2], [1,4]] should return [[2,1], [2,4]]", function () {
        assert.deepEqual(
          game.zip([
            [2, 2],
            [1, 4],
          ]),
          [
            [2, 1],
            [2, 4],
          ]
        );
      });
      it("[[1, 4], [1, 3], [1, 2]] should return [[1, 1, 1], [4, 3, 2]]", function () {
        assert.deepEqual(
          game.zip([
            [1, 4],
            [1, 3],
            [1, 2],
          ]),
          [
            [1, 1, 1],
            [4, 3, 2],
          ]
        );
      });
    }
  );
});

describe("Verify countsToString function", function () {
  context(
    "Create counts and check that the counts become a string",
    function () {
      it("[1,1,1] should return '1,1,1'", function () {
        assert.deepEqual(game.countsToString([1, 1, 1]), "1,1,1");
      });
    }
  );
});

describe("Verify handRank function", function () {
  context(
    "Create hand and check that the function returns the correct rank of the hand",
    function () {
      it("['2S', '5S', '7S'] should return [0, [7, 5, 2]]", function () {
        assert.deepEqual(game.handRank(["2S", "5S", "7S"]), [0, [7, 5, 2]]);
      });
      it("['2S', '2C', '7S'] should return [1, [7, 2]]", function () {
        assert.deepEqual(game.handRank(["2S", "2C", "7S"]), [1, [2, 7]]);
      });
      it("['2S', '3S', '4S'] should return [3, [4, 3, 2]]", function () {
        assert.deepEqual(game.handRank(["2S", "3S", "4S"]), [3, [4, 3, 2]]);
      });
      it("['2S', '2C', '2H'] should return [4, [2]]", function () {
        assert.deepEqual(game.handRank(["2S", "2C", "2H"]), [4, [2]]);
      });
    }
  );
});

describe("Verify allMax function", function () {
  context(
    "Create players and hands and check that the function returns the correct winner",
    function () {
      it("Hands are [[ '7H', 'AD', '2C' ], [ '2S', 'KH', '9C' ], [ 'QS', 'JH', '8S' ],[ '4C', '2H', 'QH' ]], Player A should be the winner.", function () {
        game = new Game(["Player A", "Player B", "Player C", "Player D"], 3);
        game.deck = new Deck();
        game.deck.cards = [
          "QH",
          "8S",
          "9C",
          "2C",
          "2H",
          "JH",
          "KH",
          "AD",
          "4C",
          "QS",
          "2S",
          "7H",
        ];
        game.deal();
        game.getWinner();
        assert.deepEqual(game.hands, [
          ["7H", "AD", "2C"],
          ["2S", "KH", "9C"],
          ["QS", "JH", "8S"],
          ["4C", "2H", "QH"],
        ]);
        assert.deepEqual(game.winner[0], game.players[0]);
      });

      it("Hands are [[ '3C', '7C', '9C' ], [ '5S', 'KH', '6C' ], [ '6S', '8D', '8S' ], [ 'KC', 'TC', 'TH' ]], Player D should be the winner.", function () {
        game = new Game(["Player A", "Player B", "Player C", "Player D"], 3);
        game.deck = new Deck();
        game.deck.cards = [
          "TH",
          "8S",
          "6C",
          "9C",
          "TC",
          "8D",
          "KH",
          "7C",
          "KC",
          "6S",
          "5S",
          "3C",
        ];
        game.deal();
        game.getWinner();
        assert.deepEqual(game.hands, [
          ["3C", "7C", "9C"],
          ["5S", "KH", "6C"],
          ["6S", "8D", "8S"],
          ["KC", "TC", "TH"],
        ]);
        assert.deepEqual(game.winner[0], game.players[3]);
      });

      it("Hands are [[ 'KD', '9H', '5C' ], [ 'QS', 'KH', '2C' ], [ '4S', '6D', '5D' ], [ 'JC', '9C', 'JD' ]], Player C should be the winner.", function () {
        game = new Game(["Player A", "Player B", "Player C", "Player D"], 3);
        game.deck = new Deck();
        game.deck.cards = [
          "JD",
          "5D",
          "2C",
          "5C",
          "9C",
          "6D",
          "KH",
          "9H",
          "JC",
          "4S",
          "QS",
          "KD",
        ];
        game.deal();
        game.getWinner();
        assert.deepEqual(game.hands, [
          ["KD", "9H", "5C"],
          ["QS", "KH", "2C"],
          ["4S", "6D", "5D"],
          ["JC", "9C", "JD"],
        ]);
        assert.deepEqual(game.winner[0], game.players[2]);
      });

      it("Hands are [[ '6H', 'AC', '2D' ], [ '3S', '2S', '8S' ],  [ '9S', 'JS', '7D' ], [ '4H', '4D', '4C' ]], Player D should be the winner.", function () {
        game = new Game(["Player A", "Player B", "Player C", "Player D"], 3);
        game.deck = new Deck();
        game.deck.cards = [
          "4C",
          "7D",
          "8S",
          "2D",
          "4D",
          "JS",
          "2S",
          "AC",
          "4H",
          "9S",
          "3S",
          "6H",
        ];
        game.deal();
        game.getWinner();
        assert.deepEqual(game.hands, [
          ["6H", "AC", "2D"],
          ["3S", "2S", "8S"],
          ["9S", "JS", "7D"],
          ["4H", "4D", "4C"],
        ]);
        assert.deepEqual(game.winner[0], game.players[3]);
      });

      it("Hands are [[ '3C', '8C', '8H' ], [ '5S', 'KH', '6C' ], [ '6S', '8D', '8S' ], [ 'KC', 'TC', 'TH' ]], Player D should be the winner.", function () {
        game = new Game(["Player A", "Player B", "Player C", "Player D"], 3);
        game.deck = new Deck();
        game.deck.cards = [
          "TS",
          "JH",
          "TH",
          "8S",
          "6C",
          "8H",
          "TC",
          "8D",
          "KH",
          "8C",
          "KC",
          "6S",
          "5S",
          "3C",
        ];
        game.deal();
        game.getWinner();
        assert.deepEqual(game.hands, [
          ["3C", "8C", "8H"],
          ["5S", "KH", "6C"],
          ["6S", "8D", "8S"],
          ["KC", "TC", "TH"],
        ]);
        assert.deepEqual(game.winner[0], game.players[3]);
      });

      it("Hands are [[ '3C', '8C', '8H' ], [ '5S', 'KH', '6C' ], [ '6S', '8D', '8S' ], [ 'KC', '4C', 'TH' ]], Player A and Player C to tie and enter the draw another card. Player A then has the larger card and should be the winner.", function () {
        game = new Game(["Player A", "Player B", "Player C", "Player D"], 3);
        game.deck = new Deck();
        game.deck.cards = [
          "TS",
          "JH",
          "TH",
          "8S",
          "6C",
          "8H",
          "4C",
          "8D",
          "KH",
          "8C",
          "KC",
          "3S",
          "5S",
          "3C",
        ];
        game.deal();
        game.getWinner();
        assert.deepEqual(game.hands, [
          ["3C", "8C", "8H"],
          ["5S", "KH", "6C"],
          ["3S", "8D", "8S"],
          ["KC", "4C", "TH"],
        ]);
        assert.deepEqual(game.winner[0], game.players[0]);
      });
    }
  );
});

describe("Verify largerRank function", function () {
  context(
    "Create two hands and check that the hand one is correctly identified to be larger/smaller rank than hand two.",
    function () {
      it("largerRank([4, [2]], [3, [4, 3, 2]]) should return true", function () {
        assert.equal(game.largerRank([4, [2]], [3, [4, 3, 2]]), true);
      });
      it("largerRank([0, [7, 5, 2]], [1, [7, 2]]]) should return false", function () {
        assert.equal(game.largerRank([0, [7, 5, 2]], [1, [7, 2]]), false);
      });
    }
  );
});

describe("Verify singleRank function", function () {
  context(
    "Create a hand and verify that singleRank returns the correct rank.",
    function () {
      it("singleRank(['2S']) should return 2", function () {
        assert.equal(game.singleRank(["2S"]), 2);
      });
      it("singleRank(['TH']) should return 10", function () {
        assert.equal(game.singleRank(["TH"]), 10);
      });
      it("singleRank(['JD']) should return 11", function () {
        assert.equal(game.singleRank(["JD"]), 11);
      });
      it("singleRank(['QS']) should return 12", function () {
        assert.equal(game.singleRank(["QS"]), 12);
      });
      it("singleRank(['KC']) should return 13", function () {
        assert.equal(game.singleRank(["KC"]), 13);
      });
      it("singleRank(['AS']) should return 14", function () {
        assert.equal(game.singleRank(["AS"]), 14);
      });
    }
  );
});

describe("Verify singleMax function", function () {
  context(
    "Create a hand and verify that singleMax returns the correct winner during the extra stage.",
    function () {
      game = new Game(["Player A", "Player B", "Player C", "Player D"], 3);
      game.players[0].extraHand = ["7C"];
      game.players[2].extraHand = ["KD"];
      assert.deepEqual(game.singleMax([["7C"], ["KD"]])[0], game.players[2]);
    }
  );
});
