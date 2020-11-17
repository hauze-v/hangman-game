import { sound } from "../data/sound.js";
import Home from "../modules/home.js";

const How = (() => {

  /* Cache the DOM */
  const $hangman = document.querySelector(".hangman");

  const init = () => {
    render();
    listeners();
  }

  const render = () => {
    let markup = `
      <h1 class="hangman__title">INSTRUCTIONS</h1>
      <ul class="how__list">
        <li class="how">Alright here's how you play!</li>
        <li class="how">When you start a new game, the game will automatically choose a random word.</li>
        <li class="how">Your job is to guess that chosen word completely by guessing one letter at a time by clicking the letter-buttons.</li>
        <li class="how">If you sucessfully guess the word below your lives hit 0, you win. Otherwise, you lose!</li>
        <li class="how">If you lose, you will be hanged without mercy. 👻</li>
      </ul>
      <button class="button hangman__trigger">Main Menu</button>
    `
    $hangman.innerHTML = markup;
  }

  const listeners = () => {
    $hangman.addEventListener("click", (event) => {
      if (event.target.matches(".hangman__trigger")) {
        sound.click.play();
        Home.init();
      }
    })
  }

  return {
    init
  }
  
})();

export default How;