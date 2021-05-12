document.addEventListener('DOMContentLoaded', () => {
  let game = new Game('canvas', 1);

  game.onGameOver = onGameOver;

  game.onWin = onWin;

  const startButton = document.getElementById('start-button')
  startButton.addEventListener('click', () => {
    showLayer("level1");
    setTimeout(() => {
      showLayer("canvas-layer");
      game.startGame();
    }, 1000)
  })

  const pauseButton = document.getElementById('pause')
  pauseButton.addEventListener('click', () => {
    game.pauseGame()
  })

  const howToPlayButton = document.getElementById('how-to-play')
  howToPlayButton.addEventListener('click', () => {
    showLayer("instructions")
  })

  const backButton = document.getElementById('back')
  backButton.addEventListener('click', () => {
    showLayer("start-game")
  })

  const replayOnWinButton = document.getElementById('replay-on-win')
  replayOnWinButton.addEventListener('click', () => {
    showLayer("canvas-layer")
    game = new Game('canvas', 1, false, onWin);
    game.startGame();
  })

  const replayOnGameOverButton = document.getElementById('replay-on-game-over')
  replayOnGameOverButton.addEventListener('click', () => {
    showLayer("canvas-layer")
    game = new Game('canvas', 1, false, onWin);
    game.startGame();
  })

  document.addEventListener('keypress', (event) => {
    showLayer("canvas-layer");
    game.startGame();
  })

  document.addEventListener('keydown', (event) => {
    game.onKeyEvent(event);
  });

  document.addEventListener('keyup', (event) => {
    game.onKeyEvent(event);
  });

  function onWin() {
    console.log("entra", game.level)
    if (game.level < 3) {
      nextLevel(game.level + 1)
    } else {
      document.getElementById("time").innerText = `${game.timer.twoDigitsNumber(game.timer.minutes)}:${game.timer.twoDigitsNumber(game.timer.seconds)}`;
      showLayer("win")
    }
  }

  function onGameOver() {
    showLayer("game-over")
  }

  function nextLevel(levelId) {
    showLayer(`level${levelId}`);

    setTimeout(() => {
      showLayer("canvas-layer");
      game = new Game('canvas', levelId, game.timer, onWin);
      game.startGame();
    }, 1000)
  }

  function showLayer(layerId) {
    document.querySelectorAll(".layer").forEach((layer) => layer.style.display = "none");
    document.getElementById(`${layerId}`).style.display = "block";
  }
})