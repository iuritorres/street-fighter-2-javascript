import { gameState } from '../state/gameState.js';
import { drawBox, drawCross } from './entityDebug.js';

export function drawCollisionInfo(fighter, context, camera) {
    const { position, direction, boxes } = fighter;

    context.lineWidth = 1;

    // Push Box
    drawBox(
        context,
        camera,
        position,
        direction,
        Object.values(boxes.push),
        '#55FF55'
    );

    // Hurt Boxes;
    for (const hurtBox of Object.values(boxes.hurt)) {
        drawBox(context, camera, position, direction, hurtBox, '#7777FF');
    }

    // Hit Box
    drawBox(
        context,
        camera,
        position,
        direction,
        Object.values(boxes.hit),
        '#FF0000'
    );

    // OriginPoint Cross
    drawCross(context, camera, position, '#FFFFFF');
}

export function logHit(fighter, hitStrength, hitLocation) {
    // HIT Log
    console.log(
        `${gameState.fighters[fighter.playerId].id} has hit ${
            gameState.fighters[fighter.opponent.playerId].id
        }'s ${hitLocation} with a ${hitStrength} attack!`
    );
}
