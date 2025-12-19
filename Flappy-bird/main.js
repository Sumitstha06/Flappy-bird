import Game from './src/Game.js';

window.addEventListener('load', () => {
    const canvas = document.getElementById('gameCanvas');
    const game = new Game(canvas);
    game.start();

    // Handle resizing
    window.addEventListener('resize', () => {
        game.resize();
    });
});
