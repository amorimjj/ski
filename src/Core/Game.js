import * as Constants from "../Constants";
import { AssetManager } from "./AssetManager";
import { Canvas } from './Canvas';
import { Skier } from "../Entities/Skier";
import { Rhino } from "../Entities/Rhino";
import { ObstacleManager } from "../Entities/Obstacles/ObstacleManager";
import { Rect } from './Utils';

export class Game {
    gameWindow = null;
	rhino = null;

    constructor(canvas) {
        this.assetManager = new AssetManager();
        this.canvas = canvas||new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
        this.skier = new Skier(0, 0);
        this.obstacleManager = new ObstacleManager();

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    init() {
        this.obstacleManager.placeInitialObstacles();
    }

    async load() {
        await this.assetManager.loadAssets(Constants.ASSETS);
    }

    run() {
        this.canvas.clearCanvas();

        this.updateGameWindow();
        this.drawGameWindow();

        requestAnimationFrame(this.run.bind(this));
    }

	createRhino() {
		this.rhino = new Rhino(this.skier.x, this.skier.y - Constants.RHINO_STARTING_DIFERENCE_POSITION);
	}

	startRhinoChasing() {
		if ( ! this.isRhinoChasing() && this.skier.skiingDistance >= Constants.SKIER_DISTANCE_ADVANTAGE ) {
			this.createRhino();
		}
	}

	isRhinoChasing() {
		return this.rhino !== null;
	}

	isSkierCaught() {
		return this.isRhinoChasing() && this.rhino.caught(this.skier);
	}

    updateGameWindow() {

		this.startRhinoChasing();

		if ( this.isRhinoChasing() ) {
			this.rhino.chase(this.skier, this.obstacleManager, this.assetManager);
		}

        const previousGameWindow = this.gameWindow;
        this.calculateGameWindow();

        this.obstacleManager.placeNewObstacle(this.gameWindow, previousGameWindow);
		
		if ( ! this.isSkierCaught() ) {
        	this.skier.move();
        	this.skier.checkIfSkierHitObstacle(this.obstacleManager, this.assetManager);
		}
    }

    drawGameWindow() {
        this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top);

		if ( this.isRhinoChasing() ) {
			this.rhino.draw(this.canvas, this.assetManager);
		}
		
		if ( ! this.isSkierCaught() ) {
        	this.skier.draw(this.canvas, this.assetManager);
		}

        this.obstacleManager.drawObstacles(this.canvas, this.assetManager);
    }

    calculateGameWindow() {
        const skierPosition = this.skier.getPosition();
        const left = skierPosition.x - (Constants.GAME_WIDTH / 2);
        const top = skierPosition.y - (Constants.GAME_HEIGHT / 2);

        this.gameWindow = new Rect(left, top, left + Constants.GAME_WIDTH, top + Constants.GAME_HEIGHT);
    }

    handleKeyDown(event) {
        switch(event.which) {
            case Constants.KEYS.LEFT:
                this.skier.turnLeft();
                event.preventDefault();
                break;
            case Constants.KEYS.RIGHT:
                this.skier.turnRight();
                event.preventDefault();
                break;
            case Constants.KEYS.UP:
                this.skier.turnUp();
                event.preventDefault();
                break;
            case Constants.KEYS.DOWN:
                this.skier.turnDown();
                event.preventDefault();
                break;
			case Constants.KEYS.SPACE:
				this.skier.jump();
				event.preventDefault();
				break;
        }
    }
}
