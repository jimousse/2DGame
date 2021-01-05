export const WORLD = {
  src: './assets/garden_with_ocean.png',
  cols: 16,
  rows: 16,
  size: 64, // tile size
  uniqueIndices: {
    coin: 7,
    grass: 1,
    tree_bottom: 3,
    tree_top: 4,
    path: 2,
    ocean: 6,
    bush: 5
  },
  elements: {
    tree: {
      layers: [ 3 ], // tile index in the image
      top: 4, // tile index in the image
      key: 3 // key in playableAreaKeys
    },
    grass: {
      layers: [ 1 ], // tile index in the image
      key: 1 // key in playableAreaKeys
    },
    path: {
      layers: [ 2 ], // tile index in the image
      key: 2 // key in playableAreaKeys
    },
    coin: {
      layers: [ 1, 7 ], // tile index in the image
      key: 4 // key in playableAreaKeys
    },
    ocean: {
      layers: [ 6 ], // tile index in the image
      key: 6 // key in playableAreaKeys
    },
    bush: {
      layers: [ 1, 5 ],  // tile index in the image
      key: 5 // key in playableAreaKeys
    }
  },
  cameraSize: 700,
  obstacles: new Set([ 3, 6, 5 ]), // keys here
  playableAreaKeys: [
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
    3, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
    3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 3,
    3, 1, 1, 5, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 3,
    3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
    3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 3,
    3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
    3, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 3,
    3, 1, 5, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 3,
    3, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 3,
    3, 1, 1, 3, 1, 5, 1, 2, 2, 1, 1, 1, 1, 1, 1, 3,
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
  width: 36, // tile size
  height: 48, // tile size
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
  delay: 7
};

export const CAT = {
  src: './assets/cat-frames.png',
  cols: 2,
  rows: 1,
  size: 40, // tile size
  moveSequences: {
    'idle_down': [ [ 1, 0 ], [ 1, 3 ] ],  // initial state
    'idle_up': [ [ 4, 0 ], [ 4, 3 ] ],
    'idle_left': [ [ 2, 0 ], [ 2, 3 ] ],
    'idle_right': [ [ 3, 0 ], [ 3, 3 ] ],
    'walk_up': [ [ 4, 1 ], [ 4, 2 ] ],
    'walk_right': [ [ 3, 1 ], [ 3, 0 ],  [ 3, 2 ], [ 3, 3 ] ],
    'walk_left': [ [ 2, 1 ], [ 2, 0 ],  [ 2, 2 ], [ 2, 3 ] ],
    'walk_down': [ [ 1, 1 ], [ 1, 0 ], [ 1, 2 ], [ 1, 3 ] ]
  },
  delay: 10
};

export const CAT2 = {
  src: './assets/cat-frames-2.png',
  cols: 2,
  rows: 1,
  size: 40, // tile size
  moveSequences: {
    'idle_down': [ [ 1, 0 ], [ 1, 3 ] ],  // initial state
    'idle_up': [ [ 4, 0 ], [ 4, 3 ] ],
    'idle_left': [ [ 2, 0 ], [ 2, 3 ] ],
    'idle_right': [ [ 3, 0 ], [ 3, 3 ] ],
    'walk_up': [ [ 4, 1 ], [ 4, 2 ] ],
    'walk_right': [ [ 3, 1 ], [ 3, 0 ],  [ 3, 2 ], [ 3, 3 ] ],
    'walk_left': [ [ 2, 1 ], [ 2, 0 ],  [ 2, 2 ], [ 2, 3 ] ],
    'walk_down': [ [ 1, 1 ], [ 1, 0 ], [ 1, 2 ], [ 1, 3 ] ]
  },
  delay: 10
};

export const CAT3 = {
  src: './assets/cat-frames-3.png',
  cols: 2,
  rows: 1,
  size: 40, // tile size
  moveSequences: {
    'idle_down': [ [ 1, 0 ], [ 1, 3 ] ],  // initial state
    'idle_up': [ [ 4, 0 ], [ 4, 3 ] ],
    'idle_left': [ [ 2, 0 ], [ 2, 3 ] ],
    'idle_right': [ [ 3, 0 ], [ 3, 3 ] ],
    'walk_up': [ [ 4, 1 ], [ 4, 2 ] ],
    'walk_right': [ [ 3, 1 ], [ 3, 0 ],  [ 3, 2 ], [ 3, 3 ] ],
    'walk_left': [ [ 2, 1 ], [ 2, 0 ],  [ 2, 2 ], [ 2, 3 ] ],
    'walk_down': [ [ 1, 1 ], [ 1, 0 ], [ 1, 2 ], [ 1, 3 ] ]
  },
  delay: 10
};

export const CAT4 = {
  src: './assets/cat-frames-4.png',
  cols: 2,
  rows: 1,
  size: 40, // tile size
  moveSequences: {
    'idle_down': [ [ 1, 0 ], [ 1, 3 ] ],  // initial state
    'idle_up': [ [ 4, 0 ], [ 4, 3 ] ],
    'idle_left': [ [ 2, 0 ], [ 2, 3 ] ],
    'idle_right': [ [ 3, 0 ], [ 3, 3 ] ],
    'walk_up': [ [ 4, 1 ], [ 4, 2 ] ],
    'walk_right': [ [ 3, 1 ], [ 3, 0 ],  [ 3, 2 ], [ 3, 3 ] ],
    'walk_left': [ [ 2, 1 ], [ 2, 0 ],  [ 2, 2 ], [ 2, 3 ] ],
    'walk_down': [ [ 1, 1 ], [ 1, 0 ], [ 1, 2 ], [ 1, 3 ] ]
  },
  delay: 10
};

export const OCEAN = {
  src: './assets/ocean-four-frames.png',
  cols: 3,
  rows: 1,
  size: 64,
  moveSequences: {
    'wave': [ [ 0,0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ] ]
  },
  delay: 1000
};

export const COIN = {
  src: './assets/coin.png',
  cols: 8,
  rows: 1,
  size: 16,
  moveSequences: {
    'rotate': [ [ 0,0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 0, 6 ], [ 0, 7 ] ]
  },
  delay: 10
};


