import WordlePlace from "./wordle-place.js";

export default class WordleGuesser {
  alphabetArray = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
  places = [];
  possibleWords = [];

  constructor(possibleWords) {
    this.possibleWords = possibleWords; // if possible words are not given, guesser will randomize each letter
    this.places = [
      new WordlePlace(this.alphabetArray),
      new WordlePlace(this.alphabetArray),
      new WordlePlace(this.alphabetArray),
      new WordlePlace(this.alphabetArray),
      new WordlePlace(this.alphabetArray),
    ];
  }

  /**
   * TODO: implement a "smarter" guessFunction
   * current behaviour: gets a random possible guess (or brute force guess)
   * 
   * desired behaviour:
   * given a list of all possible values, the guesser
   * should evaluate which guess is the most likely to be correct or
   * give the most information about the word
   */
  async generateGuess() {
    const possibleGuesses = this.possibleWords.filter(word => this.isWordPossible(word));
    if (possibleGuesses.length > 0) {
      // get random possible guess
      const randomGuessIndex = Math.floor(Math.random() * possibleGuesses.length);
      return possibleGuesses[randomGuessIndex];
    } else {
      // resort to brute force
      return this.places.map(place => {
        const randomIndex = Math.floor(Math.random() * place.possibleValues.length)
        return place.possibleValues[randomIndex];
      }).join("");
    }
  }

  isWordPossible(word) {
    return word.split("").every((letter, index) => this.places[index].possibleValues.includes(letter));
  }

  considerGuessFeedbackPair(guess, feedback) {
    guess.split("").forEach((letter, index) => {
      this.handlePlaceFeedback(letter, index, feedback[index]);
    })
  }

  handlePlaceFeedback(letter, index, feedback) {
    switch (feedback) {
      case "G": return this.setCorrectLetterToIndex(letter, index);
      case "Y": return this.setIncorrectLetterToIndex(letter, index);
      default: return this.removeIncorrectLetterFromAll(letter);
    }
  }

  setCorrectLetterToIndex(letter, index) {
    this.places[index].setCorrectLetter(letter);
  }

  setIncorrectLetterToIndex(letter, index) {
    this.places.forEach((place, placeIndex) => {
      if (index === placeIndex) place.removePossibleValue(letter);
      else place.addPossibleValue(letter);
    });
  }

  removeIncorrectLetterFromAll(letter) {
    this.places.forEach(place => place.removePossibleValue(letter));
  }
}