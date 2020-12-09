class Display {
  constructor(canvas, map, camera, canvasWidth, canvasHeight) {
    this.buffer  = document.createElement('canvas').getContext('2d'),
    this.context = canvas.getContext('2d');
    this._map = map;
    this.camera = camera;
    this.buffer.canvas.width = canvasWidth;
    this.buffer.canvas.height = canvasHeight;
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

  drawMap(layer) {
    const image = this._map.getImage();
    const tileSize = this._map.size;
    const startCol = Math.floor(this.camera.x / tileSize);
    const endCol = startCol + Math.floor(this.camera.width / tileSize) + 1;
    const startRow = Math.floor(this.camera.y / tileSize);
    const endRow = startRow + Math.floor(this.camera.height / tileSize) + 1;

    for (let col = startCol; col <= endCol; col++) {
      for (let row = startRow; row <= endRow; row++) {
        var x = col * tileSize - this.camera.x;
        var y = row * tileSize - this.camera.y;
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

  set map(value) {
    this._map = value;
  }

}

export default Display;