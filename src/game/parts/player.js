import { ImageLoader, StateHandler, MultiMixins, CollisionDetector } from '../mixins/index.js';

export default class Player extends MultiMixins([ ImageLoader, StateHandler, CollisionDetector ]) {
	constructor(assetInfo, camera) {
		super(assetInfo);
		this.camera = camera;
		this.width = (assetInfo.width || assetInfo.size);
		this.height =  (assetInfo.height || assetInfo.size);
		this.coinsCollected = 0;
	}

	get screenX() {
		return this._screenX;
	}

	set screenX(value) {
		this._screenX = value;
		this.x = value + this.camera.x;
	}


	get screenY() {
		return this._screenY;
	}

	set screenY(value) {
		this._screenY = value;
		this.y = value + this.camera.y;
	}

	/**
	 * x and y are the coordinates in the game
	 * screenX and screenY are the coordinates on the screen
	 */
	update() {
		this.x = this._screenX + this.camera.x;
		this.y = this._screenY + this.camera.y;
	}

	getDisplayInfo() {
		return {
			image: this.getImage(),
			frame: this.getCurrentFrame(),
			x: this._screenX,
			y: this._screenY,
			width: this.width,
			height: this.height
		};
	}

	_pointCollision(x, y) {
		const offset = 5;
    return x >= (this.x + offset) &&
    x <= (this.x + this.width - offset) &&
    y >= (this.y + offset) &&
    y <= (this.y + this.height - offset);
  }
}