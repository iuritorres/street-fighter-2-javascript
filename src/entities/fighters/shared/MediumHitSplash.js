import { HitSplash } from './HitSplash.js';

export class MediumHitSplash extends HitSplash {
	// prettier-ignore
	frames = [
      // Player 1
      [[13, 41, 14, 15], [7, 7]],
      [[34, 39, 21, 19], [10, 9]],
      [[64, 39, 21, 19], [10, 9]],
      [[90, 35, 27, 25], [13, 12]],

      // Player 2
      [[159, 41, 14, 15], [7, 7]],
      [[182, 39, 21, 19], [10, 9]],
      [[211, 39, 21, 19], [10, 9]],
      [[239, 35, 27, 25], [13, 12]],
   ];

	constructor(args, time, entityList) {
		super(args, time, entityList);
	}
}
