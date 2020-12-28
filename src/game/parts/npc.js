  import Player from './player.js';

class NPC extends Player {
  constructor({
    assetInfo,
    camera,
    dialog
  } = {}) {
    super(assetInfo, camera);
    this.dialog = dialog;
  }

  keepImmobile(direction) {
    switch (direction) {
      case 'up':
        if (!this.camera.stop.up) {
          this.screenY += this.camera.speed;
        }
        break;
      case 'down':
        if (!this.camera.stop.down) {
          this.screenY -= this.camera.speed;
        }
        break;
      case 'right':
        if (!this.camera.stop.right) {
          this.screenX -= this.camera.speed;
        }
        break;
      case 'left':
        if (!this.camera.stop.left) {
          this.screenX += this.camera.speed;
        }
        break;
      default:
        break;
    }
  }
}

export default NPC;