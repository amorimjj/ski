import "babel-polyfill";
import * as Constants from "../Constants";
import { Skier } from "./Skier";
import { Obstacle } from "./Obstacles/Obstacle";

let skier, obstaclesStub, obstacleManagerStub, assetManagerStub;

beforeEach(() => { 
	skier = new Skier(0, 0);
	obstaclesStub = [];
	obstacleManagerStub = { getObstacles: () => obstaclesStub };
	assetManagerStub = { getAsset: () => ({ width: 10, height: 10 }) }; 
});

let createStubObstacle = type => {
	let obstacle = new Obstacle(0, 0);
	obstacle.assetName = type;
	obstaclesStub.push(obstacle);
}

describe('when skier crashed', () => {
	
	let fake;
	
	beforeEach(() => {
		fake = jest.fn();
		skier.direction = Constants.SKIER_DIRECTIONS.CRASH;
	});

	describe('on left key stroke', () => {

		test('turn left should set direction as left', () => {
			skier.turnLeft();
    		expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT);
		});

		test('turn left should move skier to left side', () => {
			skier.moveSkierLeft = fake;
			skier.turnLeft();
    		expect(fake.mock.calls.length).toBe(1);
		});
	})

	describe('on righ  key stroke', () => {
		test('turn righ should set direction as right', () => {
			skier.turnRight();
    		expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.RIGHT);
		});

		test('turn right should move skier to right side', () => {
			skier.moveSkierRight = fake;
			skier.turnRight();
    		expect(fake.mock.calls.length).toBe(1);
		});
	});
});

describe('Jumping feature tests', () => {

	describe('When skier is not jumping', () => {

		test('after turn left, isJumping should return false', () => {
			skier.turnLeft();
    		expect(skier.isJumping()).toBe(false);
		});
		
		test('after turn right, isJumping should return false', () => {
			skier.turnRight();
    		expect(skier.isJumping()).toBe(false);
		});
		
		test('after turn up, isJumping should return false', () => {
			skier.turnUp();
    		expect(skier.isJumping()).toBe(false);
		});

		test('after turn down, isJumping should return false', () => {
			skier.turnDown();
    		expect(skier.isJumping()).toBe(false);
		});

		test('should hit tree obstacle', () => {
			createStubObstacle(Constants.TREE);
			skier.checkIfSkierHitObstacle(obstacleManagerStub, assetManagerStub);
			expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.CRASH);
		});

		test('should hit tree_cluster obstacle', () => {
			createStubObstacle(Constants.TREE_CLUSTER);
			skier.checkIfSkierHitObstacle(obstacleManagerStub, assetManagerStub);
			expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.CRASH);
		});

		test('should hit rock1 obstacle', () => {
			createStubObstacle(Constants.ROCK1);
			skier.checkIfSkierHitObstacle(obstacleManagerStub, assetManagerStub);
			expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.CRASH);
		});

		test('should hit rock2 obstacle', () => {
			createStubObstacle(Constants.ROCK2);
			skier.checkIfSkierHitObstacle(obstacleManagerStub, assetManagerStub);
			expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.CRASH);
		});

		test('should jump in a ramp obstacle', () => {
			createStubObstacle(Constants.JUMP_RAMP);
			skier.checkIfSkierHitObstacle(obstacleManagerStub, assetManagerStub);
			expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.JUMP);
		});
	});

	describe('When skier is jumping', () => {

		beforeEach(() => {
			skier.jumpAnimationCtrl.reset = jest.fn();
			skier.jump()
		});
		
		test('should reset jumpAnimationCtrl', () => {
			expect(skier.jumpAnimationCtrl.reset.mock.calls.length).toBe(1);
		});

		test('after jump should return true', () => {
    		expect(skier.isJumping()).toBe(true);
		});
		
		test('should hit tree obstacle', () => {
			createStubObstacle(Constants.TREE);
			skier.checkIfSkierHitObstacle(obstacleManagerStub, assetManagerStub);
			expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.CRASH);
		});

		test('should hit tree_cluster obstacle', () => {
			createStubObstacle(Constants.TREE_CLUSTER);
			skier.checkIfSkierHitObstacle(obstacleManagerStub, assetManagerStub);
			expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.CRASH);
		});

		test('should hit rock1 obstacle', () => {
			createStubObstacle(Constants.ROCK1);
			skier.checkIfSkierHitObstacle(obstacleManagerStub, assetManagerStub);
			expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.JUMP);
		});

		test('should hit rock2 obstacle', () => {
			createStubObstacle(Constants.ROCK2);
			skier.checkIfSkierHitObstacle(obstacleManagerStub, assetManagerStub);
			expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.JUMP);
		});

		test('once jump is completed direction should be setted as DOWN', () => {
			skier.jumpAnimationCtrl.currentAsset = 4;
			skier.jumpSkier();
			expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.DOWN);
		});

		describe('Direction cant be changed once skier is jumping', () => {
			
			test('Testing turnLeft', () => {
				skier.turnLeft();
				expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.JUMP);
			});
			
			test('Testing turnRight', () => {
				skier.turnRight();
				expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.JUMP);
			});
			
			test('Testing turnUp', () => {
				skier.turnUp();
				expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.JUMP);
			});

			test('Testing turnDown', () => {
				skier.turnDown();
				expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.JUMP);
			});
		});
	});

	describe('Jump animation control tests', () => {

		let ctrl;

		beforeEach(() => ctrl = skier.jumpAnimationCtrl);

		test('isCompleted should be false if currentAsset is less than assets.length - 1', () => {
			ctrl.currentAsset = 0;
			expect(ctrl.isCompleted).toBe(false);
		});
		
		test('isCompleted should be true if currentAsset is equal than assets.length - 1', () => {
			ctrl.currentAsset = 4;
			expect(ctrl.isCompleted).toBe(true);
		});

		test('should return same asset if timer is less than SKIER_STARTING_SPEED', () => {
			let a1 = ctrl.asset;
			ctrl.timer = 5;
			let a2 = ctrl.asset;
			expect(a1).toBe(a2);
		});

		test('should return next asset if timer is equal than SKIER_STARTING_SPEED', () => {
			let a1 = ctrl.asset;
			ctrl.timer = Constants.SKIER_STARTING_SPEED;
			let a2 = ctrl.asset;
			expect(a1).not.toBe(a2);
		});

		test('should reset timer', () => {
			let a1 = ctrl.asset;
			ctrl.timer = Constants.SKIER_STARTING_SPEED;
			let a2 = ctrl.asset;
			expect(ctrl.timer).toBe(0);
		});
			
		test('should increment currentAsset', () => {
			ctrl.reset();
			expect(ctrl.currentAsset).toBe(0);
			ctrl.timer = Constants.SKIER_STARTING_SPEED;
			let a2 = ctrl.asset;
			expect(ctrl.currentAsset).toBe(1);
		});

		test('should return right asset', () => {
			ctrl.reset();
			expect(ctrl.asset).toBe(ctrl.assets[0]);
			ctrl.timer = Constants.SKIER_STARTING_SPEED;
			expect(ctrl.asset).toBe(ctrl.assets[1]);
		});

		test('should reset timer and currentAsset', () => {
			ctrl.timer = 5;
			ctrl.currentAsset = 2;
			ctrl.reset();
			expect(ctrl.timer).toBe(0);
			expect(ctrl.currentAsset).toBe(0);
		});
	});
});
