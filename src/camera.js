const CAMERA_SPEED = 2;

/**
 * map - instance of GameMap
 */
class Camera {
  constructor(map, width, height) {
    this.x = width/2;
    this.y = height/2;
    this.width = width;
    this.height = height;
    this.speed = CAMERA_SPEED;
    this.stop = {
      right: false,
      left: false,
      up: false,
      down: false
    };
    this.maxX = map.cols * map.size - width;
    this.maxY = map.rows * map.size - height;
  }

  moveRight() {
    if (!this.stop.right) {
      this.x += CAMERA_SPEED;
    }
  }

  moveLeft() {
    if (!this.stop.left) {
      this.x -= CAMERA_SPEED;
    }
  }

  moveUp() {
    if (!this.stop.up) {
      this.y -= CAMERA_SPEED;
    }
  }

  moveDown() {
    if (!this.stop.down) {
      this.y += CAMERA_SPEED;
    }
  }

  reset() {
    this.stop.right = false;
    this.stop.left = false;
    this.stop.up = false;
    this.stop.down = false;
  }

  isIdle() {
    return this._idle;
  }

}

export default Camera;