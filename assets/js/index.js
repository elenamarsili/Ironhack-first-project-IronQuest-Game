document.addEventListener('DOMContentLoaded', () => {
  const game = new Game('canvas');

  const startButton = document.getElementById('start-button')
  startButton.addEventListener('click', () => {
    if (!game.intervalId) {
      game.startGame();
    }
  })

/*   document.addEventListener('keypress', (event) => {
    if (!game.intervalId) {
      game.startGame();
    }
  }); */

  document.addEventListener('keydown', (event) => {
    game.onKeyEvent(event);
  });
          
  document.addEventListener('keyup', (event) => {
    game.onKeyEvent(event);
  });  
})
