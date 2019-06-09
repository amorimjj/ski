import "babel-polyfill";
import { KEYS } from "../Constants";
import { Game } from './Game';

let game, skier, rhino, canvas, gameWindow;

beforeEach(() => {
	canvas = { setDrawOffset:() => { } };
	gameWindow = { left: 0, top: 0 };
	game = new Game(canvas);
	game.assetManager = { getAsset: () => ({ width: 10, height: 10 }) };
	game.gameWindow = gameWindow;
	skier = game.skier;
	rhino = game.rhino;
});

describe('Testing skier controls', () => {

	let ev, movingExpects;

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

describe('Testing Update game window', () => {

	beforeEach(() => {
		rhino.chase = jest.fn();
		rhino.caught = jest.fn();
		skier.move = jest.fn();
		skier.checkIfSkierHitObstacle = jest.fn();
	});

	test('rhino chase should be called with right parameters', () => {
		game.updateGameWindow();
		expect(rhino.chase.mock.calls.length).toBe(1);
		expect(rhino.chase.mock.calls[0][0]).toBe(skier);
		expect(rhino.chase.mock.calls[0][1]).toBe(game.obstacleManager);
		expect(rhino.chase.mock.calls[0][2]).toBe(game.assetManager);
	});

	test('should move skier if it wasnt caught by rhino', () => {
		rhino.caught.mockReturnValue(false);
		game.updateGameWindow();
		expect(skier.move.mock.calls.length).toBe(1);
	});

	test('should check if skier hit obstacle if it wasnt caught by rhino', () => {
		rhino.caught.mockReturnValue(false);
		game.updateGameWindow();
		expect(skier.checkIfSkierHitObstacle.mock.calls.length).toBe(1);
	});

	test('shouldnt move skier if it was caught by rhino', () => {
		rhino.caught.mockReturnValue(true);
		game.updateGameWindow();
		expect(skier.move.mock.calls.length).toBe(0);
	});

	test('shouldnt check if skier hit obstacle if it was caught by rhino', () => {
		rhino.caught.mockReturnValue(true);
		game.updateGameWindow();
		expect(skier.checkIfSkierHitObstacle.mock.calls.length).toBe(0);
	});
});

describe('Testing Draw game window', () => {

	beforeEach(() => {
		rhino.draw = jest.fn();
		rhino.caught = jest.fn();
		skier.draw = jest.fn();
	});

	test('rhino draw should be called with right parameters', () => {
		game.drawGameWindow();
		expect(rhino.draw.mock.calls.length).toBe(1);
		expect(rhino.draw.mock.calls[0][0]).toBe(game.canvas);
		expect(rhino.draw.mock.calls[0][1]).toBe(game.assetManager);
	});

	test('skier draw should be called with right parameters if it wasnt caught by rhino', () => {
		rhino.caught.mockReturnValue(false);
		game.drawGameWindow();
		expect(skier.draw.mock.calls.length).toBe(1);
		expect(skier.draw.mock.calls[0][0]).toBe(game.canvas);
		expect(skier.draw.mock.calls[0][1]).toBe(game.assetManager);
	});

	test('skier draw shouldnt be called if it was caught by rhino', () => {
		rhino.caught.mockReturnValue(true);
		game.drawGameWindow();
		expect(skier.draw.mock.calls.length).toBe(0);
	});
});
