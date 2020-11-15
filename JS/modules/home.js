import Game from "./game.js";
import How from "./how.js";
import { sound } from "./../data/sound.js";

/* Revealing module pattern */
const Home = (() => {

  /* Cache the DOM */
  const $hangman = document.querySelector(".hangman");

  /* Initialize the Home module */
  const init = () => {
    render();
    listeners();
  }

  const render = () => {
    let markup = "";
    markup += `
      <h1 class="hangman__title">Hangman</h1>
      <button class="button start">New Game</button>
      <button class="button instructions">How to Play</button>
    `
    $hangman.innerHTML = markup;
  }

  const listeners = () => {
    /* New Game Listener */
    document.querySelector(".start").addEventListener("click", function() {
      Game.init();
      sound.click.play();
    });

    /* How to Play Listener */
    document.querySelector(".instructions").addEventListener("click", function() {
      How.init();
      sound.click.play();
    })
  }

  /* Expose the init function */
  return {
    init: init
  }
})();

/* Export Home module (allow other JS files to access) */
export default Home;