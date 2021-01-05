import { ImageLoader, MultiMixins, CollisionDetector } from '../mixins/index.js';

const BORDER_CONTENT = 6;

class GameMap extends MultiMixins([ ImageLoader, CollisionDetector ]) {
	constructor(assetInfo, cameraWidth, cameraHeight) {
		super(assetInfo);
		for (const [ prop, value ] of Object.entries(assetInfo)) {
			if (value === undefined) continue;
			this[prop] = value;
		}
		this.borderLength = Math.ceil(Math.max(cameraHeight, cameraWidth) / (2*assetInfo.size));
		this._buildCompleteMap();
		this._buildColisionMap();
	}

	getTile(layer = 0, col, row) {
		return this.layers[layer][row * this.cols + col];
	}

	get width() {
		return this.size * this.rows;
	}

	get height() {
		return this.size * this.cols;
	}

	/**
	 * Builds the full map, a square of tiles, which includes:
	 * - the playable area in the center
	 * - a border, non playable around the playable area
	 */
	_buildCompleteMap() {
		this._buildBottomLayer();
		this._buildTopLayer();
	}

		/**
	 * Builds the full map, a square of tiles, which includes:
	 * - the playable area in the center
	 * - a border, non playable around the playable area
	 */
	_buildBottomLayer() {
		this.entireMapOfKeys = this._addBorder(this.playableAreaKeys, this.rows, this.cols, this.borderLength, this.elements.ocean.key);
		const mapWithTileIndices = this.entireMapOfKeys.map(key => {
			const mapElement = Object.values(this.elements).filter(e => e.key === key)[0];
			return mapElement.layers[0];
		});
		// add border
		this.layers = [ mapWithTileIndices ];
		this.rows = this.rows + 2 * this.borderLength; // new number of rows of the full map
		this.cols = this.cols + 2 * this.borderLength; // new number of columns of the full map
	}


	/**
	 * Completes the map with the top layers for elements
	 * that have 2 stacked layers
	 * Also keeps track of the grass positions for later use in the Game class.
	 */
	_buildTopLayer() {
		let topLayer = new Array(this.rows*this.cols).fill(0);
		this.grassPositions = [];
		this.entireMapOfKeys.forEach((key, i) => {
			const element = Object.values(this.elements).filter(el => key === el.key)[0];
			if (key === this.elements.grass.key) {
				this.grassPositions.push([
					Math.floor(i / this.rows) * this.size, // x
					(i % this.rows) * this.size
				]);
			}

			// tile above the current tile on the top layer
			if (element.top) {
				topLayer[i - this.rows] = element.top;
			}
			// same tile index on top layer
			if (element.layers.length > 1) {
				topLayer[i] = element.layers[1];
			}
		});
		this.layers[1] = topLayer;
	}


	/**
	 * Builds an array that contain the same number of elements
	 * as the map this.layer[0] and this.layer[1].
	 * Filled with 0s and 1s.
	 * 0 means no collision
	 * 1 means collision
	 */
	_buildColisionMap() {
		this._collisionMap = this.entireMapOfKeys.map(e => {
			if (this.obstacles.has(e)) return  1;
			return 0;
		});
	}

	/**
	 * Returns true if the point (x,y) belongs to a tile
	 * marked as an obstacle on the map. false otherwise.
	 * @param {*} x
	 * @param {*} y
	 */
	_pointCollision(x, y) {
		const col = Math.floor(x / this.size);
		const row = Math.floor(y / this.size);
		const isObstacle = Boolean(this._collisionMap[row * this.cols + col]);
		if (isObstacle) {
			const obstacle = {
				x: col*this.size,
				y: row*this.size,
				width: this.size,
				height: this.size
			};
			const offset = 2;
			const collision =  x >= (obstacle.x + offset) &&
			x <= (obstacle.x + obstacle.width - offset) &&
			y >= (obstacle.y + offset) &&
			y <= (obstacle.y + obstacle.height - offset);
			return collision;
		} else {
			return false;
		}
	}

	/**
	 * Logs an array in the shape of a square
	 * @param {*} game - array of numbers
	 * @param {*} numOfRows - number of rows of the square to print
	 */
	_prettyPrint(game, numOfRows) {
		let prettyString = '\n';
		let i = 0;
		game.forEach(e => {
			if (i === numOfRows) {
				prettyString += '\n';
				i = 0;
			}
			prettyString += String(e) + '  ';
			i++;
		});
		prettyString += '\n';
	}


	/**
	 * This method takes a square of tiles that is represented by an array of numbers
	 * and returns a bigger array that is the first one with extra rows and columns around.
	 *
	 * Example:
	 *
	 * playableGame:
	 * [
	 *  1, 1, 1,
	 *  1, 1, 1,
	 *  1, 1, 1
	 * ]
	 * numRows = numCols = 3 (dimension of playableGame)
	 * borderLen = 2
	 * fillNumber = 9
	 *
	 * output:
	 * [
	 *  9, 9, 9, 9, 9, 9, 9
	 *  9, 9, 9, 9, 9, 9, 9
	 *  9, 9, 1, 1, 1, 9, 9
	 *  9, 9, 1, 1, 1, 9, 9
	 *  9, 9, 1, 1, 1, 9, 9
	 *  9, 9, 9, 9, 9, 9, 9
	 *  9, 9, 9, 9, 9, 9, 9
	 * ]
	 *
	 * the playableGame is surounded by 2 (=borderLen) rows/columns of 9 (fillNumber)
	 *
	 * @param {*} playableGame - array that represent the playable area
	 * @param {*} numRows - number of rows of the playable area
	 * @param {*} numCols - number of columns of the playable area
	 * @param {*} borderLen - the border width (in number of row/column) to add all around the playable area
	 * @param {*} fillNumber - the content of the border
	 */
	_addBorder(playableGame, numRows, numCols, borderLen, fillNumber) {
		let newGame = [];
		const newRowLen = numRows + 2*borderLen;
		const firstLine =  new Array(newRowLen).fill(fillNumber);
		for (let i=0; i<borderLen; i++) {
			 newGame = [ ...newGame, ...firstLine ];
		}
		for (let i=0; i < numRows; i++) {
			let newLine = [
				...(new Array(borderLen).fill(fillNumber)),
				...playableGame.slice(numCols*i, numCols*i + numRows),
				...(new Array(borderLen).fill(fillNumber))
			];
			newGame = [ ...newGame, ...newLine ];
		}
		for (let i=0; i<borderLen; i++) {
			 newGame = [ ...newGame, ...firstLine ];
		}
		return newGame;
	}
}

export default GameMap;