import { GameObject } from "./GameObject.js";
import { Person } from "./Person.js";
import { utils } from "./utils.js";

export class OverworldMap {
	constructor(config) {
		this.gameObjects = config.gameObjects;
		this.walls = config.walls || {};

		this.lowerImage = new Image();
		this.lowerImage.src = config.lowerSrc;

		this.upperImage = new Image();
		this.upperImage.src = config.upperSrc;
	}

	drawLowerImage(ctx, cameraPerson) {
		ctx.drawImage(
			this.lowerImage,
			utils.withGrid(10.5) - cameraPerson.x,
			utils.withGrid(6) - cameraPerson.y,
		);
	}
	drawUpperImage(ctx, cameraPerson) {
		ctx.drawImage(
			this.upperImage,
			utils.withGrid(10.5) - cameraPerson.x,
			utils.withGrid(6) - cameraPerson.y,
		);
	}
	isSpaceTaken(currentX, currentY, direction) {
		const { x, y } = utils.nextPosition(currentX, currentY, direction);
		return this.walls[`${x},${y}`] || false;
	}

	mountObjects() {
		Object.values(this.gameObjects).forEach((object) => {
			// TODO: determine if this object should actually mount

			object.mount(this);
		});
	}
	addWall(x, y) {
		this.walls[`${x},${y}`] = true;
	}
	removeWall(x, y) {
		delete this.walls[`${x},${y}`];
	}
	moveWall(wasX, wasY, direction) {
		this.removeWall(wasX, wasY);
		const { x, y } = utils.nextPosition(wasX, wasY, direction);
		this.addWall(x, y);
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
				y: utils.withGrid(8),
				src: "/assets/images/characters/people/npc1.png",
			}),
		},
		walls: {
			// "16,16": true,
			[utils.asGridCoord(7, 6)]: true,
			[utils.asGridCoord(8, 6)]: true,
			[utils.asGridCoord(7, 7)]: true,
			[utils.asGridCoord(8, 7)]: true,
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
