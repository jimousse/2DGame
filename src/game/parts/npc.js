  import Player from './player.js';
import { MultiMixins, CollisionDetector } from '../mixins/index.js';


const CAT_SPEED = 0;
class NPC extends MultiMixins([ CollisionDetector ]) {
  constructor({
    coord,
    assetInfo,
    camera,
    dialog
  } = {}) {
    super();
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

  moveDown() {
    this._instance.moveDown();
    this._updateCoordinates();
  }

  moveUp() {
    this._instance.moveUp();
    this._updateCoordinates();
  }

  moveRight() {
    this._instance.moveRight();
    this._updateCoordinates();
  }

  moveLeft() {
    this._instance.moveLeft();
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