import { ImageLoader,StateHandler, MultiMixins } from '../mixins/index.js';

export default class MovingElement extends MultiMixins([ ImageLoader, StateHandler ]) {
	constructor(asset) {
		super(asset);
		this.asset = asset;
		this.size = asset.size;
	}

	updateMovement() {
		this._updateState(this.asset.movement);
	}
}