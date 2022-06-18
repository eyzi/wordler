import WordleWord from "./wordle-word.js";

export default class WordleGame {
  word;
  isGuessCorrect;

  /**
   * Creates a mock Wordle game that keeps track 
   * of whether the word has been guessed
   * @param {String} wordToGuess 
   */
  constructor(wordToGuess) {
    this.word = new WordleWord(wordToGuess);
    this.isGuessCorrect = false;
  }

  /**
   * Returns the feedback string for a guess and
   * sets `isGuessCorrect` to true if the guess
   * matches the word
   * @param {String} guess 
   * @returns 
   */
  makeGuess(guess) {
    const feedback = this.word.giveFeedback(guess);
    if (feedback === "GGGGG") this.isGuessCorrect = true;
    return feedback;
  }
}