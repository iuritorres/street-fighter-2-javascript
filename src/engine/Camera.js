import {
	SCROLL_BOUNDRY,
	STAGE_HEIGHT,
	STAGE_PADDING,
	STAGE_WIDTH,
} from '../constants/stage.js';

export class Camera {
	constructor(x, y, fighters) {
		this.position = { x, y };
		this.fighters = fighters;
	}

	update(time, context) {
		this.position.y =
			-6 +
			Math.floor(
				Math.min(this.fighters[1].position.y, this.fighters[0].position.y) /
					10
			);

		const lowX = Math.min(
			this.fighters[1].position.x,
			this.fighters[0].position.x
		);

		const highX = Math.max(
			this.fighters[1].position.x,
			this.fighters[0].position.x
		);

		if (highX - lowX > context.canvas.width - SCROLL_BOUNDRY * 2) {
			const midPoint = (highX - lowX) / 2;
			this.position.x = lowX + midPoint - context.canvas.width / 2;
		} else {
			// Check if some player is into one of the camera boundries and if he is walking
			for (const fighter of this.fighters) {
				if (
					(fighter.position.x < this.position.x + SCROLL_BOUNDRY &&
						fighter.velocity.x * fighter.direction < 0) ||
					(fighter.position.x >
						this.position.x + context.canvas.width - SCROLL_BOUNDRY &&
						fighter.velocity.x * fighter.direction > 0)
				) {
					this.position.x +=
						fighter.velocity.x * fighter.direction * time.secondsPassed;
				}
			}
		}

		// Limit and block the camera to get out of the stage dimensions
		if (this.position.x < STAGE_PADDING) this.position.x = STAGE_PADDING;
		if (
			this.position.x >
			STAGE_WIDTH + STAGE_PADDING - context.canvas.width
		) {
			this.position.x = STAGE_WIDTH + STAGE_PADDING - context.canvas.width;
		}
		if (this.position.y < 0) this.position.y = 0;
		if (this.position.y > STAGE_HEIGHT - context.canvas.height) {
			this.position.y = STAGE_HEIGHT - context.canvas.height;
		}
	}
}
