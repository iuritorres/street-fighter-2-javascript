import { FRAME_TIME } from '../../../constants/game.js';

export class HitSplash {
	constructor(x, y, playerId, onEnd) {
		this.image = document.querySelector('img[alt="decals"]');
		this.position = { x, y };
		this.playerId = playerId;
		this.onEnd = onEnd;

		this.frames = [];
		this.animationFrame = -1;
		this.animationTimer = 0;
	}

	update(time) {
		if (time.previous < this.animationTimer + 4 * FRAME_TIME) return;

		this.animationFrame++;
		this.animationTimer = time.previous;

		if (this.animationFrame >= 4) this.onEnd(this);
	}

	draw(context, camera) {
		const [[x, y, width, height], [originX, originY]] =
			this.frames[this.animationFrame + this.playerId * 4];

		context.drawImage(
			this.image,
			x,
			y,
			width,
			height,
			Math.floor(this.position.x / 2 - camera.position.x - originX),
			Math.floor(this.position.y / 2 - camera.position.y - originY),
			width,
			height
		);
	}
}
