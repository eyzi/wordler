export default class WordleWord {
  _word;

  /**
   * Set up word to guess
   * @param {String} word 
   */
  constructor(word) {
    this._word = word;
  }

  /**
   * Generate a feedback string for the guess where
   *  - X is when the letter does not exist in the word
   *  - Y is when the letter exists in the word but is not in the correct place
   *  - Z is when the letter exists in the word and is in the correct place
   * @param {String} guess 
   * @returns feedback string
   */
  giveFeedback(guess) {
    return guess
      .split("")
      .map((letter, index) => {
        if (!this._word.includes(letter)) return "X";
        if (this._word[index] === guess[index]) return "G";
        return "Y";
      })
      .join("")
  }
}
