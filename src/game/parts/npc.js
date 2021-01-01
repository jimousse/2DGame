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
		this._setInitialDirection();
		this._distanceTraveled = 0;
  }

  _setInitialDirection() {
    switch (this.initialDirection) {
      case 'down':
        this.moveDown();
        break;
      case 'up':
        this.moveUp();
        break;
      case 'right':
        this.moveRight();
        break;
      case 'left':
        this.moveLeft();
        break;
      default:
        this.moveDown();
        break;
    }
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
   * @param {Object} playerCollision - collision info with player
   * @param {Boolean} metOtherNPCs - met other NPCs
   */
  move(mapCollision, playerCollision, metOtherNPCs) {
    // handle player collision
		if (playerCollision.left) {
		  if (!this.face('left')) this.moveLeft();
		  this.setIdle();
		  return;
		} else if (playerCollision.right) {
		  if (!this.face('right')) this.moveRight();
		  this.setIdle();
		  return;
		} else if (playerCollision.top) {
      if (!this.face('up')) this.moveUp();
		  this.setIdle();
		  return;
		} else if (playerCollision.bottom) {
      if (!this.face('down')) this.moveDown();
		  this.setIdle();
		  return;
		}

    // look down when immobile
    if (!this.speed) {
			this.setIdle();
			return;
		};

    // change direction if met obstacle or met NPC
		if (mapCollision || metOtherNPCs) {
		  // reset distance and turn around
      if (this.face('left')) {
        this.moveRight();
      } else if (this.face('right')) {
        this.moveLeft();
      } else if (this.face('up')) {
        this.moveDown();
      } else if (this.face('down')) {
        this.moveUp();
      }
      this._distanceTraveled = 0;
		}

		if (this.face('left')) {
		  this.moveLeft();
		  this.screenX -= this.speed;
		} else if (this.face('right')) {
		  this.moveRight();
      this.screenX += this.speed;
		} else if (this.face('up')) {
      this.moveUp();
      this.screenY -= this.speed;
		} else if (this.face('down')) {
      this.moveDown();
      this.screenY += this.speed;
		}

    if (this._distanceTraveled > this.maxDistance) {
      this._randomlyDirectionMove();
      this._distanceTraveled = 0;
    } else {
      this._distanceTraveled += this.speed;
    }
  }

  _randomlyDirectionMove() {
    const allDirection = [ this.moveLeft, this.moveRight, this.moveUp, this.moveDown ];
    const randomIndex = Math.floor(Math.random()*(allDirection.length));
    const randomMethod = allDirection[randomIndex];
    randomMethod.bind(this)();
  }
}

export default NPC;