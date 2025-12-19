export default class Bird {
    constructor(game) {
        this.game = game;
        this.reset();

        // Visuals
        this.radius = 15;
        this.color = '#ff00ff'; // Neon Magenta
        this.glowColor = '#ff00ff';
    }

    reset() {
        this.x = this.game.width / 2 - 50; // Slightly to the left
        this.y = this.game.height / 2;
        this.velocity = 0;
        this.gravity = 0.5; // Tuned for "snappy" feel
        this.jumpStrength = -8;
        this.rotation = 0;
    }

    flap() {
        this.velocity = this.jumpStrength;
        // Sparkle effect call here later
    }

    update(deltaTime) {
        this.velocity += this.gravity;
        this.y += this.velocity;

        // Rotation logic
        // If moving up, tilt up quickly. If moving down, tilt down slowly.
        if (this.velocity < 0) {
            this.rotation = Math.max(-0.5, this.rotation - 0.1);
        } else {
            this.rotation = Math.min(Math.PI / 2, this.rotation + 0.05);
        }

        // Ground collision (simple check for now)
        if (this.y + this.radius >= this.game.height) {
            this.y = this.game.height - this.radius;
            this.game.gameOver();
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        // Neon Glow
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.glowColor;

        // Body
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();

        // Eye (to see rotation)
        ctx.fillStyle = '#fff';
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(8, -5, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    getBounds() {
        return {
            x: this.x - this.radius,
            y: this.y - this.radius,
            width: this.radius * 2,
            height: this.radius * 2
        };
    }
}
