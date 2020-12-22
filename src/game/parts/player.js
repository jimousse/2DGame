import { ImageLoader, StateHandler, MultiMixins } from '../mixins/index.js';

export default class Player extends MultiMixins([ ImageLoader, StateHandler ]) {
	constructor(assetInfo) {
		super(assetInfo);
		this.width = assetInfo.size;
		this.height =  assetInfo.size;
	}


	moveRight() {
		this._updateState('walk_right');
	}

	moveLeft() {
		this._updateState('walk_left');
	}

	moveUp() {
		this._updateState('walk_up');
	}

	moveDown() {
		this._updateState('walk_down');
	}

	face(direction) {
		return this._state.action.indexOf(direction) >=0;
	}

	setIdle() {
		if (this.face('right')) this._updateState('idle_right');
		if (this.face('left')) this._updateState('idle_left');
		if (this.face('up')) this._updateState('idle_up');
		if (this.face('down')) this._updateState('idle_down');
	}
}