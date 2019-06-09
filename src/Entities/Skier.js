import * as Constants from "../Constants";
import { Persona } from "./Persona";
import { AnimationCtrl } from "../Core/AnimationCtrl";

export class Skier extends Persona {
    assetName = Constants.SKIER_DOWN;

    direction = Constants.SKIER_DIRECTIONS.DOWN;
    speed = Constants.SKIER_STARTING_SPEED;

	skiingDistance = 0;

	jumpAnimationCtrl = new AnimationCtrl(
		[Constants.SKIER_JUMP1, Constants.SKIER_JUMP2, Constants.SKIER_JUMP3, Constants.SKIER_JUMP4, Constants.SKIER_JUMP5],
		Constants.SKIER_STARTING_SPEED
	);

    constructor(x, y) {
        super(x, y);
    }

    setDirection(direction) {
        this.direction = direction;
        this.updateAsset();
    }

    updateAsset() {
        this.assetName = Constants.SKIER_DIRECTION_ASSET[this.direction];
    }

	updateSkiingDistance() {
		if ( [Constants.SKIER_DIRECTIONS.CRASH,Constants.SKIER_DIRECTIONS.LEFT,Constants.SKIER_DIRECTIONS.RIGHT].includes(this.direction) ) {
			return;
		}
		this.skiingDistance++;
	}

    move() {
        switch(this.direction) {
            case Constants.SKIER_DIRECTIONS.LEFT_DOWN:
                this.moveSkierLeftDown();
                break;
            case Constants.SKIER_DIRECTIONS.DOWN:
                this.moveDown();
                break;
            case Constants.SKIER_DIRECTIONS.RIGHT_DOWN:
                this.moveSkierRightDown();
                break;
			case Constants.SKIER_DIRECTIONS.JUMP:
				this.jumpSkier();
				break;
        }

		this.updateSkiingDistance();
    }

    moveSkierLeftDown() {
        this.x -= this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }
    moveSkierRightDown() {
        this.x += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

	jumpSkier() {
		if ( this.jumpAnimationCtrl.isCompleted ) {
			return this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
		}
		this.moveDown();
		this.assetName = this.jumpAnimationCtrl.asset;
	}

	checkCrashState(direction) {
		if ( this.direction === Constants.SKIER_DIRECTIONS.CRASH ) {
			this.setDirection(direction);
		}
	}

    turnLeft() {

		if ( this.isJumping() ) {
			return;
		}

		this.checkCrashState(Constants.SKIER_DIRECTIONS.LEFT);

        if(this.direction === Constants.SKIER_DIRECTIONS.LEFT) {
            return this.moveLeft();
        }
        
		this.setDirection(this.direction - 1);
    }

    turnRight() {

		if ( this.isJumping() ) {
			return;
		}

		this.checkCrashState(Constants.SKIER_DIRECTIONS.RIGHT);

        if( this.direction === Constants.SKIER_DIRECTIONS.RIGHT ) {
            return this.moveRight();
        }

		this.setDirection(this.direction + 1);
    }

    turnUp() {
        if(this.direction === Constants.SKIER_DIRECTIONS.LEFT || this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveUp();
        }
    }

    turnDown() {
		if ( this.isJumping() ) {
			return;
		}
        this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
    }

	jump() {
		this.jumpAnimationCtrl.reset();
        this.setDirection(Constants.SKIER_DIRECTIONS.JUMP);
	}

	isJumping() {
		return this.direction === Constants.SKIER_DIRECTIONS.JUMP;
	}

	canJump(asset) {
		return asset === Constants.ROCK1 || asset === Constants.ROCK2;
	}

	handleCollision(collision) {
	
		if ( collision.getAssetName() === Constants.JUMP_RAMP ) {
			return this.jump();
		}
        
		this.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
	}

    checkIfSkierHitObstacle(obstacleManager, assetManager) {

		const obstacle = this.checkIfHitObstacle(obstacleManager, assetManager);
		
		if ( ! obstacle || ( this.isJumping() && this.canJump(obstacle.getAssetName()) ) ) {
				return;
		}

		this.handleCollision(obstacle);
    }
}
