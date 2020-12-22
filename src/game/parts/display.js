import Ocean from './ocean.js';

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
    this._ocean = new Ocean();
    this._oceanImage = this._ocean.getImage();
  }

  drawPlayer({ image, frame, x, y, width, height }) {
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
    this._ocean.updateWave();
    this.buffer.drawImage(
      this._oceanImage, // image
      ...this._ocean.getCurrentFrame(),
      x, // target x
      y, // target y
      this._tileSize, // target width
      this._tileSize // target height
    );
  }

  drawMap(layer) {
    const startCol = Math.floor(this.camera.x / this._tileSize);
    const endCol = startCol + Math.floor(this.camera.width / this._tileSize) + 1;
    const startRow = Math.floor(this.camera.y / this._tileSize);
    const endRow = startRow + Math.floor(this.camera.height / this._tileSize) + 1;

    for (let col = startCol; col <= endCol; col++) {
      for (let row = startRow; row <= endRow; row++) {
        var x = Math.floor(col * this._tileSize - this.camera.x);
        var y = Math.floor(row * this._tileSize - this.camera.y);
        const currentTile = this._map.getTile(layer, col, row);
        if (currentTile === 0) continue;
        if (currentTile === 6) { // ocean
          this._drawOcean(x, y);
      } else {
        this.buffer.drawImage(
          this._mapImage, // image
          (currentTile - 1) * this._tileSize, // source x
          0, // source y
          this._tileSize, // source width
          this._tileSize, // source height
          x, // target x
          y, // target y
          this._tileSize, // target width
          this._tileSize // target height
        );
      }

      }
    }
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