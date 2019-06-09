import * as Constants from "../Constants";
import { AssetManager } from "./AssetManager";
import { Canvas } from './Canvas';
import { Text } from "./Text";
import { Skier } from "../Entities/Skier";
import { Rhino } from "../Entities/Rhino";
import { ObstacleManager } from "../Entities/Obstacles/ObstacleManager";
import { Rect } from './Utils';

export class Game {
    
	gameWindow = null;
	rhino = null;

	gameOver = null;
	paused = null;
    
	constructor(canvas) {
        this.assetManager = new AssetManager();
        this.canvas = canvas||new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
        this.obstacleManager = new ObstacleManager();
		this.score = new Text("30px Verdana", "#C70039", "right");
		this.gameOverMessage = new Text("40px Courier", "#1B2631", "center", "GAME OVER");
		this.pausedMessage = new Text("40px Courier", "#1B2631", "center", "PAUSE");

		this.startGame();

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

	startGame() {
		this.gameOver = false;
		this.paused = false;
        this.skier = new Skier(0, 0);
		this.rhino = null;
	}

    init() {
        this.obstacleManager.placeInitialObstacles();
    }

    async load() {
        await this.assetManager.loadAssets(Constants.ASSETS);
    }

	pauseRestart() {
		if ( this.gameOver ) {
			return this.startGame();
		}
		this.paused = !this.paused;
	}

	isRunning() {
		return !this.paused && !this.gameOver;
	}

    run() {
        
		this.canvas.clearCanvas();
        this.updateGameWindow();
        this.drawGameWindow();

		if ( this.isSkierCaught() ) {
			this.gameOver = true;
		}

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
		
		if ( this.gameOver ) {
			this.rhino.eat();
		}

		if ( ! this.isRunning() ) {
			return;
		}

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
		this.score.draw(this.canvas, this.skier.skiingDistance);

		if ( this.gameOver ) {
			this.gameOverMessage.draw(this.canvas);
		}

		if ( this.paused && ! this.gameOver ) {
			this.pausedMessage.draw(this.canvas);
		}
    }

    calculateGameWindow() {
        const skierPosition = this.skier.getPosition();
        const left = skierPosition.x - (Constants.GAME_WIDTH / 2);
        const top = skierPosition.y - (Constants.GAME_HEIGHT / 2);

        this.gameWindow = new Rect(left, top, left + Constants.GAME_WIDTH, top + Constants.GAME_HEIGHT);
    }

    handleKeyDown(event) {
		
		if ( event.which === Constants.KEYS.ENTER ) {
			this.pauseRestart();
			event.preventDefault();
		}

		if ( ! this.isRunning() ) {
			return;
		}

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
