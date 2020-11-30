class Display {
  constructor(canvas, map, camera, canvasWidth, canvasHeight) {
    this.buffer  = document.createElement('canvas').getContext('2d'),
    this.context = canvas.getContext('2d');
    this._map = map;
    this._width = canvasWidth;
    this.camera = camera;
    this._height = canvasHeight;
    this.buffer.canvas.width = canvasWidth;
    this.buffer.canvas.height = canvasHeight;
  }

  drawPlayer(image, tile, position) {
    this.buffer.drawImage(
      image,
      ...tile,
      position.x,
      position.y,
      position.width,
      position.height
    );
    this._render();
  }

  drawMap(layer) {
    const image = this._map.getImage();
    const tileSize = this._map.tsize;

    const startCol = Math.floor(this.camera.x / this._map.tsize);
    const endCol = startCol + Math.floor(this.camera.width / this._map.tsize) + 1;
    const startRow = Math.floor(this.camera.y / this._map.tsize);
    const endRow = startRow + Math.floor(this.camera.height / this._map.tsize) + 1;

    for (let col = startCol; col <= endCol; col++) {
      for (let row = startRow; row <= endRow; row++) {
        var x = col * this._map.tsize - this.camera.x;
        var y = row * this._map.tsize - this.camera.y;
        const currentTile = this._map.getTile(layer, col, row);
        if (currentTile === 0) continue;
        this.buffer.drawImage(
          image, // image
          (currentTile - 1) * tileSize, // source x
          0, // source y
          tileSize, // source width
          tileSize, // source height
          Math.floor(x), // target x
          Math.floor(y), // target y
          tileSize, // target width
          tileSize // target height
        );
      }
    }
    this._render();
  }


  resize() {
    const ratio = this._map.height / this._map.width;
    if (this._height / this._width > ratio) {
      this.context.canvas.height = this._width * ratio;
      this.context.canvas.width = this._width;
    } else {
      this.context.canvas.height = this._height;
      this.context.canvas.width = this._height / ratio;
    }
    this.context.imageSmoothingEnabled = true;
  }

  _render() {
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

  set map(value) {
    this._map = value;
  }

}

export default Display;