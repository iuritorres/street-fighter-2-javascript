import {
	pollGamepads,
	registerGamepadEvents,
	registerKeyboardEvents,
} from './engine/InputHandler.js';

import { BattleScene } from './scenes/BattleScene.js';
import { getContext } from './utils/context.js';

export class StreetFighterGame {
	context = getContext();

	frameTime = {
		previous: 0,
		secondsPassed: 0,
	};

	constructor() {
		this.scene = new BattleScene();
	}

	// Main Game Loop
	frame(time) {
		window.requestAnimationFrame(this.frame.bind(this));

		this.frameTime = {
			secondsPassed: (time - this.frameTime.previous) / 1000,
			previous: time,
		};

		pollGamepads();
		this.scene.update(this.frameTime, this.context);
		this.scene.draw(this.context);
	}

	start() {
		registerKeyboardEvents();
		registerGamepadEvents();

		window.requestAnimationFrame(this.frame.bind(this));
	}
}
