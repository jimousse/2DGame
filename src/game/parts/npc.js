class NPC {
  constructor({
    Klass,
    coord,
    assetInfo
  } = {}) {
    this._instance = new Klass(assetInfo);
    this.coordinates = coord;
    this._width = this._instance.width;
    this._height = this._instance.height;
  }

  update() {
    this._instance.update();
  }

  getDisplayInfo() {
    return {
			image: this._instance.getImage(),
			frame: this._instance.getCurrentFrame(),
			x: this.coordinates.screenX,
			y: this.coordinates.screenY,
			width: this._width,
			height: this._height
		};
  }

  collision(x, y) {
    return x >= this.coordinates.x &&
    x <= this.coordinates.x + this._width &&
    y >= this.coordinates.y &&
    y <= this.coordinates.y + this._height;
  }
}

export default NPC;