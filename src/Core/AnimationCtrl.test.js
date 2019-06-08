import "babel-polyfill";
import * as Constants from "../Constants";
import { AnimationCtrl } from "./AnimationCtrl";

let skier, obstaclesStub, obstacleManagerStub, assetManagerStub;

describe('Jump animation control tests', () => {

	let ctrl;

	beforeEach(() => {
		ctrl = new AnimationCtrl(
			[Constants.SKIER_JUMP1, Constants.SKIER_JUMP2, Constants.SKIER_JUMP3, Constants.SKIER_JUMP4, Constants.SKIER_JUMP5],
			Constants.SKIER_STARTING_SPEED
		);
	});

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
