import Home from "./home.js";
import { sound } from "./../data/sound.js";
import End from "./end.js";
import Board from "./board.js";

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
    Board.init();
    sound.elevator.volume = 0.5;
    sound.elevator.play();
  }

  const listeners = () => {
    $hangman.addEventListener("click", (event) => {
      if (event.target.matches(".hangman__letter")) {
        check(event.target.innerHTML);
        /* After the letter's clicked, gray it out */
        event.target.classList.add("hangman__letter--active");
      }

      if (event.target.matches(".hangman__trigger")) {
        sound.click.play();
        sound.win.pause();
        Home.init();
      }
    })
  }

  const isAlreadyTaken = (letter) => {
    return guessedLetters.includes(letter);
  }

  const check = (guess) => {
    if (isAlreadyTaken(guess)) return;

    sound.click.play();
    
    /* If not already taken, push to guessedLetters */
    guessedLetters.push(guess);

    /* Check if the guess exists in chosenWord */
    if (chosenWord.includes(guess)) {
      /* Update the guessing word */
      updateGuessingWord(guess);
    } else {
      lives--;
      Board.setLives(lives);
    }

    render();
    /* Check if the game's over */
    isGameOver();
  }

  const hasWon = () => guessingWord.join("") === chosenWord;
  const hasLost = () => lives <= 0;

  const isGameOver = () => {
    sound.elevator.pause();

    /* Win condition */
    if (hasWon()) {
      sound.win.play();
      End.setState({
        chosenWord: chosenWord,
        winOrLose: "win"
      });
    }

    /* Lose condition */
    if (hasLost()) {
      sound.lose.play();
      End.setState({
        chosenWord: chosenWord,
        winOrLose: "lose"
      });
    }
  }

  const render = () => {
    document.querySelector(".hangman__lives").innerHTML = lives;
    document.querySelector(".hangman__word").innerHTML = guessingWord.join(""); // convert guessingWord back into a string
  }

  const updateGuessingWord = (letter) => {
    /* We split the chosenWord into an Array in order to use .forEach() */
    chosenWord.split("").forEach((elem, index) => {
      if (elem === letter) {
        guessingWord[index] = elem;
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