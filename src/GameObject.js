import { Sprite } from "./Sprite.js";

export class GameObject {
	constructor(config) {
		this.isMounted = false;
		this.x = config.x || 0;
		this.y = config.y || 0;
		this.direction = config.direction || "down";
		this.sprite = new Sprite({
			gameObject: this,
			src: config.src || "/assets/images/characters/people/hero.png",
		});
	}
	mount(map) {
		// console.log("mounitng");
		console.log(`Mounting object at (${this.x}, ${this.y}) with direction ${this.direction}`);
		this.isMounted = true;
		map.addWall(this.x, this.y);
	}

	update() {}
}
