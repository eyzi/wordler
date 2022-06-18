import WordleWord from "./wordle-word.js";

export default class WordleGame {
  word;
  isGuessCorrect;

  constructor(wordToGuess) {
    this.word = new WordleWord(wordToGuess);
    this.isGuessCorrect = false;
  }

  makeGuess(guess) {
    const feedback = this.word.giveFeedback(guess);
    if (feedback === "GGGGG") this.isGuessCorrect = true;
    return feedback;
  }
}