import Home from "./home.js";
import { sound } from "./../data/sound.js";

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

    /* Basic game state setup */
    guessedLetters = [];
    lives = 7;

    /* Render initial Game screen */
    showInitPage();
    listeners();
  }

  const listeners = () => {
    $hangman.addEventListener("click", (event) => {
      if (event.target.matches(".hangman__letter")) {
        sound.click.play();
        // check(event.target.innerHTML);
        console.log(event.target.innerHTML);
      }

      if (event.target.matches(".hangman__trigger")) {
        sound.click.play();
        Home.init();
      }
    })
  }

  const showInitPage = () => {
    let markup = `
      <p class="hangman__stats">Lives:
        <span class="hangman__lives">${lives}</span>
      </p>
      <h1 class="hangman__title">Hangman</h1>
      <canvas class="hangman__board" height="155px"></canvas>
      <div class="hangman__word">${guessingWord.join("")}</div>
      <p class="hangman__instructions">Pick a letter below to guess the whole word.</p>
      <ul class="hangman__letters">
        ${createLetters()}
      </ul>
      <button class="button hangman__trigger">Main Menu</button>
    `;
    $hangman.innerHTML = markup;
  }

  const createLetters = () => {
    /* Loop through the letters array and for each letter, create an li tag with class hangman__letter, then return the markup */
    let markup = ``;
    letters.forEach(letter => {
      markup += `
        <li class="hangman__letter">${letter}</li>
      `
    });

    return markup;
  }    

  const chooseWord = () => {
    return words[Math.floor((Math.random() * words.length))];
  }

  return {
    init: init
  }

})();

export default Game;