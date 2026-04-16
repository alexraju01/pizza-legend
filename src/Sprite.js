export class Sprite {
	constructor(config) {
		// Setup the image
		this.image = new Image();
		this.image.src = config.src;
		this.image.onload = () => (this.isLoaded = true);

		// Shadow
		this.shadow = new Image();
		this.useShadow = true; //config.useShadow || false;
		if (this.useShadow) this.shadow.src = "./assets/images/characters/shadow.png";
		this.shadow.onload = () => {
			this.isShadowLoaded = true;
		};

		// Animation state
		this.animations = config.animations || {
			"idle-down": [[0, 0]],
		};
		this.currentAnimation = config.currentAnimation || "idle-down";
		this.currentAnimationFrame = 0;

		// Reference the game object
		this.gameObject = config.gameObject;
	}

	draw(ctx) {
		const x = this.gameObject.x * 16 - 8;
		const y = this.gameObject.y * 16 - 18;

		this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);

		this.isLoaded &&
			ctx.drawImage(
				this.image,
				0,
				0, // Left cut, Top cut
				32,
				32, // Width/Height of cut
				x,
				y, // Canvas X, Canvas Y
				32,
				32, // Canvas Width/Height
			);
	}
}
