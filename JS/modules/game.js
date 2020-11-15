const Game = (() => {
  /* Setup State */
  const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  const words = ["apple", "ball", "cat", "elephant", "cat", "dog", "test"];
  let chosenWord;
  let guessingWord;
  let lives;
  let guessedLetters;

  /* Cache the DOM */
  const $hangman = document.querySelector(".hangman");

  const init = () => {
    /* Choose a word */
    chosenWord = chooseWord();

    /* Build out our own guessing word to render */
    guessingWord = Array(chosenWord.length).fill("_"); // creates an Array of length chosenWord.length and fills it with underscores
  }

  const chooseWord = () => {
    return words[Math.floor((Math.random() * words.length))];
  }

  /*
    1. choose a random word chosenWord = chooseWord(); // apple
    2.  We'll also need a guessingWord that is constantly updated and re-rendered as the user selects letters
  */

  return {
    init: init
  }

})();

export default Game;