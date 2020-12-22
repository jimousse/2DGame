import { ImageLoader, StateHandler, MultiMixins } from '../mixins/index.js';

export default class Cat extends MultiMixins([ ImageLoader, StateHandler ]) {
	constructor(assetInfo) {
		super(assetInfo);
		this.width = assetInfo.size;
		this.height =  assetInfo.size;
	}

	update() {
		this._updateState('idle_down');
	}
}