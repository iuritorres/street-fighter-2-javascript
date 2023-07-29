export class BackgroundAnimation {
	constructor(image, frames, animation, startFrame = 0) {
		this.image = image;
		this.frames = new Map(frames);
		this.animation = animation;
		this.animationTimer = 0;
		this.animationFrame = startFrame;
		this.frameDelay = animation[this.animationFrame][1];
	}

	update(time) {
		if (time.previous > this.animationTimer + this.frameDelay) {
			this.animationFrame += 1;

			if (this.animationFrame >= this.animation.length) {
				this.animationFrame = 0;
			}

			this.frameDelay = this.animation[this.animationFrame][1];
			this.animationTimer = time.previous;
		}
	}

	draw(context, x, y) {
		const [frameKey] = this.animation[this.animationFrame];
		const [frameX, frameY, frameWidth, frameHeight] =
			this.frames.get(frameKey);

		context.drawImage(
			this.image,
			frameX,
			frameY,
			frameWidth,
			frameHeight,
			x,
			y,
			frameWidth,
			frameHeight
		);
	}
}
