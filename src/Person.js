import { GameObject } from "./GameObject.js";

export class Person extends GameObject {
	constructor(config) {
		super(config);
		this.movingProgressRemaining = 0;
		this.isplayerControlled = config.isplayerControlled || false;

		this.direction = config.direction || "down";

		this.directionUpdate = {
			up: ["y", -1],
			down: ["y", 1],
			left: ["x", -1],
			right: ["x", 1],
		};
	}

	startBehavior(state, behavior) {
		// Set character direction to whatever behavior has
		this.direction = behavior.direction;
		if (behavior.type === "walk") {
			// Stop here if space is not free
			if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
				return;
			}
			// ready to walk
			state.map.moveWall(this.x, this.y, this.direction);
			this.movingProgressRemaining = 16;
		}
	}

	update(state) {
		if (this.movingProgressRemaining > 0) {
			this.updatePosition();
		} else {
			// More cases for starting to walk will come here, like for NPCs to randomly walk around
			// Case: we're keyboard ready ready and have an arrow key pressed
			if (this.isplayerControlled && state.arrow) {
				this.startBehavior(state, { type: "walk", direction: state.arrow });
			}
			this.updateSprite(state);
		}
	}

	updatePosition() {
		const [property, change] = this.directionUpdate[this.direction];
		this[property] += change;
		this.movingProgressRemaining -= 1;
	}

	updateSprite(state) {
		if (this.movingProgressRemaining > 0) {
			this.sprite.setAnimation("walk-" + this.direction);
			return;
		}
		this.sprite.setAnimation("idle-" + this.direction);
	}
}
