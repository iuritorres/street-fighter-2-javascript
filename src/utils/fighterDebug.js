import { gameState } from '../state/gameState.js';

function drawCross(context, camera, position, color) {
	context.beginPath();
	context.strokeStyle = color;
	context.moveTo(
		Math.floor(position.x - camera.position.x) - 4,
		Math.floor(position.y - camera.position.y) - 0.5
	);
	context.lineTo(
		Math.floor(position.x - camera.position.x) + 5,
		Math.floor(position.y - camera.position.y) - 0.5
	);
	context.moveTo(
		Math.floor(position.x - camera.position.x) + 0.5,
		Math.floor(position.y - camera.position.y) - 5
	);
	context.lineTo(
		Math.floor(position.x - camera.position.x) + 0.5,
		Math.floor(position.y - camera.position.y) + 4
	);
	context.stroke();
}

function drawBox(context, camera, position, direction, dimensions, color) {
	if (!Array.isArray(dimensions)) return;

	const [x = 0, y = 0, width = 0, height = 0] = dimensions;

	context.beginPath();
	context.strokeStyle = color + 'AA';
	context.fillStyle = color + '44';
	context.fillRect(
		Math.floor(position.x + x * direction - camera.position.x) + 0.5,
		Math.floor(position.y + y - camera.position.y) + 0.5,
		width * direction,
		height
	);
	context.rect(
		Math.floor(position.x + x * direction - camera.position.x) + 0.5,
		Math.floor(position.y + y - camera.position.y) + 0.5,
		width * direction,
		height
	);
	context.stroke();
}

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
