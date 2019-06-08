import "babel-polyfill";
import * as Constants from "../Constants";
import { Skier } from "./Skier";


describe('when skier crashed', () => {
	
	let skier, fake;
	
	beforeEach(() => {
  		skier = new Skier(0, 0);
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
