import { ImageLoader,StateHandler, MultiMixins } from '../mixins/index.js';
import { OCEAN } from './asset-info.js';

export default class Ocean extends MultiMixins([ ImageLoader, StateHandler ]) {
	constructor() {
		super(OCEAN);
		this.size = OCEAN.size;
	}

	updateWave() {
		this._updateState('wave');
	}
}