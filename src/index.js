import Engine from './engine.js';
import Display from './display.js';
import Game from './game.js';
import Player from './player.js';
import Controller from './controller.js';
import GameMap  from './game-map.js';
import Camera  from './camera.js';
let display, engine, game, controller;
import { TREES, PLAYER } from './asset-info.js';
import { PlayerAnimator } from './player-animator.js';
const map = new GameMap(TREES);

const SIZE = 512;
const gameWidth = SIZE;
const gameHeight = SIZE;
const camera = new Camera(map, SIZE, SIZE);

const player = new Player(64, camera, map);
const playerAnimator = new PlayerAnimator({
  ...PLAYER,
  initPlayerState: player.getMoveState() // init state of player
});


playerAnimator.setOnLoad(() => {
  render();
});

const render = () => {
  display.drawMap(0);
  const { action, sequenceIndex } = player.getMoveState();
  const frame = playerAnimator.getCurrentFrame(action, sequenceIndex);
  display.drawPlayer(playerAnimator.getImage(), frame, game.getPlayerInfo());
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

const canvas = document.querySelector('canvas');
controller = new Controller();
engine = new Engine(render, update);
display = new Display(canvas, map, camera, SIZE, SIZE);
game = new Game(map, player, camera);
map.setOnLoad(() => {
  display.resize();
});
engine.start();