import { ImageLoader,StateHandler, MultiMixins } from '../mixins/index.js';
import { COIN } from './asset-info.js';

export default class Coin extends MultiMixins([ ImageLoader, StateHandler ]) {
	constructor() {
		super(COIN);
		this.size = COIN.size;
	}

	updateCoin() {
		this._updateState('rotate');
	}
}