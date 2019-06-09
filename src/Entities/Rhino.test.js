import "babel-polyfill";
import * as Constants from "../Constants";
import { Rhino } from "./Rhino";
import { Obstacle } from "./Obstacles/Obstacle";

let rhino, obstaclesStub, obstacleManagerStub, assetManagerStub;

beforeEach(() => { 
	rhino = new Rhino(0, 0);
	assetManagerStub = { getAsset: () => ({ width: 65, height: 65 }) }; 
});

describe('Rhino caught', () => {
	
	test('when skier x is to far from rhino x should be false', () => {
    	expect(rhino.caught({ x: 100, y: 0})).toBe(false);
	});

	test('when skier y is to far from rhino y should be false', () => {
    	expect(rhino.caught({ x: 0, y: 100})).toBe(false);
	});

	test('when skier x,y is close to rhino x,y should be true', () => {
    	expect(rhino.caught({ x: 4, y: 4})).toBe(true);
	});

});

describe('Rhino update(X|Y)', () => {
	
	test('when skier x is less then rhino x should decrease rhino x', () => {
		let currentX = rhino.x;
		rhino.updateX(-40);
    	expect(rhino.x).toBe(currentX - Constants.RHINO_STARTING_SPEED);
	});

	test('when skier y is less then rhino y should decrease rhino y', () => {
		let currentY = rhino.y;
		rhino.updateY(-40);
    	expect(rhino.y).toBe(currentY - Constants.RHINO_STARTING_SPEED);
	});
	
	test('when skier x is close to rhino x should set rhino x as skier x', () => {
		rhino.updateX(-3);
    	expect(rhino.x).toBe(-3);
	});
	
	test('when skier y is close to rhino y should set rhino y as skier y', () => {
		rhino.updateY(-3);
    	expect(rhino.y).toBe(-3);
	});
});

describe('Rhino chase', () => {

	test('when rhino caught skier, eat should be called', () => {
		rhino.eat = jest.fn();
		rhino.chase({ x:4, y: 4});
		expect(rhino.eat.mock.calls.length).toBe(1);
	});

	describe('when rhino didnt caugh skier', () => {
		
		beforeEach(() => {
			rhino.checkIfHitObstacle = jest.fn();
		});

		test('eat shouldnt be called', () => {
			rhino.eat = jest.fn();
			rhino.chase({ x:100, y: 100});
			expect(rhino.eat.mock.calls.length).toBe(0);
		});

		test('asset shouldnt be setted', () => {
			rhino.chase({ x:100, y: 100});
			expect(rhino.assetName).toBe(rhino.runningAnimationCtrl.asset);
		});

		describe('with no obstacle', () => {

			beforeEach(() => {
				rhino.updateX = jest.fn();
				rhino.updateY = jest.fn();
			});
			
			test('should update x using skier x', () => {
				rhino.chase({ x:100, y: 200});
				expect(rhino.updateX.mock.calls[0][0]).toBe(100);
			});
			
			test('should update y using skier y', () => {
				rhino.chase({ x:100, y: 200});
				expect(rhino.updateY.mock.calls[0][0]).toBe(200);
			});
		});

		describe('with obstacle', () => {

			let obstacle = { x:0, y: 0 };

			beforeEach(() => {
				rhino.updateX = jest.fn();
				rhino.updateY = jest.fn();
				rhino.handleCollision = jest.fn();
				rhino.checkIfHitObstacle
					.mockReturnValue(obstacle);
			});
				
			test('should call checkIfHitObstacle', () => {
				rhino.chase({ x: 200, y: 200});
				expect(rhino.checkIfHitObstacle.mock.calls.length).toBe(1);
			});

			test('shouldnt update x', () => {
				rhino.chase({ x: 200, y: 200});
				expect(rhino.updateX.mock.calls.length).toBe(0);
			});
			
			test('shouldnt update y', () => {
				rhino.chase({ x:200, y: 200});
				expect(rhino.updateY.mock.calls.length).toBe(0);
			});
			
			test('should call handleCollision with obstacle', () => {
				rhino.chase({ x:200, y: 200});
				expect(rhino.handleCollision.mock.calls[0][0]).toBe(obstacle);
			});
		});
	});
});

describe('Rhino eat', () => {
	
	test('should update assetName', () => {
		rhino.assetName = '';
		rhino.eat();
		expect(rhino.assetName).toBe(rhino.eatingAnimationCtrl.asset);
	});

	test('shouldnt update assetName when animation is completed', () => {
		rhino.assetName = '';
		rhino.eatingAnimationCtrl.currentAsset = 5;
		rhino.eat();
		expect(rhino.assetName).not.toBe(rhino.eatingAnimationCtrl.asset);
	});
});

describe('Rhino handleCollision', () => {
	
	test('should decrease x and increase y', () => {
		let currentX = rhino.x = -65;
		let currentY = rhino.y = 10;
		rhino.handleCollision({ x: 0, y: 0}, assetManagerStub);
		expect(rhino.x).toBe(currentX - Constants.RHINO_STARTING_SPEED);
		expect(rhino.y).toBe(currentY + Constants.RHINO_STARTING_SPEED);
	});

	test('shouldnt change y but should decrease x', () => {
		let currentX = rhino.x = 50;
		let currentY = rhino.y = -65;
		rhino.handleCollision({ x: 0, y: 0}, assetManagerStub);
		expect(rhino.y).toBe(currentY);
		expect(rhino.x).toBe(currentX - Constants.RHINO_STARTING_SPEED);
	});

	test('should increase x and increase y', () => {
		let currentX = rhino.x = 65;
		let currentY = rhino.y = 10;
		rhino.handleCollision({ x: 0, y: 0}, assetManagerStub);
		expect(rhino.x).toBe(currentX + Constants.RHINO_STARTING_SPEED);
		expect(rhino.y).toBe(currentY + Constants.RHINO_STARTING_SPEED);
	});
});
