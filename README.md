# Card Game Simulation

This is a simulation of a card game. The rules of the card game are as follows:

- There are four players
- Each player has three cards
- The winner is determined by the following order: trail (three cards of the same number), sequence (numbers in order), pairs, top card
- If top card has the same value, tied players draws a card from the deck until a winner is found
- The suit does not matter

To run the simulation:

- Install NodeJS if it is not available
- Run the command 'npm install' as installation of Mocha (test framework is required)
- Run the command 'node ./src/Main.js'
- Console should display the result of one round of simulation of the game. Cards are randomly shuffled every simulation run.
- Example:

Hands of the Game:

Player A: 4S 9S 4H

Player B: 6S 2C JD

Player C: 5S 8S 4C

Player D: 8C 7D 5C

Winner: Player A

- Another example (tie situation):

Hands of the Game:

Player A: 7H 8D KS

Player B: 7S 6C TC

Player C: AS 4C QS Extra Round: 7C

Player D: QD AH 4H Extra Round: QH

Winner: Player D

To run the tests:

- Run the command 'npm test'

The cards are represented by two letters, the first letter represents the rank (2, 3, 4, 5, 6, 7, 8, 9, T, J, Q, K, A) and the second letter represents the suit (S, D, H, C for Spades, Diamonds, Hearts and Clubs respectively).
