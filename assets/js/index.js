document.addEventListener('DOMContentLoaded', () => {
  const game = new Game('canvas');

  document.addEventListener('keypress', (event) => {
    if (!game.intervalId) {
      game.startGame();
    }
  });

  document.addEventListener('keydown', (event) => {
    game.onKeyEvent(event);
  });
          
  document.addEventListener('keyup', (event) => {
    game.onKeyEvent(event);
  });  
})
