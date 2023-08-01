import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants/game.js';

export class FpsCounter {
	constructor() {
		this.fps = 0;
	}

	update(time) {
		this.fps = Math.trunc(1 / time.secondsPassed);
	}

	draw(context) {
		context.font = '14px Arial';
		context.fillStyle = '#00FF00';
		context.textAlign = 'right';
		context.fillText(`${this.fps}`, SCREEN_WIDTH - 2, SCREEN_HEIGHT - 2);
	}
}
