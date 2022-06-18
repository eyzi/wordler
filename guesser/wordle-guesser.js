import WordlePlace from "./wordle-place.js";

export default class WordleGuesser {
  alphabetArray = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
  places = [];
  possibleWords = [];
  mustHaves = [];

  /**
   * Creates a guesser with the possible words
   * @param {String[]} possibleWords 
   */
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
   * Generates a guess from the possible values of each word index.
   * @param {Function} guesser, a guesser function. Defaults to random guesses
   * @returns a new guess
   */
  async generateGuess(guesser = this.chooseRandom) {
    const possibleGuesses = this.possibleWords.filter(word => this.isGuessPossible(word));
    if (possibleGuesses.length > 0) {
      return guesser(possibleGuesses);
    } else {
      // resort to brute force
      return this.places.map(place => {
        const randomIndex = Math.floor(Math.random() * place.possibleValues.length)
        return place.possibleValues[randomIndex];
      }).join("");
    }
  }

  /**
   * A slightly "smarter" guess function
   * It first ranks every letter by the how often it appears in all possible guesses
   * Then for every possible guess, it sums the ranking of each letter
   * Then sorts the guesses by which one has the highest sum of letter ranking
   * Then chooses the first one
   * 
   * The guesses are more predictable, but also doesn't
   * seem to be that much better at guessing
   * @param {String[]} possibleGuesses 
   * @returns guess with the highest ranking
   */
  async chooseByRanking(possibleGuesses) {
    const letterRanking = {}
    const guess = possibleGuesses
      .map(guess => {
        const uniqueLetters = Array.from(new Set(guess.split("")))
        uniqueLetters.forEach(letter => {
          if (!letterRanking[letter]) letterRanking[letter] = 0;
          letterRanking[letter]++;
        })
        return guess;
      })
      .map(guess => {
        const uniqueLetters = Array.from(new Set(guess.split("")))
        return [guess, uniqueLetters.reduce((ranking, letter) => {
          return ranking + (letterRanking[letter] ?? 0)
        }, 0)];
      })
      .sort((a, b) => b[1] - a[1])
      .map(guessRanking => guessRanking[0])
      .find(guess => guess);
    return guess;
  }

  /**
   * Choose a random index from list of possible guesses
   * @param {String[]} possibleGuesses 
   * @returns a random guess
   */
  async chooseRandom(possibleGuesses) {
    const randomGuessIndex = Math.floor(Math.random() * possibleGuesses.length);
    return possibleGuesses[randomGuessIndex];
  }

  /**
   * Check if a word is possible by check if each letter is marked as a possible value for that index
   * Additionally, the guess must include all the must have letters
   * @param {String} guess 
   * @returns Whether the given guess is possible
   */
  isGuessPossible(guess) {
    return this.mustHaves.every(letter => guess.includes(letter)) &&
      guess.split("").every((letter, index) => this.places[index].possibleValues.includes(letter));
  }

  /**
   * Takes a guess-feedback pair to be processed
   * @param {String} guess 
   * @param {String} feedback 
   */
  considerGuessFeedbackPair(guess, feedback) {
    guess.split("").forEach((letter, index) => {
      this.handlePlaceFeedback(letter, index, feedback[index]);
    })
  }

  /**
   * Transform possible values of word index based on feedback.
   *  - X - remove from all word indices
   *  - Y - remove from current word index but add to other indices
   *  - G - set as correct letter for current index
   * @param {Character} letter 
   * @param {Integer} index 
   * @param {Feedback Character} feedback 
   * @returns 
   */
  handlePlaceFeedback(letter, index, feedback) {
    switch (feedback) {
      case "G": return this.setCorrectLetterToIndex(letter, index);
      case "Y": return this.setIncorrectLetterToIndex(letter, index);
      default: return this.removeIncorrectLetterFromAll(letter);
    }
  }

  /**
   * Sets a letter as the correct value for a word index
   * @param {Character} letter 
   * @param {Integer} index 
   */
  setCorrectLetterToIndex(letter, index) {
    this.addMustHave(letter);
    this.places[index].setCorrectLetter(letter);
  }

  /**
   * Removes letter from possible values of current index
   * and add as possible value of other indices
   * @param {Character} letter 
   * @param {Integer} index 
   */
  setIncorrectLetterToIndex(letter, index) {
    this.addMustHave(letter);
    this.places.forEach((place, placeIndex) => {
      if (index === placeIndex) place.removePossibleValue(letter);
      else place.addPossibleValue(letter);
    });
  }

  /**
   * Removes letter from possible values of all word indices
   * @param {Character} letter 
   */
  removeIncorrectLetterFromAll(letter) {
    this.places.forEach(place => place.removePossibleValue(letter));
  }

  /**
   * Adds a letter as a must have to further filter possible guesses
   * @param {Character} letter 
   */
  addMustHave(letter) {
    if (!this.mustHaves.includes(letter)) {
      this.mustHaves.push(letter);
    }
  }
}