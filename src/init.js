import { Overworld } from "./Overworld.js";

document.addEventListener("DOMContentLoaded", () => {
	const overworld = new Overworld({
		element: document.querySelector(".game-container"),
	});

	overworld.init();
});
