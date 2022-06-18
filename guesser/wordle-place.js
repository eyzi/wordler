export default class WordlePlace {
  isCorrect;
  possibleValues = [];

  /**
   * Creates a tracker for a word index
   * @param {Character[]} predefinedValues, list of predefined possible characters
   */
  constructor(predefinedValues) {
    this.resetPossibleValues(predefinedValues);
  }

  /**
   * Sets a correct character for this word index
   * @param {Character} letter, the correct word
   * @returns 
   */
  setCorrectLetter(letter) {
    this.setCorrect(false).resetPossibleValues([letter]).setCorrect(true);
    return this;
  }

  /**
   * Sets this tracker's correctness
   * @param {Boolean} isCorrect 
   */
  setCorrect(isCorrect) {
    this.isCorrect = isCorrect;
    return this;
  }

  /**
   * Adds a possible value for this word index
   * @param {Character} letter
   */
  addPossibleValue(letter) {
    if (this.isCorrect) return this;
    if (!this.possibleValues.includes(letter)) this.possibleValues.push(letter);
    return this;
  }

  /**
   * Removes a possible value for this word index
   * @param {Character} letter 
   */
  removePossibleValue(letter) {
    if (this.isCorrect) return this;
    this.possibleValues = this.possibleValues.filter(l => l !== letter);
    return this;
  }

  /**
   * Resets the list of possible values for this word index
   * @param {Character[]} predefinedValues, list of predefined possible characters
   */
  resetPossibleValues(predefinedValues = []) {
    if (this.isCorrect) return this;
    this.possibleValues = predefinedValues;
    return this;
  }
}