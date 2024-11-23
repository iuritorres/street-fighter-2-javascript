import { Control } from '../constants/control.js';
import {
    SpecialMoveButton,
    SpecialMoveDirection,
} from '../constants/fighter.js';
import * as control from './InputHandler.js';

const HISTORY_CAP = 10;
const MOVE_DELAY = 150;

export const controlHistory = [
    // Player 1
    [
        {
            time: 0,
            move: undefined,
            buttons: [false, false, false, false, false, false],
        },
    ],

    // Player 2
    [
        {
            time: 0,
            move: undefined,
            buttons: [false, false, false, false, false, false],
        },
    ],
];

export const buttonOrder = [
    Control.LIGHT_KICK,
    Control.MEDIUM_KICK,
    Control.HEAVY_KICK,
    Control.LIGHT_PUNCH,
    Control.MEDIUM_PUNCH,
    Control.HEAVY_PUNCH,
];

function getMoveDirection(controls) {
    if (controls.forward) {
        if (controls.down) return SpecialMoveDirection.FORWARD_DOWN;
        if (controls.up) return SpecialMoveDirection.FORWARD_UP;

        return SpecialMoveDirection.FORWARD;
    } else if (controls.backward) {
        if (controls.down) return SpecialMoveDirection.BACKWARD_DOWN;
        if (controls.up) return SpecialMoveDirection.BACKWARD_UP;

        return SpecialMoveDirection.BACKWARD;
    } else if (controls.down) {
        return SpecialMoveDirection.DOWN;
    } else if (controls.up) {
        return SpecialMoveDirection.UP;
    }

    return SpecialMoveDirection.NONE;
}

function getCurrentControlSnapshot(time, id, direction) {
    const polledControls = {
        forward: control.isForward(id, direction),
        backward: control.isBackward(id, direction),
        down: control.isDown(id),
        up: control.isUp(id),
    };

    return {
        time: time.previous,
        move: getMoveDirection(polledControls),
        buttons: buttonOrder.map((button) => control.isControlDown(id, button)),
    };
}

function isLastSnapshotDifferent(snapshot, id) {
    if (
        controlHistory[id][0].move !== snapshot.move ||
        controlHistory[id][0].buttons.some(
            (button, index) => snapshot.buttons[index] !== button
        )
    )
        return true;

    return false;
}

function hasControlMatched(control, id) {
    switch (control) {
        case SpecialMoveButton.ANY_PUNCH:
            for (let buttonIndex = 3; buttonIndex < 6; buttonIndex++) {
                if (controlHistory[id][0].buttons[buttonIndex])
                    return buttonOrder[buttonIndex];
            }

            break;

        case SpecialMoveButton.ANY_KICK:
            for (let buttonIndex = 0; buttonIndex < 3; buttonIndex++) {
                if (controlHistory[id][0].buttons[buttonIndex])
                    return buttonOrder[buttonIndex];
            }

            break;

        default:
            if (control === controlHistory[id][0].move) return true;
    }

    return false;
}

export function pollControl(time, id, direction) {
    const currentControlSnapshot = getCurrentControlSnapshot(
        time,
        id,
        direction
    );

    if (!isLastSnapshotDifferent(currentControlSnapshot, id)) return;

    controlHistory[id].unshift(currentControlSnapshot);
    if (controlHistory[id].length >= HISTORY_CAP) controlHistory[id].pop();
}

export function hasSpecialMoveBeenExecuted(specialMove, id, time) {
    const controlMatched = hasControlMatched(
        specialMove.sequence[specialMove.cursor],
        id
    );

    if (!controlMatched) {
        if (
            controlHistory[id][0].time + MOVE_DELAY < time.previous &&
            specialMove.cursor > 1
        )
            specialMove.cursor = 0;

        return false;
    }

    if (specialMove.cursor === specialMove.sequence.length - 1) {
        specialMove.cursor = 0;
        return controlMatched;
    }

    specialMove.cursor += 1;
    return false;
}
