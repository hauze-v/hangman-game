/* Revealing module pattern */
const Board = (() => {
  /* State */
  let livesLeft = null;
  let canvas;
  let context;

  const init = () => {
    canvas = document.querySelector(".hangman__board");
    context = canvas.getContext("2d");
    context.lineWidth = 2;
    context.strokeStyle = "white";
    base();
  }
  
  const draw = (startX, startY, endX, endY) => {
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
  }

  const base = () => {
    line1();
    line2();
    line3();
  }

  const head = () => {
    context.beginPath();
    context.arc(60, 40, 10, 0, Math.PI * 2);
    context.stroke();
  }

  const line1 = () => draw(10, 140, 140, 140);
  const line2 = () => draw(10, 20, 10, 140);
  const line3 = () => draw(10, 20, 70, 20);

  const rope = () => draw(60, 20, 60, 30);
  const torso = () => draw(60, 52, 60, 90);
  const rightArm = () => draw(60, 66, 100, 70);
  const leftArm = () => draw(60, 66, 20, 70);
  const rightLeg = () => draw(60, 90, 100, 120);
  const leftLeg = () => draw(60, 90, 20, 120);

  const setLives = (newLives) => {
    livesLeft = newLives;
    rope();
    head();
    torso();
    rightArm();
    leftArm();
    rightLeg();
    leftLeg();
  }

  return {
    init,
    setLives
  }

})();

export default Board;