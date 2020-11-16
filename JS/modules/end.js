/* Revealing module pattern */
const End = (() => {
  
  /* State and variables */
  const state = {
    chosenWord: null,
    winOrLose: null
  }

  /* Cache the DOM */
  const $hangman = document.querySelector(".hangman");

  const setState = (obj) => {
    state.chosenWord = obj.chosenWord;
    state.winOrLose = obj.winOrLose;
    render();
  }

  const render = () => {
    let markup = `
      <h1 class="hangman__title">GAME OVER</h1>
      <p class="result">You ${state.winOrLose.toUpperCase()}! <br> <br>
      The word was ${state.chosenWord.toUpperCase()}.</p>
      <button class="button hangman__trigger">Main Menu</button>
    `

    $hangman.innerHTML = markup;
  }

  return {
    setState: setState
  }


})();

export default End;