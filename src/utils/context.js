export function getContext() {
	const canvasElement = document.querySelector('canvas');
	const context = canvasElement.getContext('2d');

	context.imageSmoothingEnabled = false;

	return context;
}

export function drawFrame(context, image, dimensions, x, y, direction = 1) {
	const [sourceX, sourceY, sourceWidth, sourceHeight] = dimensions;

	context.scale(direction, 1);
	context.drawImage(
		image,
		sourceX,
		sourceY,
		sourceWidth,
		sourceHeight,
		x * direction,
		y,
		sourceWidth,
		sourceHeight
	);
	context.setTransform(1, 0, 0, 1, 0, 0);
}
