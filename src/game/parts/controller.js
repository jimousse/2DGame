class Controller {
  constructor() {
    this._activeDirection = null;
  }

  setActiveDirection(direction) {
    this._activeDirection = direction;
  }

  getActiveDirection() {
    return this._activeDirection;
  }

  isIdle() {
    return this._activeDirection === null;
  }
}

export default Controller;