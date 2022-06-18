export default class WordlePlace {
  isCorrect;
  possibleValues = [];

  constructor(predefinedValues) {
    this.resetPossibleValues(predefinedValues);
  }

  setCorrectLetter(letter) {
    this.setCorrect(false).resetPossibleValues([letter]).setCorrect(true);
    return this;
  }

  setCorrect(isCorrect) {
    this.isCorrect = isCorrect;
    return this;
  }

  addPossibleValue(letter) {
    if (this.isCorrect) return this;
    if (!this.possibleValues.includes(letter)) this.possibleValues.push(letter);
    return this;
  }

  removePossibleValue(letter) {
    if (this.isCorrect) return this;
    this.possibleValues = this.possibleValues.filter(l => l !== letter);
    return this;
  }

  resetPossibleValues(predefinedValues = []) {
    if (this.isCorrect) return this;
    this.possibleValues = predefinedValues;
    return this;
  }
}