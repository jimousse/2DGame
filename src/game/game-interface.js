import {
  Game,
  Engine,
  Player,
  Controller,
  Camera,
  Display,
  GameMap
} from './parts/index.js';

import { TREES, PLAYER } from './parts/asset-info.js';

const CAMERA_SIZE = 512;

export class GameInterface {
  constructor(canvas) {
    this.canvas = canvas;
    this._init();
  }

  _init() {
    this._controller = new Controller();
    this._camera = new Camera(CAMERA_SIZE, CAMERA_SIZE);
    this._gameMap = new GameMap(TREES);
    this._display = new Display(this.canvas, this._gameMap, this._camera, CAMERA_SIZE, CAMERA_SIZE);
    this._player = new Player(PLAYER);
    this._game = new Game(this._gameMap, this._player, this._camera);
    this._engine = new Engine(() => { this._render(); }, () => { this._update(); });
  }

  _render() {
    this._display.drawMap(0);
    this._display.drawPlayer(this._game.getPlayerInfo());
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
        this._camera.moveLeft();
        this._game.movePlayer('left');
        break;
      case 'right':
        this._camera.moveRight();
        this._game.movePlayer('right');
        break;
      case 'up':
        this._camera.moveUp();
        this._game.movePlayer('up');
        break;
      case 'down':
        this._camera.moveDown();
        this._game.movePlayer('down');
        break;
      default:
        this._game.movePlayer('idle');
        break;
    }
  }

  start() {
    this._engine.start();
  }
}