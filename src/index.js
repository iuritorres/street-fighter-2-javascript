import { StreetFighterGame } from './StreetFighterGame.js';

window.addEventListener('load', function () {
	window.addEventListener(
		'click',
		function () {
			new StreetFighterGame().start();
		},
		{ once: true }
	);
});
