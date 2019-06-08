import "babel-polyfill";
import { KEYS } from "../Constants";
import { Game } from './Game';

describe('Testing skier controls', () => {

	let game, skier, ev, movingExpects;

	beforeEach(() => {
  		game = new Game({});
		skier = game.skier;
		skier.turnLeft = jest.fn();
		skier.turnRight = jest.fn();
		skier.turnUp = jest.fn();
		skier.turnDown = jest.fn();
		skier.jump = jest.fn();
		ev = { which: 0, preventDefault: jest.fn() };
		movingExpects = { [KEYS.LEFT] : 0, [KEYS.RIGHT] : 0, [KEYS.UP] :0, [KEYS.DOWN] : 0, [KEYS.JUMP] : 0 };
	});

	afterEach(() => {
		expect(ev.preventDefault.mock.calls.length).toBe(1);
	});

	let skierMoveChecker = (movingTo) => {
		movingExpects[movingTo] = 1;
    	expect(skier.turnLeft.mock.calls.length).toBe(movingExpects[KEYS.LEFT]);
    	expect(skier.turnRight.mock.calls.length).toBe(movingExpects[KEYS.RIGHT]);
    	expect(skier.turnUp.mock.calls.length).toBe(movingExpects[KEYS.UP]);
    	expect(skier.turnDown.mock.calls.length).toBe(movingExpects[KEYS.DOWN]);
    	expect(skier.jump.mock.calls.length).toBe(movingExpects[KEYS.JUMP]);
	}

	test('left key should call "turnLeft" from skier', () => {
		ev.which = KEYS.LEFT;
		game.handleKeyDown(ev);
		skierMoveChecker(KEYS.LEFT);
	});

	test('left righ should call "turnRight" from skier', () => {
		ev.which = KEYS.RIGHT;
		game.handleKeyDown(ev);
		skierMoveChecker(KEYS.RIGHT);
	});

	test('up key should call "turnUp" from skier', () => {
		ev.which = KEYS.UP;
		game.handleKeyDown(ev);
		skierMoveChecker(KEYS.UP);
	});

	test('down key should call "turnDown" from skier', () => {
		ev.which = KEYS.DOWN;
		game.handleKeyDown(ev);
		skierMoveChecker(KEYS.DOWN);
	});

	test('space key should call "jump" from skier', () => {
		ev.which = KEYS.SPACE;
		game.handleKeyDown(ev);
		skierMoveChecker(KEYS.JUMP);
	});
});
