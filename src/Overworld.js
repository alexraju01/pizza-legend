import { DirectionInput } from "./DirectionInput.js";
import { GameObject } from "./GameObject.js";
import { OverworldMap } from "./OverworldMap.js";

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

			// Draw Lower Layer
			this.map.drawLowerImage(this.ctx);

			// Draw Game Objects
			Object.values(this.map.gameObjects).forEach((object) => {
				object.update({
					arrow: this.directionInput.direction,
				});
				// object.x += 1;
				object.sprite.draw(this.ctx);
			});

			// Draw Upper Layer
			this.map.drawUpperImage(this.ctx);

			requestAnimationFrame(step);
		};
		step();
	}

	init() {
		// Load Initial Map
		this.map = new OverworldMap(window.OverworldMap.DemoRoom);
		this.directionInput = new DirectionInput();
		this.directionInput.init();
		this.directionInput.direction; // "up", "down", "left", "right"

		this.startGameLoop();
	}
}
