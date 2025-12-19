import Bird from './Bird.js';
import InputHandler from './InputHandler.js';
import PipeManager from './PipeManager.js';
import Background from './Background.js';
import ParticleSystem from './ParticleSystem.js';

export default class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.resize();

        this.bird = new Bird(this);
        this.pipeManager = new PipeManager(this);
        this.background = new Background(this);
        this.particles = new ParticleSystem(this);
        this.input = new InputHandler(this);

        this.state = 'START'; // START, PLAYING, GAMEOVER
        this.score = 0;
        this.highScore = parseInt(localStorage.getItem('proFlappyHighScore')) || 0;

        this.lastTime = 0;
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx.imageSmoothingEnabled = false; // Pixel crispness if we were using pixel art, but good for sharp lines too
    }

    start() {
        this.lastTime = 0;
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    gameLoop(timestamp) {
        let deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        this.update(deltaTime);
        this.draw();

        requestAnimationFrame(this.gameLoop.bind(this));
    }

    update(deltaTime) {
        if (this.state === 'PLAYING') {
            this.bird.update(deltaTime);
            this.pipeManager.update(deltaTime);

            if (this.pipeManager.checkCollision(this.bird)) {
                this.gameOver();
            }

            if (this.pipeManager.checkScore(this.bird)) {
                this.score++;
            }
        } else if (this.state === 'GAMEOVER') {
            this.bird.update(deltaTime); // Bird falls to ground
            this.particles.update(deltaTime);
        }

        // Always update background and particles? Background maybe not on gameover?
        // Let's keep background moving in Start, stopped is annoying.
        if (this.state !== 'GAMEOVER') {
            this.background.update(deltaTime);
        }
        this.particles.update(deltaTime);
    }

    draw() {
        // Clear background
        this.ctx.fillStyle = '#050510';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Draw entities
        this.background.draw(this.ctx);
        this.pipeManager.draw(this.ctx);
        this.bird.draw(this.ctx);
        this.particles.draw(this.ctx);

        // Draw UI
        this.drawUI();
    }

    drawUI() {
        this.ctx.fillStyle = '#fff';
        this.ctx.textAlign = 'center';

        if (this.state === 'START') {
            this.ctx.font = '30px Outfit';
            this.ctx.fillText('TAP TO START', this.width / 2, this.height / 2);
            this.ctx.font = '16px Outfit';
            this.ctx.fillStyle = '#00ffff';
            this.ctx.fillText(`BEST: ${this.highScore}`, this.width / 2, this.height / 2 + 40);
        } else if (this.state === 'PLAYING') {
            this.ctx.font = '40px Outfit';
            this.ctx.fillText(this.score, this.width / 2, 80);
        } else if (this.state === 'GAMEOVER') {
            this.ctx.font = '40px Outfit';
            this.ctx.fillText('GAME OVER', this.width / 2, this.height / 2 - 20);
            this.ctx.font = '20px Outfit';
            this.ctx.fillText(`SCORE: ${this.score}`, this.width / 2, this.height / 2 + 20);
            this.ctx.fillStyle = '#00ffff';
            this.ctx.fillText('TAP TO RESTART', this.width / 2, this.height / 2 + 60);
        }
    }

    onInput() {
        if (this.state === 'START') {
            this.state = 'PLAYING';
            this.bird.flap();
            this.particles.emit(this.bird.x, this.bird.y);
        } else if (this.state === 'PLAYING') {
            this.bird.flap();
            this.particles.emit(this.bird.x, this.bird.y);
        } else if (this.state === 'GAMEOVER') {
            this.reset();
        }
    }

    reset() {
        this.state = 'START';
        this.score = 0;
        this.bird.reset();
        this.pipeManager.reset();
        this.particles.reset();
    }

    gameOver() {
        this.state = 'GAMEOVER';
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('proFlappyHighScore', this.highScore);
        }
    }
}
