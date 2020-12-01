import Engine from './engine.js';
import Display from './display.js';
import Game from './game.js';
import Player from './player.js';
import Controller from './controller.js';
import GameMap  from './game-map.js';
import Camera  from './camera.js';
import { TREES, PLAYER } from './asset-info.js';
const CAMERA_SIZE = 512;
const controller = new Controller();
const map = new GameMap({
  ...TREES,
  onLoadCallback: () => { display.resize(); }
});
const camera = new Camera(CAMERA_SIZE, CAMERA_SIZE);
const player = new Player({
  assetInfo: PLAYER,
  onLoadCallback: render
});
const game = new Game(map, player, camera);

const render = () => {
  display.drawMap(0);
  display.drawPlayer(game.getPlayerInfo());
  display.drawMap(1);
};

const update = () => {
  game.update();
  if (controller.isLeftActive()) {
    camera.moveLeft();
    game.movePlayer('left');
  } else if (controller.isRightActive()) {
    camera.moveRight();
    game.movePlayer('right');
  } else if (controller.isUpActive()) {
    camera.moveUp();
    game.movePlayer('up');
  } else if (controller.isDownActive()) {
    camera.moveDown();
    game.movePlayer('down');
  } else if (controller.isIdle()) {
    game.movePlayer('idle');
  }
};

const engine = new Engine(render, update);
const canvas = document.querySelector('canvas');
const display = new Display(canvas, map, camera, CAMERA_SIZE, CAMERA_SIZE);


engine.start();