import FrameAnimator from './frame-animator.js';
import { ImageLoader } from '../mixins/index.js';
import { OCEAN } from './asset-info.js';

export default class Ocean extends ImageLoader {
	constructor() {
		super(OCEAN.src);
    this._waveSequenceLength = OCEAN.moveSequences.wave.length;
		this._frameAnimator = new FrameAnimator(OCEAN, { action: 'wave' });
	}

	getCurrentFrame() {
		const randomFrameIndex = Math.floor(Math.random()*this._waveSequenceLength);
		return this._frameAnimator.getCurrentFrame('wave', randomFrameIndex);
	}
}