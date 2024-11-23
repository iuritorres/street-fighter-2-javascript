import { Control, GamepadThumbstick } from '../constants/control.js';

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
            [Control.HEAVY_KICK]: 7,
        },
        keyboard: {
            [Control.LEFT]: 'KeyZ',
            [Control.RIGHT]: 'KeyC',
            [Control.UP]: 'KeyS',
            [Control.DOWN]: 'KeyX',
            [Control.LIGHT_PUNCH]: 'Digit1',
            [Control.MEDIUM_PUNCH]: 'Digit2',
            [Control.HEAVY_PUNCH]: 'Digit3',
            [Control.LIGHT_KICK]: 'KeyQ',
            [Control.MEDIUM_KICK]: 'KeyW',
            [Control.HEAVY_KICK]: 'KeyE',
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
            [Control.HEAVY_KICK]: 7,
        },
        keyboard: {
            [Control.LEFT]: 'ArrowLeft',
            [Control.RIGHT]: 'ArrowRight',
            [Control.UP]: 'ArrowUp',
            [Control.DOWN]: 'ArrowDown',
            [Control.LIGHT_PUNCH]: 'Digit8',
            [Control.MEDIUM_PUNCH]: 'Digit9',
            [Control.HEAVY_PUNCH]: 'Digit0',
            [Control.LIGHT_KICK]: 'KeyI',
            [Control.MEDIUM_KICK]: 'KeyO',
            [Control.HEAVY_KICK]: 'KeyP',
        },
    },
];
