class FrameAnimator {
  constructor(assetInfo, initialState) {
    for (const [ prop, value ] of Object.entries(assetInfo)) {
      if (value === undefined) continue;
      this[prop] = value;
    }
    this._frameSets = this._createFrameSets();
    this._currentFrame = this._frameSets[initialState.action][0];
    this._count = 0;
    this._delay = assetInfo.delay;
  }

  _getTile([ row, col ]) {
    return [
      col*this.size, // x
      row*this.size, // y
      this.size, // width
      this.size // height
    ];
  }

  _createFrameSets() {
    const frameSets = {};
    for (const [ move, sequence ] of Object.entries(this.moveSequences)) {
      frameSets[move] = sequence.map(this._getTile.bind(this));
    }
    return frameSets;
  }

  getCurrentFrame(action, sequenceIndex) {
    if (this._count >= this._delay) {
      this._count = 0;
      this._currentFrame =  this._frameSets[action][sequenceIndex];
    }
    this._count++;
    return this._currentFrame;
  }
}

export default FrameAnimator;