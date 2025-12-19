export default class InputHandler {
    constructor(game) {
        this.game = game;

        window.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                this.game.onInput();
            }
        });

        window.addEventListener('mousedown', (e) => {
            this.game.onInput();
        });

        window.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Prevent scrolling
            this.game.onInput();
        }, { passive: false });
    }
}
