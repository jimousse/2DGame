import { ImageLoader, StateHandler, MultiMixins, CollisionDetector } from '../mixins/index.js';

export default class Player extends MultiMixins([ ImageLoader, StateHandler, CollisionDetector ]) {
	constructor(assetInfo) {
		super(assetInfo);
		this.width = assetInfo.size;
		this.height =  assetInfo.size;
	}

	_pointCollision(x, y) {
    return x >= this.x &&
    x <= this.x + this.width &&
    y >= this.y &&
    y <= this.y + this.height;
  }
}