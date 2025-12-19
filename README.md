Goal Description
Build a high-fidelity Flappy Bird clone named "Pro-Flappy" using HTML5 Canvas and JavaScript. The game will focus on a "slight" gravity feel, "Midnight Neon" aesthetics, and responsive design.

User Review Required
IMPORTANT

Inputs: The game will support Mouse (Click), Touch (Tap), and Keyboard (Spacebar) for flapping.
Visuals: "Midnight Neon" will be achieved via Canvas drawing APIs (shadowBlur, strokeStyle) rather than external assets to ensure crispness and performance.
Proposed Changes
Project Structure
The project will use ES6 modules for better code organization.

[NEW] 
index.html
Canvas container element.
Import main.js as a module.
Basic meta tags for viewport control (mobile scaling).
[NEW] 
style.css
Reset defaults.
Full-screen canvas styling.
Font import (Google Fonts: 'Outfit' or 'Orbitron' for neon look).
[NEW] 
main.js
Entry point.
Initializes Game class.
Handles browser resize events.
[NEW] 
src/Game.js
Manages Game Loop (update/draw).
Manages Game State (Start, Playing, GameOver).
Orchestrates entities (Bird, Pipes, Background, Particles).
Handles Score and Persistence.
[NEW] 
src/Bird.js
Physics: Gravity, Velocity, Rotation.
Rendering: Draw bird with neon glow.
Methods: flap(), update(), draw(), getBounds().
[NEW] 
src/PipeManager.js
Pool of pipes to reuse objects.
Procedural generation of heights.
Movement logic.
Collision rendering.
[NEW] 
src/Background.js
Parallax layers (distant stars, city silhouette).
Slowly scrolling.
[NEW] 
src/ParticleSystem.js
Sparkle effects on flap.
Simple physics (decay, spread).
[NEW] 
src/InputHandler.js
Listens for 'mousedown', 'touchstart', 'keydown'.
Verification Plan
Automated Tests
None planned (pure visual/interactive game).
Manual Verification
Physics: Play the game, test flap responsiveness and gravity weight.
Visuals: Confirm "Midnight Neon" look (glows, dark background).
Responsive: Resize window, check mobile emulation in browser.
Collision: Intentionally hit pipes and ground to verify Game Over trigger.
Persistence: Refresh page after setting a high score to see if it saves.
