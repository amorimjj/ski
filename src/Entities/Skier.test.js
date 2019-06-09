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

		test('turn left SHOULD set direction as left', () => {
			skier.turnLeft();
    		expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT);
		});

		test('turn left SHOULD move skier to left side', () => {
			skier.moveLeft = fake;
			skier.turnLeft();
    		expect(fake.mock.calls.length).toBe(1);
		});
	})

	describe('on righ  key stroke', () => {
		test('turn righ SHOULD set direction as right', () => {
			skier.turnRight();
    		expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.RIGHT);
		});

		test('turn right SHOULD move skier to right side', () => {
			skier.moveRight = fake;
			skier.turnRight();
    		expect(fake.mock.calls.length).toBe(1);
		});
	});
});

describe('Jumping feature tests', () => {

	describe('When skier is not jumping', () => {

		test('after turn left, isJumping SHOULD return false', () => {
			skier.turnLeft();
    		expect(skier.isJumping()).toBe(false);
		});
		
		test('after turn right, isJumping SHOULD return false', () => {
			skier.turnRight();
    		expect(skier.isJumping()).toBe(false);
		});
		
		test('after turn up, isJumping SHOULD return false', () => {
			skier.turnUp();
    		expect(skier.isJumping()).toBe(false);
		});

		test('after turn down, isJumping SHOULD return false', () => {
			skier.turnDown();
    		expect(skier.isJumping()).toBe(false);
		});

		test('SHOULD hit tree obstacle', () => {
			createStubObstacle(Constants.TREE);
			skier.checkIfSkierHitObstacle(obstacleManagerStub, assetManagerStub);
			expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.CRASH);
		});

		test('SHOULD hit tree_cluster obstacle', () => {
			createStubObstacle(Constants.TREE_CLUSTER);
			skier.checkIfSkierHitObstacle(obstacleManagerStub, assetManagerStub);
			expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.CRASH);
		});

		test('SHOULD hit rock1 obstacle', () => {
			createStubObstacle(Constants.ROCK1);
			skier.checkIfSkierHitObstacle(obstacleManagerStub, assetManagerStub);
			expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.CRASH);
		});

		test('SHOULD hit rock2 obstacle', () => {
			createStubObstacle(Constants.ROCK2);
			skier.checkIfSkierHitObstacle(obstacleManagerStub, assetManagerStub);
			expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.CRASH);
		});

		test('SHOULD jump in a ramp obstacle', () => {
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
		
		test('SHOULD reset jumpAnimationCtrl', () => {
			expect(skier.jumpAnimationCtrl.reset.mock.calls.length).toBe(1);
		});

		test('after jump SHOULD return true', () => {
    		expect(skier.isJumping()).toBe(true);
		});
		
		test('SHOULD hit tree obstacle', () => {
			createStubObstacle(Constants.TREE);
			skier.checkIfSkierHitObstacle(obstacleManagerStub, assetManagerStub);
			expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.CRASH);
		});

		test('SHOULD hit tree_cluster obstacle', () => {
			createStubObstacle(Constants.TREE_CLUSTER);
			skier.checkIfSkierHitObstacle(obstacleManagerStub, assetManagerStub);
			expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.CRASH);
		});

		test('SHOULD hit rock1 obstacle', () => {
			createStubObstacle(Constants.ROCK1);
			skier.checkIfSkierHitObstacle(obstacleManagerStub, assetManagerStub);
			expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.JUMP);
		});

		test('SHOULD hit rock2 obstacle', () => {
			createStubObstacle(Constants.ROCK2);
			skier.checkIfSkierHitObstacle(obstacleManagerStub, assetManagerStub);
			expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.JUMP);
		});

		test('once jump is completed direction SHOULD be setted as DOWN', () => {
			skier.jumpAnimationCtrl.currentAsset = 4;
			skier.jumpSkier();
			expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.DOWN);
		});

		describe('Direction SHOULDNT be changed once skier is jumping', () => {
			
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

});

describe('Skiing distance tests', () => {

	describe('When move is triggered', () => {

		test('Direction is CRASH skiingDistance SHOULDNT be increased', () => {
			skier.direction = Constants.SKIER_DIRECTIONS.CRASH;
			skier.skiingDistance = 10;
			skier.move();
			expect(skier.skiingDistance).toBe(10);
		});
	
		test('Direction is LEFT skiingDistance SHOULDNT be increased', () => {
			skier.direction = Constants.SKIER_DIRECTIONS.LEFT;
			skier.skiingDistance = 10;
			skier.move();
			expect(skier.skiingDistance).toBe(10);
		});
	
		test('Direction is RIGHT skiingDistance SHOULDNT be increased', () => {
			skier.direction = Constants.SKIER_DIRECTIONS.RIGHT;
			skier.skiingDistance = 10;
			skier.move();
			expect(skier.skiingDistance).toBe(10);
		});
		
		test('Direction is LEFT_DOWN skiingDistance SHOULD be increased', () => {
			skier.direction = Constants.SKIER_DIRECTIONS.LEFT_DOWN;
			skier.skiingDistance = 10;
			skier.move();
			expect(skier.skiingDistance).toBe(11);
		});
	
		test('Direction is DOWN skiingDistance SHOULD be increased', () => {
			skier.direction = Constants.SKIER_DIRECTIONS.DOWN;
			skier.skiingDistance = 10;
			skier.move();
			expect(skier.skiingDistance).toBe(11);
		});

		test('Direction is RIGHT_DOWN skiingDistance SHOULD be increased', () => {
			skier.direction = Constants.SKIER_DIRECTIONS.RIGHT_DOWN;
			skier.skiingDistance = 10;
			skier.move();
			expect(skier.skiingDistance).toBe(11);
		});
	
		test('Direction is JUMP, skiingDistance SHOULD be increased', () => {
			skier.direction = Constants.SKIER_DIRECTIONS.JUMP;
			skier.skiingDistance = 10;
			skier.move();
			expect(skier.skiingDistance).toBe(11);
		});
	});
});
