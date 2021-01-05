import MovingElement from './moving-element.js';
import { OCEAN, COIN } from './asset-info.js';

class Display {
  constructor(canvas, map, camera, canvasWidth, canvasHeight) {
    this.context = canvas.getContext('2d');
    this._map = map;
    this.camera = camera;
    this._init();
    this._createBufferCanvas(canvasWidth, canvasHeight);
  }

  /**
   * Creates an offscreen canvas where elements will be drawn
   * one after the other, before rendering the whole thing on the
   * onscreen canvas
   * @param {*} width
   * @param {*} height
   */
  _createBufferCanvas(width, height) {
    this.buffer  = document.createElement('canvas').getContext('2d'),
    this.buffer.canvas.width = width;
    this.buffer.canvas.height = height;
  }

  _init() {
    this._mapImage = this._map.getImage();
    this._tileSize = this._map.size;
    this._ocean = new MovingElement(OCEAN);
    this._coin = new MovingElement(COIN);
  }

  drawCharacters(players) {
    for (const player of players) {
      this.drawCharacter(player);
    }
  }

  drawCharacter({ image, frame, x, y, width, height }) {
    // this.buffer.fillStyle = 'red';
    // this.buffer.fillRect(
    //   x,
    //   y,
    //   width,
    //   height
    // );
    this.buffer.drawImage(
      image,
      ...frame,
      x,
      y,
      width,
      height
    );
  }

  _drawOcean(x, y) {
    // this._ocean.updateMovement();
    this.buffer.drawImage(
      this._ocean.getImage(), // image
      ...this._ocean.getCurrentFrame(),
      x, // target x
      y, // target y
      this._tileSize, // target width
      this._tileSize // target height
    );
  }

  _drawCoin(x, y) {
    // this._coin.updateMovement();
    this.buffer.drawImage(
      this._coin.getImage(), // image
      ...this._coin.getCurrentFrame(),
      (this._tileSize/2 - this._coin.size/2 + x), // target x
      (this._tileSize/2 - this._coin.size/2 + y), // target y
      this._coin.size, // target width
      this._coin.size // target height
    );
  }


  drawMap(layer) {
    this._ocean.updateMovement();
    this._coin.updateMovement();
    const startCol = Math.floor(this.camera.x / this._tileSize);
    const endCol = startCol + Math.floor(this.camera.width / this._tileSize) + 1;
    const startRow = Math.floor(this.camera.y / this._tileSize);
    const endRow = startRow + Math.floor(this.camera.height / this._tileSize) + 1;
    for (let col = startCol; col <= endCol; col++) {
      for (let row = startRow; row <= endRow; row++) {
        var x = Math.floor(col * this._tileSize - this.camera.x);
        var y = Math.floor(row * this._tileSize - this.camera.y);
        const currentTile = this._map.getTile(layer, col, row);
        switch (currentTile) {
          case this._map.uniqueIndices.ocean:
            this._drawOcean(x, y);
            break;
          case this._map.uniqueIndices.coin:
            this._drawCoin(x, y);
            break;
          default:
            this._drawMapElement(currentTile, x, y);
            break;
        }
      }
    }
  }

  _drawMapElement(tileIndex, x, y) {
    this.buffer.drawImage(
      this._mapImage, // image
      (tileIndex - 1) * this._tileSize, // source x
      0, // source y
      this._tileSize, // source width
      this._tileSize, // source height
      x, // target x
      y, // target y
      this._tileSize, // target width
      this._tileSize // target height
    );
  }

  render() {
    this.context.drawImage(
      this.buffer.canvas,
      0,
      0,
      this.buffer.canvas.width,
      this.buffer.canvas.height,
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    );
  }
}

export default Display;