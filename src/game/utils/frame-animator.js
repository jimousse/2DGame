class FrameAnimator {
  constructor(assetInfo, initialState) {
    for (const [ prop, value ] of Object.entries(assetInfo)) {
      if (value === undefined) continue;
      this[prop] = value;
    }
    this._frameSets = this._createFrameSets();
  }

  _getTile([ row, col ]) {
    const width = this.width || this.size;
    const height = this.height || this.size;
    return [
      col*width, // x
      row*height, // y
      width, // width
      height // height
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
    return this._frameSets[action][sequenceIndex];
  }
}

export default FrameAnimator;