import { Control, GamepadThumbstick } from "../constants/control.js";

export const controls = [
	// Player 1
	{
		gamePad: {
			[GamepadThumbstick.DEAD_ZONE]: 0.5,
			[GamepadThumbstick.HORIZONTAL_AXE_ID]: 0,
			[GamepadThumbstick.VERTICAL_AXE_ID]: 1,

			[Control.LEFT]: 14,
			[Control.RIGHT]: 15,
			[Control.UP]: 12,
			[Control.DOWN]: 13,
			[Control.LIGHT_PUNCH]: 2,
			[Control.MEDIUM_PUNCH]: 3,
			[Control.HEAVY_PUNCH]: 5,
			[Control.LIGHT_KICK]: 0,
			[Control.MEDIUM_KICK]: 1,
			[Control.HEAVY_KICK]: 4,
		},
		keyboard: {
			[Control.LEFT]: 'KeyA',
			[Control.RIGHT]: 'KeyD',
			[Control.UP]: 'KeyW',
			[Control.DOWN]: 'KeyS',
			[Control.LIGHT_PUNCH]: 'Digit0',
			[Control.MEDIUM_PUNCH]: 'Minus',
			[Control.HEAVY_PUNCH]: 'Equal',
			[Control.LIGHT_KICK]: 'KeyP',
			[Control.MEDIUM_KICK]: 'BracketLeft',
			[Control.HEAVY_KICK]: 'BracketRight',
		},
	},
	// Player 2
	{
		gamePad: {
			[GamepadThumbstick.DEAD_ZONE]: 0.5,
			[GamepadThumbstick.HORIZONTAL_AXE_ID]: 0,
			[GamepadThumbstick.VERTICAL_AXE_ID]: 1,

			[Control.LEFT]: 14,
			[Control.RIGHT]: 15,
			[Control.UP]: 12,
			[Control.DOWN]: 13,
			[Control.LIGHT_PUNCH]: 2,
			[Control.MEDIUM_PUNCH]: 3,
			[Control.HEAVY_PUNCH]: 5,
			[Control.LIGHT_KICK]: 0,
			[Control.MEDIUM_KICK]: 1,
			[Control.HEAVY_KICK]: 4,
		},
		keyboard: {
			[Control.LEFT]: 'KeyJ',
			[Control.RIGHT]: 'KeyL',
			[Control.UP]: 'KeyI',
			[Control.DOWN]: 'KeyK',
			[Control.LIGHT_PUNCH]: 'KeyZ',
			[Control.MEDIUM_PUNCH]: 'KeyX',
			[Control.HEAVY_PUNCH]: 'KeyC',
			[Control.LIGHT_KICK]: 'KeyV',
			[Control.MEDIUM_KICK]: 'KeyB',
			[Control.HEAVY_KICK]: 'KeyN',
		},
	},
];
