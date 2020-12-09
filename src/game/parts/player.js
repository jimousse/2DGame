import { ACTIONS } from './constants.js';
import FrameAnimator from './frame-animator.js';
import { ImageLoader } from '../mixins/index.js';
const {
	WALK_UP,
	WALK_DOWN,
	WALK_RIGHT,
	WALK_LEFT,
	IDLE_DOWN,
	IDLE_UP,
	IDLE_RIGHT,
	IDLE_LEFT
} = ACTIONS;

export default class Player extends ImageLoader {
	constructor(assetInfo) {
		super(assetInfo.src);
		this.width = assetInfo.size;
		this.height =  assetInfo.size;
		this._init();
		this._frameAnimator = new FrameAnimator(assetInfo, this._state);
	}


	moveRight() {
		this._updateState(WALK_RIGHT);
	}

	moveLeft() {
		this._updateState(WALK_LEFT);
	}

	moveUp() {
		this._updateState(WALK_UP);
	}

	moveDown() {
		this._updateState(WALK_DOWN);
	}

	_init() {
		this._state = {
			action: IDLE_DOWN.name,
			actionSequenceIndex: {}
		};
		for (const action of Object.values(ACTIONS)) {
			this._state.actionSequenceIndex[action.name] = 0;
		}
	}

	_updateState(currentAction) {
		// update current action
		this._state.action = currentAction.name;
		// increment the current action
		this._state.actionSequenceIndex[currentAction.name] = (this._state.actionSequenceIndex[currentAction.name] + 1) % currentAction.length;
		// reset action sequence index for other actions
		for (const action of Object.values(ACTIONS)) {
			if (action.name !== currentAction.name) {
				this._state.actionSequenceIndex[action.name] = 0;
			}
		}
	}

	getMoveState() {
		return {
			action: this._state.action,
			sequenceIndex: this._state.actionSequenceIndex[this._state.action]
		};
	}

	getCurrentFrame() {
		const { action, sequenceIndex } = this.getMoveState();
		return this._frameAnimator.getCurrentFrame(action, sequenceIndex);
	}

	face(direction) {
		return this._state.action.indexOf(direction) >=0;
	}

	setIdle() {
		if (this.face('right')) this._updateState(IDLE_RIGHT);
		if (this.face('left')) this._updateState(IDLE_LEFT);
		if (this.face('up')) this._updateState(IDLE_UP);
		if (this.face('down')) this._updateState(IDLE_DOWN);
	}
}