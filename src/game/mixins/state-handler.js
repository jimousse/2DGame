import FrameAnimator from '../utils/frame-animator';

const StateHandler = base => {
  return class extends base {
    constructor(assetInfo) {
      super(assetInfo);
      this._moveSequences = assetInfo.moveSequences;
      this._actions = Object.keys(assetInfo.moveSequences);
      this._init();
      this._timer = 0;
      this._delay = assetInfo.delay;
      this._frameAnimator = new FrameAnimator(assetInfo, this._state);
    }

    _init() {
      this._state = {
        action: this._actions[0],
        actionSequenceIndex: {}
      };
      this._actions.forEach(action => {
        this._state.actionSequenceIndex[action] = 0;
      });
    }

    _updateState(newAction) {
      if (this._state.action !== newAction) {
        // if new action, we reset the timer
        this._timer = 0;
        // update current action
        this._state.action = newAction;
      }
      const sequenceLen = this._moveSequences[newAction].length;
      // timer is up => go to the next frame from the sequence
      if (this._timer >= this._delay) {
        this._timer = 0;
        // increment the current action
        this._state.actionSequenceIndex[newAction] = (this._state.actionSequenceIndex[newAction] + 1) % sequenceLen;
      }
      this._timer++;
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
  };
};

export default StateHandler;