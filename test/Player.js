var assert = require("chai").assert;
const Player = require("../src/Player.js");

describe("Verify Player class has the correct cards during initialization", function () {
  context("Create a Player instance and check its cards", function () {
    it("Player should have no cards during initialization", function () {
      player = new Player();
      assert.deepEqual(player.hand, []);
    });
  });

  context(
    "Deal a card to the Player instance and check its cards",
    function () {
      it("Player should have the same card that was dealt to him", function () {
        player.receiveCard("2S");
        assert.deepEqual(player.hand, ["2S"]);
      });
    }
  );
});
