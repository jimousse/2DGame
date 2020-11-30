class Controller {
  constructor() {
    this.left = { active: false, down: false };
    this.right = { active: false, down: false };
    this.up = { active: false, down: false };
    this.down = { active: false, down: false };
    this.plug();
  }

  setKeyDown({ type, keyCode }) {
    const isKeyDown = type === 'keydown';
    switch (keyCode) {
      case 37: // left
        this.left.down = isKeyDown;
        break;
      case 38: // up
        this.up.down = isKeyDown;
        break;
      case 39: // right
        this.right.down = isKeyDown;
        break;
      case 40: // down
        this.down.down = isKeyDown;
        break;
    }
  }

  isLeftActive() {
    return this.left.down;
  }

  isRightActive() {
    return this.right.down;
  }

  isUpActive() {
    return this.up.down;
  }

  isDownActive() {
    return this.down.down;
  }

  isIdle() {
    return !this.isDownActive() && !this.isUpActive() && !this.isRightActive() && !this.isLeftActive();
  }

  plug() {
    window.addEventListener('keydown', this.setKeyDown.bind(this));
    window.addEventListener('keyup', this.setKeyDown.bind(this));
  }
}

export default Controller;