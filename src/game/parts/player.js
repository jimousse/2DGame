import { ImageLoader, StateHandler, MultiMixins } from '../mixins/index.js';

export default class Player extends MultiMixins([ ImageLoader, StateHandler ]) {
	constructor(assetInfo) {
		super(assetInfo);
		this.width = assetInfo.size;
		this.height =  assetInfo.size;
	}
}