export class AnimationCtrl {
    currentAsset = 0;
    timer = 0;

    constructor(assets, speed) {
        this.assets = assets;
		this.speed = speed;
    }
	
	next() {
		if ( ! this.isCompleted ) {
			this.currentAsset++;
		}
	}
	
	shouldAnimate() {
		return this.timer++ >= this.speed;
	}
	
	reset() {
		this.timer = 0;
		this.currentAsset = 0;
	}
	
	get isCompleted() {
		return this.currentAsset === ( this.assets.length - 1);
	}
	
	get asset() {
		if (  this.shouldAnimate() ) {
			this.timer = 0;
			this.next();
		}
		return this.assets[this.currentAsset];
	}
}	
