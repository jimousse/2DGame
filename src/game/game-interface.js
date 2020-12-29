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
    this._controller = new Controller();
    const { cameraWidth, cameraHeight } = this._computeCameraDimensions();
    this._gameMap = new GameMap(WORLD, cameraWidth, cameraHeight);
    const { cameraX, cameraY } = this._computeCameraInitPosition(cameraWidth, cameraHeight);
    this._camera = new Camera(cameraWidth, cameraHeight, cameraX, cameraY);
    this._display = new Display(this.canvas, this._gameMap, this._camera, cameraWidth, cameraHeight);
    this._game = new Game(this._gameMap, this._camera, this._dispatchEvent.bind(this));
    this._engine = new Engine(this._render.bind(this), this._update.bind(this));
  }

  _computeCameraDimensions() {
    const { cameraSize } = WORLD;
    let ratioWidth, ratioHeight;
    const canvasHeight = this.canvas.height;
    const canvasWidth = this.canvas.width;
    if (canvasHeight > canvasWidth) {
      ratioWidth = 1;
      ratioHeight = canvasHeight/canvasWidth;
    } else {
      ratioHeight = 1;
      ratioWidth = canvasWidth/canvasHeight;
    }
    return {
      cameraHeight: cameraSize*ratioHeight,
      cameraWidth: cameraSize*ratioWidth
    };
  }

  _computeCameraInitPosition(cameraWidth, cameraHeight) {
    const firstGrassPosition = this._gameMap.grassPositions[0];
    return {
      cameraX: firstGrassPosition[0] - cameraWidth/2,
      cameraY: firstGrassPosition[1] - cameraHeight/2
    };
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