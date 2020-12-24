/**
 * Mixin that contains the common collision detection
 * methods.
 * this._pointCollision is specific to the class using this mixin.
 * For instance:
 * - npc: _pointCollision = is within npc boundary
 * - map: _pointCollision = is within any of the obstacle of the map
 * @param {*} base - base class to extent
 */
const CollisionDetector = base => {
	return class extends base {
		constructor(config) {
			super(config);
		}

		/**
		 * Checks whether points of a segment
		 * collides with obstacles using _pointDetection
		 * Loops along the constant coordinate
		 * @param {*} constantCoord
		 * @param {*} startCoord
		 * @param {*} length
		 * @param {*} isHorizontal
		 */
		_segmentCollision(constantCoord, startCoord, length, isHorizontal) {
			let collision = false;
			let increment = 1; // in px
			for(let i = startCoord; i < startCoord + length ; i+= increment) {
				collision = collision ||
					(isHorizontal ? this._pointCollision(i, constantCoord) : this._pointCollision(constantCoord, i));
			}
			return collision;
		}

		/**
		 * Detects whether a foreign object defined by a rect:
		 * (x,y) is the top left corner and width and wight

		 						foreign object
			(x,y) ->  +-----------+ <- (x + width, y)
								|           |
								|           |
								|           |
								+-----------+ <- (x + width, y + height)
								 <- width ->

		 * has one of its four side colliding with one of the obtacle
		 * @param {*} x
		 * @param {*} y
		 * @param {*} width
		 * @param {*} height
		 * @param {*} offset
		 */
		collision( x, y, width, height, offset ) {
			// right
			const constantXRight = x + width + offset;
			const right = this._segmentCollision(constantXRight, y, height, false);

			// left
			const constantXLeft = x - offset;
			const left = this._segmentCollision(constantXLeft, y, height, false);

			// top
			const constantYTop = y - offset;
			const top = this._segmentCollision(constantYTop, x, width, true);

			// bottom
			const constantYBottom = y + height + offset;
			const bottom = this._segmentCollision(constantYBottom, x, width, true);

			return { left, right, top, bottom };
		}
	};
};

export default CollisionDetector;