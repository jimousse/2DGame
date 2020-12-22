export const WORLD = {
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
    3, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
    3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 3,
    3, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 3,
    3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
    3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 3,
    3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
    3, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 3,
    3, 1, 3, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 3,
    3, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 3,
    3, 1, 1, 3, 1, 3, 1, 2, 2, 1, 1, 1, 1, 1, 1, 3,
    3, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 3, 1, 1, 3,
    3, 1, 3, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 3, 3,
    3, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 3,
    3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3
  ]
};

export const PLAYER = {
  src: './assets/moi.png',
  cols: 4,
  rows: 4,
  size: 50, // tile size
  moveSequences: {
    'idle_down':[ [ 0, 0 ] ], // initial state
    'walk_down': [ [ 1, 0 ], [ 2, 0 ], [ 3, 0 ] ],
    'walk_left': [ [ 1, 1 ], [ 2, 1 ], [ 3, 1 ] ],
    'idle_left':[ [ 0,1 ] ],
    'walk_up': [ [ 1, 2 ], [ 2, 2 ], [ 3, 2 ] ],
    'idle_up':[ [ 0,2 ] ],
    'walk_right': [ [ 1, 3 ], [ 2, 3 ], [ 3, 3 ] ],
    'idle_right':[ [ 0,3 ] ]
  },
  delay: 5
};

export const CAT = {
  src: './assets/cat.png',
  cols: 2,
  rows: 1,
  size: 30, // tile size
  moveSequences: {
    'idle_down': [ [ 0, 1 ], [ 0, 0 ] ]
  },
  delay: 20
};

export const OCEAN = {
  src: './assets/ocean-four-frames.png',
  cols: 3,
  rows: 1,
  size: 63,
  moveSequences: {
    'wave': [ [ 0,0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ] ]
  },
  delay: 1000
};

