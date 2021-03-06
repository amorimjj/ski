import "babel-polyfill";
import { KEYS, SKIER_DISTANCE_ADVANTAGE, RHINO_STARTING_DIFERENCE_POSITION } from "../Constants";
import { Game } from './Game';

let game, skier, rhino, canvas, gameWindow;

beforeEach(() => {
	canvas = { setDrawOffset:() => { }, drawText: () => { } };
	gameWindow = { left: 0, top: 0 };
	game = new Game(canvas);
	game.assetManager = { getAsset: () => ({ width: 10, height: 10 }) };
	game.gameWindow = gameWindow;
	skier = game.skier;
});

describe('Testing game controls', () => {

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

	describe('when game is running', () => {
		
		beforeEach(() => {
			game.isRunning = jest.fn();
			game.isRunning.mockReturnValue(true);
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
		test('enter key SHOULD call pauseRestart', () => {
			game.pauseRestart = jest.fn();	
			ev.which = KEYS.ENTER;
			game.handleKeyDown(ev);
			expect(game.pauseRestart.mock.calls.length).toBe(1);
		});
	
		test('left key SHOULD call "turnLeft" from skier', () => {
			ev.which = KEYS.LEFT;
			game.handleKeyDown(ev);
			skierMoveChecker(KEYS.LEFT);
		});
	
		test('left righ SHOULD call "turnRight" from skier', () => {
			ev.which = KEYS.RIGHT;
			game.handleKeyDown(ev);
			skierMoveChecker(KEYS.RIGHT);
		});
	
		test('up key SHOULD call "turnUp" from skier', () => {
			ev.which = KEYS.UP;
			game.handleKeyDown(ev);
			skierMoveChecker(KEYS.UP);
		});
	
		test('down key SHOULD call "turnDown" from skier', () => {
			ev.which = KEYS.DOWN;
			game.handleKeyDown(ev);
			skierMoveChecker(KEYS.DOWN);
		});
	
		test('space key SHOULD call "jump" from skier', () => {
			ev.which = KEYS.SPACE;
			game.handleKeyDown(ev);
			skierMoveChecker(KEYS.JUMP);
		});

	});

	describe('when game is not running', () => {

		beforeEach(() => {
			game.isRunning = jest.fn();
			game.isRunning.mockReturnValue(false);
		});

		test('left key SHOULD call "turnLeft" from skier', () => {
			ev.which = KEYS.LEFT;
			game.handleKeyDown(ev);
    		expect(skier.turnLeft.mock.calls.length).toBe(0);
		});
	
		test('left righ SHOULD call "turnRight" from skier', () => {
			ev.which = KEYS.RIGHT;
			game.handleKeyDown(ev);
    		expect(skier.turnRight.mock.calls.length).toBe(0);
		});
	
		test('up key SHOULD call "turnUp" from skier', () => {
			ev.which = KEYS.UP;
			game.handleKeyDown(ev);
    		expect(skier.turnUp.mock.calls.length).toBe(0);
		});
	
		test('down key SHOULD call "turnDown" from skier', () => {
			ev.which = KEYS.DOWN;
			game.handleKeyDown(ev);
    		expect(skier.turnDown.mock.calls.length).toBe(0);
		});
	
		test('space key SHOULD call "jump" from skier', () => {
			ev.which = KEYS.SPACE;
			game.handleKeyDown(ev);
    		expect(skier.jump.mock.calls.length).toBe(0);
		});
	});
});

describe('Testing Update game window', () => {

	beforeEach(() => {
		game.createRhino();
		rhino = game.rhino;
		rhino.chase = jest.fn();
		rhino.caught = jest.fn();
		skier.move = jest.fn();
		skier.checkIfSkierHitObstacle = jest.fn();
	});

	test('rhino chase SHOULD be called with right parameters', () => {
		game.updateGameWindow();
		expect(rhino.chase.mock.calls.length).toBe(1);
		expect(rhino.chase.mock.calls[0][0]).toBe(skier);
		expect(rhino.chase.mock.calls[0][1]).toBe(game.obstacleManager);
		expect(rhino.chase.mock.calls[0][2]).toBe(game.assetManager);
	});

	test('SHOULD move skier if it rhino wasnt started', () => {
		game.rhino = null;
		game.updateGameWindow();
		expect(skier.move.mock.calls.length).toBe(1);
	});

	test('SHOULD move skier if it wasnt caught by rhino', () => {
		rhino.caught.mockReturnValue(false);
		game.updateGameWindow();
		expect(skier.move.mock.calls.length).toBe(1);
	});

	test('SHOULD check if skier hit obstacle if rhino wasnt started', () => {
		game.rhino = null;
		game.updateGameWindow();
		expect(skier.checkIfSkierHitObstacle.mock.calls.length).toBe(1);
	});

	test('SHOULD check if skier hit obstacle if it wasnt caught by rhino', () => {
		rhino.caught.mockReturnValue(false);
		game.updateGameWindow();
		expect(skier.checkIfSkierHitObstacle.mock.calls.length).toBe(1);
	});

	test('SHOULDNT move skier if it was caught by rhino', () => {
		rhino.caught.mockReturnValue(true);
		game.updateGameWindow();
		expect(skier.move.mock.calls.length).toBe(0);
	});

	test('SHOULD call "startRhinoChasing"', () => {
		game.startRhinoChasing = jest.fn();
		game.updateGameWindow();
		expect(game.startRhinoChasing.mock.calls.length).toBe(1);
	});

	test('SHOULD check if skier hit obstacle if it was caught by rhino', () => {
		rhino.caught.mockReturnValue(true);
		game.updateGameWindow();
		expect(skier.checkIfSkierHitObstacle.mock.calls.length).toBe(0);
	});
});

describe('Testing Draw game window', () => {

	beforeEach(() => {
		game.createRhino();
		rhino = game.rhino;
		rhino.draw = jest.fn();
		rhino.caught = jest.fn();
		skier.draw = jest.fn();
	});

	test('rhino draw SHOULD be called with right parameters', () => {
		game.drawGameWindow();
		expect(rhino.draw.mock.calls.length).toBe(1);
		expect(rhino.draw.mock.calls[0][0]).toBe(game.canvas);
		expect(rhino.draw.mock.calls[0][1]).toBe(game.assetManager);
	});

	test('skier draw SHOULD be called with right parameters rhino wasnt started', () => {
		game.rhino = null;
		game.drawGameWindow();
		expect(skier.draw.mock.calls.length).toBe(1);
		expect(skier.draw.mock.calls[0][0]).toBe(game.canvas);
		expect(skier.draw.mock.calls[0][1]).toBe(game.assetManager);
	});

	test('skier draw SHOULD be called with right parameters if it wasnt caught by rhino', () => {
		rhino.caught.mockReturnValue(false);
		game.drawGameWindow();
		expect(skier.draw.mock.calls.length).toBe(1);
		expect(skier.draw.mock.calls[0][0]).toBe(game.canvas);
		expect(skier.draw.mock.calls[0][1]).toBe(game.assetManager);
	});

	test('skier draw SHOULDNT be called if it was caught by rhino', () => {
		rhino.caught.mockReturnValue(true);
		game.drawGameWindow();
		expect(skier.draw.mock.calls.length).toBe(0);
	});

	test('when gameOver is false SHOULDNT draw gameOverMessage', () => {
		game.gameOver = false;
		game.gameOverMessage.draw = jest.fn();
		game.drawGameWindow();
		expect(game.gameOverMessage.draw.mock.calls.length).toBe(0);
	});

	test('when gameOver is true SHOULD draw gameOverMessage', () => {
		game.gameOver = true;
		game.gameOverMessage.draw = jest.fn();
		game.drawGameWindow();
		expect(game.gameOverMessage.draw.mock.calls.length).toBe(1);
	});
	
	test('when paused is false SHOULDNT draw pausedMessage', () => {
		game.paused = false;
		game.pausedMessage.draw = jest.fn();
		game.drawGameWindow();
		expect(game.pausedMessage.draw.mock.calls.length).toBe(0);
	});

	test('when paused is true SHOULD draw pausedMessage', () => {
		game.paused = true;
		game.pausedMessage.draw = jest.fn();
		game.drawGameWindow();
		expect(game.pausedMessage.draw.mock.calls.length).toBe(1);
	});

	test('when paused is true and gameOver is true SHOULDNT draw pausedMessage', () => {
		game.paused = true;
		game.gameOver = true;
		game.pausedMessage.draw = jest.fn();
		game.drawGameWindow();
		expect(game.pausedMessage.draw.mock.calls.length).toBe(0);
	});
});

describe('Testing Starting rhino chasing', () => {

	test('rhino SHOULDNT be setted if skier didnt sky enough', () => {
		skier.skiingDistance = 5;
		game.startRhinoChasing();
		expect(game.rhino).toBe(null);
	});

	test('rhino SHOULD be setted if skier did sky enough', () => {
		skier.skiingDistance = SKIER_DISTANCE_ADVANTAGE;
		game.startRhinoChasing();
		expect(game.rhino).not.toBe(null);
	});
	
	test('rhino SHOULD be setted with right (x,y) based on skier(x,y)', () => {
		skier.x = 10, skier.y = 20;
		skier.skiingDistance = SKIER_DISTANCE_ADVANTAGE;
		game.startRhinoChasing();
		expect(game.rhino.x).toBe(skier.x);
		expect(game.rhino.y).toBe(skier.y - RHINO_STARTING_DIFERENCE_POSITION);
	});

	test('rhino SHOULDNT be setted once it was created', () => {
		game.createRhino();
		rhino = game.rhino;
		skier.skiingDistance = SKIER_DISTANCE_ADVANTAGE;
		game.startRhinoChasing();
		expect(game.rhino).toBe(rhino);
	});
});

describe('Testing startGame', () => {

	test('gameOver SHOULD be definded as false', () => {
		game.gameOver = true;
		game.startGame();
		expect(game.gameOver).toBe(false);
	});

	test('paused SHOULD be definded as false', () => {
		game.paused = true;
		game.startGame();
		expect(game.paused).toBe(false);
	});
	
	test('rhino SHOULD be definded as null', () => {
		game.rhino = {};
		game.startGame();
		expect(game.rhino).toBe(null);
	});

	test('skier SHOULD be a new instance', () => {
		game.startGame();
		expect(game.skier).not.toBe(skier);
	});
});

describe('Testing pauseRestart', () => {

	test('when gameOver is false SHOULD toggle paused', () => {
		game.gameOver = false;
		game.paused = false;
		game.pauseRestart();
		expect(game.paused).toBe(true);
		game.pauseRestart();
		expect(game.paused).toBe(false);
	});
	
	test('when gameOver is false SHOULDNT call startGame', () => {
		game.gameOver = false;
		game.startGame = jest.fn();
		game.pauseRestart();
		expect(game.startGame.mock.calls.length).toBe(0);
	});

	test('when gameOver is true SHOULD call startGame', () => {
		game.gameOver = true;
		game.startGame = jest.fn();
		game.pauseRestart();
		expect(game.startGame.mock.calls.length).toBe(1);
	});

});
