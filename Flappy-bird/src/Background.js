export default class Background {
    constructor(game) {
        this.game = game;
        this.stars = [];
        this.buildings = [];
        this.buildingSpeed = 0.5;
        this.starSpeed = 0.1;

        this.initStars();
        this.initBuildings();
    }

    initStars() {
        for (let i = 0; i < 50; i++) {
            this.stars.push({
                x: Math.random() * this.game.width,
                y: Math.random() * this.game.height,
                size: Math.random() * 2,
                opacity: Math.random()
            });
        }
    }

    initBuildings() {
        let x = 0;
        while (x < this.game.width * 2) {
            const width = 50 + Math.random() * 100;
            const height = 100 + Math.random() * 200;
            this.buildings.push({
                x: x,
                y: this.game.height - height,
                width: width,
                height: height
            });
            x += width; // Seamless tiling
        }
    }

    update(deltaTime) {
        // Move stars
        for (const star of this.stars) {
            star.x -= this.starSpeed;
            if (star.x < 0) star.x = this.game.width;
        }

        // Move buildings
        for (const b of this.buildings) {
            b.x -= this.buildingSpeed;
        }

        // Recycle buildings
        if (this.buildings[0].x + this.buildings[0].width < 0) {
            const first = this.buildings.shift();
            const last = this.buildings[this.buildings.length - 1];
            first.x = last.x + last.width;
            first.width = 50 + Math.random() * 100;
            first.height = 100 + Math.random() * 200;
            first.y = this.game.height - first.height;
            this.buildings.push(first);
        }
    }

    draw(ctx) {
        // Draw Stars
        ctx.fillStyle = '#ffffff';
        for (const star of this.stars) {
            ctx.globalAlpha = star.opacity;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1.0;

        // Draw Buildings (Background City)
        ctx.fillStyle = '#0a0a20'; // Darker blue
        ctx.shadowBlur = 0;
        for (const b of this.buildings) {
            ctx.fillRect(b.x, b.y, b.width, b.height);
        }
    }
}
