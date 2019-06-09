import { Entity } from "./Entity";
import { intersectTwoRects, Rect } from "../Core/Utils";

export class Persona extends Entity {

	checkIfHitObstacle(obstacleManager, assetManager) {

		const createBounds = (pos, asset, bottomReducer) => new Rect(
			pos.x - asset.width / 2,
			pos.y - asset.height / 2,
			pos.x + asset.width / 2,
			pos.y - (bottomReducer||0)
        );

        const asset = assetManager.getAsset(this.assetName);
		
		const skierBounds = createBounds(this, asset, asset.height / 4);

        const collision = obstacleManager.getObstacles().find((obstacle) => {
            
			const obstacleAsset = assetManager.getAsset(obstacle.getAssetName());
            const obstacleBounds = createBounds(obstacle.getPosition(), obstacleAsset);
            
			return intersectTwoRects(skierBounds, obstacleBounds);
        });

		return collision;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    moveDown() {
        this.y += this.speed;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveUp() {
        this.y -= this.speed;
    }
}
