# Wordler

A basic implementation of a Wordle bot that guesses a given word and
handles feedback.

For each guess, the mock Wordle service returns a feedback in the form
of a string with the following values:
- X - the letter in the guess does not exist in the word
- Y - the letter in the guess exists in the word but is in the wrong
  place
- G - the letter in the guess exists in the word and is in the correct
  place

### Usage
`yarn start <word to match>`
- word to match must be 5 characters long

### Example
`yarn start sweet`

```sh
KHETS XXGYY
CLEAT XXGXG
SIENT GXGXG
SWEET GGGGG
```

### Improvements

A better implementation of the guesser would be to evaluate possible
guesses and choose based on what gives the most information instead of
randomly. 
