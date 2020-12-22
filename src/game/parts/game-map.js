import { ImageLoader, MultiMixins } from '../mixins/index.js';

// the border length should be half of the camera size
const BORDER_LENGTH = 4;
const BORDER_CONTENT = 6;

class GameMap extends MultiMixins(ImageLoader) {
	constructor(params) {
		super(params);
		for (const [ prop, value ] of Object.entries(params)) {
			if (value === undefined) continue;
			this[prop] = value;
		}
		this._buildColisionMap();
		this._buildCompleteMap();
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
		this.layers = [ this._addBorder(this.playableArea, this.rows, this.cols, BORDER_LENGTH, BORDER_CONTENT) ];
		this.rows = this.rows + 2 * BORDER_LENGTH; // new number of rows of the full map
		this.cols = this.cols + 2 * BORDER_LENGTH; // new number of columns of the full map
		this._buildTopLayer();
	}

	_buildTopLayer() {
		const { tree_bottom, tree_top } = this.elements;
		let topLayer = new Array(this.rows*this.cols).fill(0);
		this.layers[0].forEach((tile, i) => {
			if (tile === tree_bottom) {
				topLayer[i - this.rows] = tree_top;
			}
		});
		this.layers[1] = topLayer;
	}

	_buildColisionMap() {
		let playableAreaCollisionMap = this.playableArea.map(e => {
			if (e === 3) return  1;
			return 0;
		});
		this._collisionMap = this._addBorder(playableAreaCollisionMap, this.rows, this.cols, BORDER_LENGTH, 1);
	}

	/**
	 * Returns true if the point (x,y) belongs to a tile
	 * marked as an obstacle on the map. false otherwise.
	 * @param {*} x
	 * @param {*} y
	 */
	collision(x, y) {
		const col = Math.floor(x / this.size);
		const row = Math.floor(y / this.size);
		return Boolean(this._collisionMap[row * this.cols + col]);
	}

	getElement(x,y) {
		const col = Math.floor(x / this.size);
		const row = Math.floor(y / this.size);
		return this.layers[0][row * this.cols + col];
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