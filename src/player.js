import { ACTIONS } from './constants.js';
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

export default class Player {
	constructor(size, camera, map) {
		this.screenX = camera.width/2 - size;
		this.screenY = camera.height/2 - size;
		this.camera = camera;
		this.map = map;
		this.width = size;
		this.height =  size;
		this._init();
	}

	update() {
		this.x = this.screenX + this.camera.x;
		this.y = this.screenY + this.camera.y;
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

	getScreenCoordinate() {
		return {
			x: this.x - this.camera.x,
			y: this.y - this.camera.y
		};
	}

	_init() {
		this._state = {
			action: IDLE_DOWN.name,
			actionSequenceIndex: {}
		};
		for (const action of Object.values(ACTIONS)) {
			this._state.actionSequenceIndex[action.name] = 0;
		}
		this.x = this.screenX + this.camera.x;
		this.y = this.screenY + this.camera.y;
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