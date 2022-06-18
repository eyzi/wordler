import fs from "fs";
import WordleGame from "./wordle-mock/wordle-game.js";
import WordleGuesser from "./solver/wordle-guesser.js";

const word = process.argv[2].toUpperCase();
if (word.length !== 5) {
  console.error(`Word ${word} is not 5 characters long`);
  process.exit(0);
}

const possibleWords = fs.readFileSync("./words.txt", "utf-8").split("\n");
const game = new WordleGame(word);
const guesser = new WordleGuesser(possibleWords);

do {
  const newGuess = await guesser.generateGuess();
  if (!newGuess) {
    console.error(`Guesser could not guess the word ${word}`);
    process.exit(0);
  }

  const feedback = game.makeGuess(newGuess);
  console.log(newGuess, feedback);
  guesser.considerGuessFeedbackPair(newGuess, feedback);
} while (!game.isGuessCorrect);
