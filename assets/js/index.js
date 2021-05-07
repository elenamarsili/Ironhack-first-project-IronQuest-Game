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

  const howToPlayButton = document.getElementById('how-to-play')
  howToPlayButton.addEventListener('click', () => {
    document.getElementById("start-game").style.display = "none";
    document.getElementById("instructions").style.display = "block";
  })

  const backButton = document.getElementById('back')
  backButton.addEventListener('click', () => {
    document.getElementById("instructions").style.display = "none";
    document.getElementById("start-game").style.display = "block";
  })

/*   const replayOnWinButton = document.getElementById('replay-on-win')
  replayOnWinButton.addEventListener('click', () => {
    document.getElementById("win").style.display = "none";
    document.getElementById("canvas").style.display = "block";
    game.startGame();
  })

  const replayOnGameOverButton = document.getElementById('replay-on-game-over')
  replayOnGameOverButton.addEventListener('click', () => {
    document.getElementById("game-over").style.display = "none";
    document.getElementById("canvas").style.display = "block";
    game.startGame();
  }) */

  document.addEventListener('keypress', (event) => {
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
