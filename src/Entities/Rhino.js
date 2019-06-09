import * as Constants from "../Constants";
import { Persona } from "./Persona";
import { AnimationCtrl } from "../Core/AnimationCtrl";

export class Rhino extends Persona  {
    assetName = Constants.RHINO_DOWN1;
	
	distanceReducer = 25;
    
	speed = Constants.RHINO_STARTING_SPEED;

	runningAnimationCtrl = new AnimationCtrl(
		[Constants.RHINO_DOWN2, Constants.RHINO_DOWN3],
		Constants.RHINO_STARTING_SPEED * 4 
	);

	eatingAnimationCtrl = new AnimationCtrl(
		[Constants.RHINO_LIFT1,Constants.RHINO_LIFT2,Constants.RHINO_LIFT3,Constants.RHINO_LIFT4,Constants.RHINO_LIFT5,Constants.RHINO_LIFT6],
		Constants.RHINO_STARTING_SPEED * 4 
	);

    constructor(x, y) {
        super(x, y);
    }

	caught(skier) {
		return ( Math.abs(skier.x - this.x) < this.distanceReducer && Math.abs(skier.y - this.y) < this.distanceReducer );
	}

	updateX(from) {

		if ( Math.abs(from - this.x) < this.distanceReducer ) {
			return this.x = from;
		}

		if ( from < this.x ) {
			return this.moveLeft();
		}
		this.moveRight();
	}

	updateY(from) {

		if ( Math.abs(from - this.y) < this.distanceReducer ) {
			return this.y = from;
		}

		if ( from > this.y ) {
			return this.moveDown();
		}
		this.moveUp();
	}

    chase(skier, obstacleManager, assetManager) {

		if ( this.caught(skier) ) {
			return this.eat();
		}
		
		this.assetName = this.runningAnimationCtrl.asset;
		
		const obstacle = this.checkIfHitObstacle(obstacleManager, assetManager);
		
		if ( obstacle ) {
			return this.handleCollision(obstacle, assetManager);	
		}

		this.updateX(skier.x);
		this.updateY(skier.y);
    }
	
	eat() {
		if ( ! this.eatingAnimationCtrl.isCompleted ) {
			this.assetName = this.eatingAnimationCtrl.asset;
		}
	}

	handleCollision(collision, assetManager) {
		
		const rhinoAsset = assetManager.getAsset(this.assetName);
		const collisionAsset = assetManager.getAsset(collision.assetName);
		
		if ( ( this.y + rhinoAsset.height ) > collision.y ) {
			this.moveDown();
		}
		
		if ( (collision.x + collisionAsset.width) - (this.x - Constants.RHINO_STARTING_SPEED) <= Constants.RHINO_STARTING_SPEED ) {
			return this.moveRight();
		}	
		
		this.moveLeft();
	}
}
