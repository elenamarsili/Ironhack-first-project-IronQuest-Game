document.addEventListener('DOMContentLoaded', () => {
  const game = new Game('canvas');
  game.onGameOver = () => {
    document.getElementById("canvas").style.display = "none";
    document.getElementById("game-over").style.display = "block";
  }

  game.onWin = () => {
    document.getElementById("canvas").style.display = "none";
    document.getElementById("win").style.display = "block";
    document.getElementById("time").innerText = `${game.timer.twoDigitsNumber(game.timer.minutes)}:${game.timer.twoDigitsNumber(game.timer.seconds)}`;
  }

  const startButton = document.getElementById('start-button')
  startButton.addEventListener('click', () => {
    document.getElementById("start-game").style.display = "none";
    document.getElementById("canvas").style.display = "block";
    game.startGame();
  })

  document.addEventListener('keydown', (event) => {
    game.onKeyEvent(event);
  });
          
  document.addEventListener('keyup', (event) => {
    game.onKeyEvent(event);
  });  
})
