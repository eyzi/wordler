import fs from "fs";
import WordleGame from "./mock/wordle-game.js";
import WordleGuesser from "./guesser/wordle-guesser.js";

// Take the word from input
const word = process.argv[2].toUpperCase();
if (word.length !== 5) {
  console.error(`Word ${word} is not 5 characters long`);
  process.exit(0);
}
console.info(`Wordler will try to guess ${word}`)

// Initialize game and guesser with possible words
const possibleWords = fs.readFileSync("./words.txt", "utf-8").split("\n");
const game = new WordleGame(word);
const guesser = new WordleGuesser(possibleWords);

// While the guess is incorrect, continue making guesses from feedback
do {
  const newGuess = await guesser.generateGuess(guesser.chooseByRanking);
  if (!newGuess) {
    console.error(`Guesser could not guess the word ${word}`);
    process.exit(0);
  }

  const feedback = game.makeGuess(newGuess);
  console.log(`Guess: ${newGuess} | Feedback: ${feedback}`);
  guesser.considerGuessFeedbackPair(newGuess, feedback);
} while (!game.isGuessCorrect);
