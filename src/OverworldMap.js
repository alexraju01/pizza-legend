import { GameObject } from "./GameObject.js";
import { Person } from "./Person.js";
import { utils } from "./utils.js";

export class OverworldMap {
	constructor(config) {
		this.gameObjects = config.gameObjects;

		this.lowerImage = new Image();
		this.lowerImage.src = config.lowerSrc;

		this.upperImage = new Image();
		this.upperImage.src = config.upperSrc;
	}

	drawLowerImage(ctx) {
		ctx.drawImage(this.lowerImage, 0, 0);
	}
	drawUpperImage(ctx) {
		ctx.drawImage(this.upperImage, 0, 0);
	}
}

window.OverworldMap = {
	DemoRoom: {
		lowerSrc: "/assets/images/maps/DemoLower.png",
		upperSrc: "/assets/images/maps/DemoUpper.png",
		gameObjects: {
			hero: new Person({
				isplayerControlled: true,
				x: utils.withGrid(5),
				y: utils.withGrid(6),
			}),
			npc1: new Person({
				x: utils.withGrid(7),
				y: utils.withGrid(9),
				src: "/assets/images/characters/people/npc1.png",
			}),
		},
	},
	kitchen: {
		lowerSrc: "/assets/images/maps/KitchenLower.png",
		upperSrc: "/assets/images/maps/KitchenUpper.png",
		gameObjects: {
			hero: new GameObject({ x: 3, y: 5 }),
			npc1: new GameObject({
				x: utils.withGrid(9),
				y: utils.withGrid(6),
				src: "/assets/images/characters/people/npc1.png",
			}),
			npc2: new GameObject({
				x: utils.withGrid(10),
				y: utils.withGrid(8),
				src: "/assets/images/characters/people/npc2.png",
			}),
		},
	},
};
