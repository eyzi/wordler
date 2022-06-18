export default class WordleWord {
  _word;

  constructor(word) {
    this._word = word;
  }

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
