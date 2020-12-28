const CAMERA_SPEED = 3;

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
    this.x += this.speed;
  }

  moveLeft() {
    if (this.stop.left) return;
    this.x -= this.speed;
  }

  moveUp() {
    if (this.stop.up) return;
    this.y -= this.speed;
  }

  moveDown() {
    if (this.stop.down) return;
    this.y += this.speed;
  }

  reset() {
    this.stop.right = false;
    this.stop.left = false;
    this.stop.up = false;
    this.stop.down = false;
  }
}

export default Camera;