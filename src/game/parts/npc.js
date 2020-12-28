  import Player from './player.js';

class NPC extends Player {
  constructor({
    assetInfo,
    camera,
    ...rest
  } = {}) {
    super(assetInfo, camera);
    for (const [ prop, value ] of Object.entries(rest)) {
			if (value === undefined) continue;
			this[prop] = value;
		}

		this._distanceTraveled = 0;
		this._maximumDistance = 400;
  }

  /**
   * Adjusts screenXY to make sure the npc movement
   * is independent from the camera movement
   * @param {String} direction - up, down, right or left
   */
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

  /**
   * Defines how the NPC moves on the map
   * and how it reacts when meeting an obstacle or the main player
   * @param {Boolean} mapCollision - met an obstacle on the map
   * @param {Boolean} playerCollision - met the main player
   */
  move(mapCollision, playerCollision) {
		if (playerCollision) {
			this.setIdle();
			return;
		};

		if (mapCollision) {
		  // reset distance and turn around
      if (this.face('left')) {
        this.moveRight();
      } else {
        this.moveLeft();
      }
      this._distanceTraveled = 0;
		}

		if (this.face('left')) {
		  this.moveLeft();
		  this.screenX -= this.speed;
		  if (this._distanceTraveled > this._maximumDistance) {
		    this.moveRight();
		    this._distanceTraveled = 0;
		  }
		} else {
		  this.moveRight();
      this.screenX += this.speed;
		  if (this._distanceTraveled > this._maximumDistance) {
		    this.moveLeft();
		    this._distanceTraveled = 0;
		  }
		}
		this._distanceTraveled += this.speed;
  }
}

export default NPC;