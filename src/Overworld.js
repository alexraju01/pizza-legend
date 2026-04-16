import { GameObject } from "./GameObject.js";

export class Overworld {
	constructor(config) {
		this.element = config.element;
		this.canvas = this.element.querySelector(".game-canvas");
		this.ctx = this.canvas.getContext("2d");
		this.map = null;
	}

	startGameLoop() {
		const step = () => {
			// Clear the canvas
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

			// Draw Background
			if (this.map) {
				this.ctx.drawImage(this.map, 0, 0);
			}

			// Draw Game Objects
			Object.values(this.gameObjects).forEach((object) => {
				object.sprite.draw(this.ctx);
			});

			requestAnimationFrame(step);
		};
		step();
	}

	init() {
		// Load Map
		this.map = new Image();
		this.map.src = "/assets/images/maps/DemoLower.png";

		this.gameObjects = {
			hero: new GameObject({ x: 5, y: 6 }),
			npc1: new GameObject({
				x: 7,
				y: 9,
				src: "/assets/images/characters/people/npc1.png",
			}),
		};

		this.startGameLoop();
	}
}
