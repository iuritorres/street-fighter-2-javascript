import { STAGE_PADDING, STAGE_WIDTH } from '../../../constants/stage.js';

export class SkewedFloor {
	constructor(image, dimensions) {
		this.image = image;
		this.dimensions = dimensions;
	}

	update(time) {}

	draw(context, camera, y) {
		const [sourceX, sourceY, sourceWidth, sourceHeight] = this.dimensions;

		context.save();
		context.setTransform(
			1,
			0,
			-5.15 - (camera.position.x - (STAGE_WIDTH + STAGE_PADDING)) / 112,
			1,
			32 - camera.position.x / 1.55,
			y - camera.position.y
		);
		context.drawImage(
			this.image,
			sourceX,
			sourceY,
			sourceWidth,
			sourceHeight,
			0,
			0,
			sourceWidth,
			sourceHeight
		);
		context.restore();
	}
}
