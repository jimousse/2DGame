import { ImageLoader } from './mixins/index.js';


const DELAY = 7;
export class PlayerAnimator extends ImageLoader {
  constructor({ src, positions, initPlayerState, ...rest }) {
    super({ src });
    this.positions = positions;
    for (const [ prop, value ] of Object.entries(rest)) {
      if (value === undefined) continue;
      this[prop] = value;
    }
    this._createFrameSets();
    this._currentFrame = this._frameSets[initPlayerState.action][0];
    this._count = 0;
    this._delay = DELAY;
  }

  _createFrameSets() {
    this._frameSets = {};
    for (const [ move, sequence ] of Object.entries(this.moveSequences)) {
      this._frameSets[move] = sequence.map(this.getTile.bind(this));
    }
  }

  getCurrentFrame(action, sequenceIndex) {
    if (this._count >= this._delay) {
      this._count = 0;
      this._currentFrame =  this._frameSets[action][sequenceIndex];
    }
    this._count++;
    return this._currentFrame;
  }

  getTile([ row, col ]) {
    return [
      col*this.tsize, // x
      row*this.tsize, // y
      this.tsize, // width
      this.tsize // height
    ];
  }
}