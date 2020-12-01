const CAMERA_SPEED = 2;

/**
 * map - instance of GameMap
 */
class Camera {
  constructor(width, height) {
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
  }

  moveRight() {
    if (this.stop.right) return;
    this.x += CAMERA_SPEED;
  }

  moveLeft() {
    if (this.stop.left) return;
    this.x -= CAMERA_SPEED;
  }

  moveUp() {
    if (this.stop.up) return;
    this.y -= CAMERA_SPEED;
  }

  moveDown() {
    if (this.stop.down) return;
    this.y += CAMERA_SPEED;
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