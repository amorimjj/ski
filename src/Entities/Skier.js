import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect } from "../Core/Utils";

export class Skier extends Entity {
    assetName = Constants.SKIER_DOWN;

    direction = Constants.SKIER_DIRECTIONS.DOWN;
    speed = Constants.SKIER_STARTING_SPEED;

	jumpAnimationCtrl = {
		assets: [Constants.SKIER_JUMP1, Constants.SKIER_JUMP2, Constants.SKIER_JUMP3, Constants.SKIER_JUMP4, Constants.SKIER_JUMP5],
		timer: 0,
		currentAsset: 0,
		next() {
			if ( ! this.isCompleted ) {
				this.currentAsset++;
			}
		},
		shouldAnimate() {
			return this.timer++ >= Constants.SKIER_STARTING_SPEED;
		},
		reset() {
			this.timer = 0;
			this.currentAsset = 0;
		},
		get isCompleted() {
			return this.currentAsset === ( this.assets.length - 1);
		},
		get asset() {
			if (  this.shouldAnimate() ) {
				this.timer = 0;
				this.next();
			}
			return this.assets[this.currentAsset];
		}
	}

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

    move() {
        switch(this.direction) {
            case Constants.SKIER_DIRECTIONS.LEFT_DOWN:
                this.moveSkierLeftDown();
                break;
            case Constants.SKIER_DIRECTIONS.DOWN:
                this.moveSkierDown();
                break;
            case Constants.SKIER_DIRECTIONS.RIGHT_DOWN:
                this.moveSkierRightDown();
                break;
			case Constants.SKIER_DIRECTIONS.JUMP:
				this.jumpSkier();
				break;
        }
    }

    moveSkierLeft() {
        this.x -= Constants.SKIER_STARTING_SPEED;
    }

    moveSkierLeftDown() {
        this.x -= this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierDown() {
        this.y += this.speed;
    }

    moveSkierRightDown() {
        this.x += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierRight() {
        this.x += Constants.SKIER_STARTING_SPEED;
    }

    moveSkierUp() {
        this.y -= Constants.SKIER_STARTING_SPEED;
    }

	jumpSkier() {
		if ( this.jumpAnimationCtrl.isCompleted ) {
			return this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
		}
		this.moveSkierDown();
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
            return this.moveSkierLeft();
        }
        
		this.setDirection(this.direction - 1);
    }

    turnRight() {

		if ( this.isJumping() ) {
			return;
		}

		this.checkCrashState(Constants.SKIER_DIRECTIONS.RIGHT);

        if( this.direction === Constants.SKIER_DIRECTIONS.RIGHT ) {
            return this.moveSkierRight();
        }

		this.setDirection(this.direction + 1);
    }

    turnUp() {
        if(this.direction === Constants.SKIER_DIRECTIONS.LEFT || this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierUp();
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

		const createBounds = (pos, asset, bottomReducer) => new Rect(
			pos.x - asset.width / 2,
			pos.y - asset.height / 2,
			pos.x + asset.width / 2,
			pos.y - (bottomReducer||0)
        );

        const asset = assetManager.getAsset(this.assetName);
		
		const skierBounds = createBounds(this, asset, asset.height / 4);

        const collision = obstacleManager.getObstacles().find((obstacle) => {

			if ( this.isJumping() && this.canJump(obstacle.getAssetName()) ) {
				return false;
			}
			
            const obstacleAsset = assetManager.getAsset(obstacle.getAssetName());
            const obstacleBounds = createBounds(obstacle.getPosition(), obstacleAsset);

            return intersectTwoRects(skierBounds, obstacleBounds);
        });
        
		if(collision) {
			this.handleCollision(collision);
        }
    };
}
