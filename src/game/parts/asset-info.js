import { ACTIONS } from './constants.js';
const {
  WALK_UP,
  WALK_DOWN,
  WALK_RIGHT,
  WALK_LEFT,
  IDLE_DOWN,
  IDLE_UP,
  IDLE_RIGHT,
  IDLE_LEFT
} = ACTIONS;

export const TREES = {
  src: './assets/garden_with_ocean.png',
  cols: 16,
  rows: 16,
  size: 64, // tile size
  elements: {
    tree_bottom: 3,
    tree_top: 4,
    grass: 1,
    path: 2,
    bush: 5,
    ocean: 6
  },
  playableArea: [
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
    3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
    3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
    3, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
    3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
    3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
    3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
    3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
    3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
    3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
    3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
    3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
    3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
    3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3
  ]
};

export const PLAYER = {
  src: './assets/moi.png',
  cols: 4,
  rows: 4,
  size: 50, // tile size
  moveSequences: {
    [WALK_DOWN.name]: [ [ 1, 0 ], [ 2, 0 ], [ 3, 0 ] ],
    [IDLE_DOWN.name]:[ [ 0, 0 ] ],
    [WALK_LEFT.name]: [ [ 1, 1 ], [ 2, 1 ], [ 3, 1 ] ],
    [IDLE_LEFT.name]:[ [ 0,1 ] ],
    [WALK_UP.name]: [ [ 1, 2 ], [ 2, 2 ], [ 3, 2 ] ],
    [IDLE_UP.name]:[ [ 0,2 ] ],
    [WALK_RIGHT.name]: [ [ 1, 3 ], [ 2, 3 ], [ 3, 3 ] ],
    [IDLE_RIGHT.name]:[ [ 0,3 ] ]
  }
};

