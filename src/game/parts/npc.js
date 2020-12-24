import Player from './player.js';
import { MultiMixins, CollisionDetector } from '../mixins/index.js';
class NPC extends MultiMixins([ CollisionDetector ]) {
  constructor({
    coord,
    assetInfo,
    camera,
    speed,
    dialog
  } = {}) {
    super();
    this.speed = speed;
    this.dialog = dialog,
    this.camera = camera,
    this._instance = new Player(assetInfo);
    this.coordinates = coord;
    this.width = this._instance.width;
    this.height = this._instance.height;
  }

  _updateCoordinates() {
    this.coordinates.x = this.coordinates.screenX + this.camera.x;
		this.coordinates.y = this.coordinates.screenY + this.camera.y;
  }

  update(direction = 'idle_down') {
    this._updateCoordinates();
    this._instance._updateState(direction);
  }

  stop() {
    this._instance.moveDown();
    this.setIdle();
    return;
  }

  moveDown() {
    this._instance.moveDown();
    this.coordinates.screenY += this.speed;
    this._updateCoordinates();
  }

  moveUp() {
    this._instance.moveUp();
    this.coordinates.screenY -= this.speed;
    this._updateCoordinates();
  }

  moveRight() {
    this._instance.moveRight();
    this.coordinates.screenX += this.speed;
    this._updateCoordinates();
  }

  moveLeft() {
    this._instance.moveLeft();
    this.coordinates.screenX -= this.speed;
    this._updateCoordinates();
  }

  setIdle() {
    this._instance.setIdle();
  }

  getDisplayInfo() {
    return {
			image: this._instance.getImage(),
			frame: this._instance.getCurrentFrame(),
			x: this.coordinates.screenX,
			y: this.coordinates.screenY,
			width: this.width,
			height: this.height
		};
  }

  _pointCollision(x, y) {
    return x >= this.coordinates.x &&
    x <= this.coordinates.x + this.width &&
    y >= this.coordinates.y &&
    y <= this.coordinates.y + this.height;
  }
}

export default NPC;