import {
  Game,
  Engine,
  Controller,
  Camera,
  Display,
  GameMap
} from './parts/index.js';

import { WORLD } from './parts/asset-info.js';

export class GameInterface {
  constructor(canvas) {
    this.canvas = canvas;
    this._init();
  }

  _dispatchEvent(detail) {
    let event = new CustomEvent('game-speech', {
      detail,
      bubbles: true,
      composed: true
    });
    this.canvas.dispatchEvent(event);
  }

  _init() {
    const { cameraSize } = WORLD;
    this._controller = new Controller();
    this._camera = new Camera(cameraSize, cameraSize);
    this._gameMap = new GameMap(WORLD);
    this._display = new Display(this.canvas, this._gameMap, this._camera, cameraSize, cameraSize);
    this._game = new Game(this._gameMap, this._camera, this._dispatchEvent.bind(this));
    this._engine = new Engine(this._render.bind(this), this._update.bind(this));
  }

  _render() {
    this._display.drawMap(0);
    this._display.drawCharacters(this._game.getCharactersDisplayInfo());
    this._display.drawMap(1);
    this._display.render();
  }

  playerGoLeft() {
    this._controller.setActiveDirection('left');
  }

  playerGoRight() {
    this._controller.setActiveDirection('right');
  }

  playerGoUp() {
    this._controller.setActiveDirection('up');
  }

  playerGoDown() {
    this._controller.setActiveDirection('down');
  }

  playerStop() {
    this._controller.setActiveDirection(null);
  }

  _update() {
    this._game.update();
    const direction = this._controller.getActiveDirection();
    switch (direction) {
      case 'left':
        this._game.moveLeft();
        break;
      case 'right':
        this._game.moveRight();
        break;
      case 'up':
        this._game.moveUp();
        break;
      case 'down':
        this._game.moveDown();
        break;
      default:
        this._game.setIdle();
        break;
    }
  }

  start() {
    this._engine.start();
  }
}