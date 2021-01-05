const CAMERA_SPEED = 5;

/**
 * map - instance of GameMap
 */
class Camera {
  constructor(width, height, x, y) {
    this.x = x;
    this.y = y;
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
    this.x += 1;
  }

  moveLeft() {
    if (this.stop.left) return;
    this.x -= 1;
  }

  moveUp() {
    if (this.stop.up) return;
    this.y -= 1;
  }

  moveDown() {
    if (this.stop.down) return;
    this.y += 1;
  }

  reset() {
    this.stop.right = false;
    this.stop.left = false;
    this.stop.up = false;
    this.stop.down = false;
  }
}

export default Camera;