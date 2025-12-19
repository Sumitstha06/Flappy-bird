export default class PipeManager {
    constructor(game) {
        this.game = game;
        this.pipes = [];
        this.pipeWidth = 60;
        this.gapHeight = 150;
        this.pipeSpacing = 300; // Distance between pipes
        this.speed = 3;
        this.timeSinceLastPipe = 0;

        // Neon color for pipes
        this.color = '#00ff00'; // Neon Green
    }

    reset() {
        this.pipes = [];
        this.timeSinceLastPipe = 0;
    }

    update(deltaTime) {
        // Move pipes
        for (let i = this.pipes.length - 1; i >= 0; i--) {
            this.pipes[i].x -= this.speed;

            // Remove if off screen
            if (this.pipes[i].x + this.pipeWidth < 0) {
                this.pipes.splice(i, 1);
            }
        }

        // Spawn new pipes
        // Based on distance, not just time, to ensure consistent spacing even if lag (though fixed speed helps)
        // Actually, let's look at the last pipe's X position
        if (this.pipes.length === 0 || (this.game.width - this.pipes[this.pipes.length - 1].x) >= this.pipeSpacing) {
            this.spawnPipe();
        }
    }

    spawnPipe() {
        const minHeight = 50;
        const maxHeight = this.game.height - this.gapHeight - minHeight;
        const topHeight = Math.random() * (maxHeight - minHeight) + minHeight;

        this.pipes.push({
            x: this.game.width,
            topHeight: topHeight,
            passed: false
        });
    }

    draw(ctx) {
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;

        for (const pipe of this.pipes) {
            // Draw Top Pipe
            ctx.fillRect(pipe.x, 0, this.pipeWidth, pipe.topHeight);
            ctx.strokeRect(pipe.x, 0, this.pipeWidth, pipe.topHeight);

            // Draw Bottom Pipe
            const bottomY = pipe.topHeight + this.gapHeight;
            const bottomHeight = this.game.height - bottomY;
            ctx.fillRect(pipe.x, bottomY, this.pipeWidth, bottomHeight);
            ctx.strokeRect(pipe.x, bottomY, this.pipeWidth, bottomHeight);
        }
    }

    checkCollision(bird) {
        const bounds = bird.getBounds();

        for (const pipe of this.pipes) {
            // Check overlaps
            // Top pipe
            if (
                bounds.x < pipe.x + this.pipeWidth &&
                bounds.x + bounds.width > pipe.x &&
                bounds.y < pipe.topHeight
            ) {
                return true;
            }

            // Bottom pipe
            const bottomY = pipe.topHeight + this.gapHeight;
            if (
                bounds.x < pipe.x + this.pipeWidth &&
                bounds.x + bounds.width > pipe.x &&
                bounds.y + bounds.height > bottomY
            ) {
                return true;
            }
        }
        return false;
    }

    checkScore(bird) {
        for (const pipe of this.pipes) {
            if (!pipe.passed && bird.x > pipe.x + this.pipeWidth) {
                pipe.passed = true;
                return true;
            }
        }
        return false;
    }
}
