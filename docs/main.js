/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/asset-info.js":
/*!***************************!*\
  !*** ./src/asset-info.js ***!
  \***************************/
/*! exports provided: TREES, PLAYER */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TREES", function() { return TREES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PLAYER", function() { return PLAYER; });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./src/constants.js");
var _moveSequences;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var WALK_UP = _constants_js__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].WALK_UP,
    WALK_DOWN = _constants_js__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].WALK_DOWN,
    WALK_RIGHT = _constants_js__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].WALK_RIGHT,
    WALK_LEFT = _constants_js__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].WALK_LEFT,
    IDLE_DOWN = _constants_js__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].IDLE_DOWN,
    IDLE_UP = _constants_js__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].IDLE_UP,
    IDLE_RIGHT = _constants_js__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].IDLE_RIGHT,
    IDLE_LEFT = _constants_js__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].IDLE_LEFT;
var TREES = {
  src: './assets/garden_with_ocean.png',
  cols: 8,
  rows: 8,
  tsize: 64,
  elements: {
    tree_bottom: 3,
    tree_top: 4,
    grass: 1,
    path: 2,
    bush: 5,
    ocean: 6
  },
  playableArea: [3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 3, 3, 1, 3, 1, 1, 1, 1, 3, 3, 1, 1, 2, 2, 1, 1, 3, 3, 1, 1, 2, 2, 1, 1, 3, 3, 1, 1, 2, 2, 1, 1, 3, 3, 1, 1, 2, 2, 1, 1, 3, 3, 3, 3, 2, 2, 3, 3, 3]
};
var PLAYER = {
  src: './assets/moi.png',
  cols: 4,
  rows: 4,
  tsize: 50,
  moveSequences: (_moveSequences = {}, _defineProperty(_moveSequences, WALK_DOWN.name, [[1, 0], [2, 0], [3, 0]]), _defineProperty(_moveSequences, IDLE_DOWN.name, [[0, 0]]), _defineProperty(_moveSequences, WALK_LEFT.name, [[1, 1], [2, 1], [3, 1]]), _defineProperty(_moveSequences, IDLE_LEFT.name, [[0, 1]]), _defineProperty(_moveSequences, WALK_UP.name, [[1, 2], [2, 2], [3, 2]]), _defineProperty(_moveSequences, IDLE_UP.name, [[0, 2]]), _defineProperty(_moveSequences, WALK_RIGHT.name, [[1, 3], [2, 3], [3, 3]]), _defineProperty(_moveSequences, IDLE_RIGHT.name, [[0, 3]]), _moveSequences)
};

/***/ }),

/***/ "./src/camera.js":
/*!***********************!*\
  !*** ./src/camera.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CAMERA_SPEED = 2;
/**
 * map - instance of GameMap
 */

var Camera = /*#__PURE__*/function () {
  function Camera(map, width, height) {
    _classCallCheck(this, Camera);

    this.x = width / 2;
    this.y = height / 2;
    this.width = width;
    this.height = height;
    this.speed = CAMERA_SPEED;
    this.stop = {
      right: false,
      left: false,
      up: false,
      down: false
    };
    this.maxX = map.cols * map.tsize - width;
    this.maxY = map.rows * map.tsize - height;
  }

  _createClass(Camera, [{
    key: "moveRight",
    value: function moveRight() {
      if (!this.stop.right) {
        this.x += CAMERA_SPEED;
      }
    }
  }, {
    key: "moveLeft",
    value: function moveLeft() {
      if (!this.stop.left) {
        this.x -= CAMERA_SPEED;
      }
    }
  }, {
    key: "moveUp",
    value: function moveUp() {
      if (!this.stop.up) {
        this.y -= CAMERA_SPEED;
      }
    }
  }, {
    key: "moveDown",
    value: function moveDown() {
      if (!this.stop.down) {
        this.y += CAMERA_SPEED;
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      this.stop.right = false;
      this.stop.left = false;
      this.stop.up = false;
      this.stop.down = false;
    }
  }, {
    key: "isIdle",
    value: function isIdle() {
      return this._idle;
    }
  }]);

  return Camera;
}();

/* harmony default export */ __webpack_exports__["default"] = (Camera);

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! exports provided: ACTIONS, CONSTANT_SPEED */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTIONS", function() { return ACTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONSTANT_SPEED", function() { return CONSTANT_SPEED; });
var ACTIONS = {
  WALK_RIGHT: {
    name: 'walk_right',
    length: 3
  },
  WALK_DOWN: {
    name: 'walk_down',
    length: 3
  },
  WALK_LEFT: {
    name: 'walk_left',
    length: 3
  },
  WALK_UP: {
    name: 'walk_up',
    length: 3
  },
  IDLE_RIGHT: {
    name: 'idle_right',
    length: 1
  },
  IDLE_LEFT: {
    name: 'idle_left',
    length: 1
  },
  IDLE_UP: {
    name: 'idle_up',
    length: 1
  },
  IDLE_DOWN: {
    name: 'idle_down',
    length: 1
  }
};
var CONSTANT_SPEED = 3;

/***/ }),

/***/ "./src/controller.js":
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Controller = /*#__PURE__*/function () {
  function Controller() {
    _classCallCheck(this, Controller);

    this.left = {
      active: false,
      down: false
    };
    this.right = {
      active: false,
      down: false
    };
    this.up = {
      active: false,
      down: false
    };
    this.down = {
      active: false,
      down: false
    };
    this.plug();
  }

  _createClass(Controller, [{
    key: "setKeyDown",
    value: function setKeyDown(_ref) {
      var type = _ref.type,
          keyCode = _ref.keyCode;
      var isKeyDown = type === 'keydown';

      switch (keyCode) {
        case 37:
          // left
          this.left.down = isKeyDown;
          break;

        case 38:
          // up
          this.up.down = isKeyDown;
          break;

        case 39:
          // right
          this.right.down = isKeyDown;
          break;

        case 40:
          // down
          this.down.down = isKeyDown;
          break;
      }
    }
  }, {
    key: "isLeftActive",
    value: function isLeftActive() {
      return this.left.down;
    }
  }, {
    key: "isRightActive",
    value: function isRightActive() {
      return this.right.down;
    }
  }, {
    key: "isUpActive",
    value: function isUpActive() {
      return this.up.down;
    }
  }, {
    key: "isDownActive",
    value: function isDownActive() {
      return this.down.down;
    }
  }, {
    key: "isIdle",
    value: function isIdle() {
      return !this.isDownActive() && !this.isUpActive() && !this.isRightActive() && !this.isLeftActive();
    }
  }, {
    key: "plug",
    value: function plug() {
      window.addEventListener('keydown', this.setKeyDown.bind(this));
      window.addEventListener('keyup', this.setKeyDown.bind(this));
    }
  }]);

  return Controller;
}();

/* harmony default export */ __webpack_exports__["default"] = (Controller);

/***/ }),

/***/ "./src/display.js":
/*!************************!*\
  !*** ./src/display.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Display = /*#__PURE__*/function () {
  function Display(canvas, map, camera, canvasWidth, canvasHeight) {
    _classCallCheck(this, Display);

    this.buffer = document.createElement('canvas').getContext('2d'), this.context = canvas.getContext('2d');
    this._map = map;
    this._width = canvasWidth;
    this.camera = camera;
    this._height = canvasHeight;
    this.buffer.canvas.width = canvasWidth;
    this.buffer.canvas.height = canvasHeight;
  }

  _createClass(Display, [{
    key: "drawPlayer",
    value: function drawPlayer(image, tile, position) {
      var _this$buffer;

      (_this$buffer = this.buffer).drawImage.apply(_this$buffer, [image].concat(_toConsumableArray(tile), [position.x, position.y, position.width, position.height]));

      this._render();
    }
  }, {
    key: "drawMap",
    value: function drawMap(layer) {
      var image = this._map.getImage();

      var tileSize = this._map.tsize;
      var startCol = Math.floor(this.camera.x / this._map.tsize);
      var endCol = startCol + Math.floor(this.camera.width / this._map.tsize) + 1;
      var startRow = Math.floor(this.camera.y / this._map.tsize);
      var endRow = startRow + Math.floor(this.camera.height / this._map.tsize) + 1;

      for (var col = startCol; col <= endCol; col++) {
        for (var row = startRow; row <= endRow; row++) {
          var x = col * this._map.tsize - this.camera.x;
          var y = row * this._map.tsize - this.camera.y;

          var currentTile = this._map.getTile(layer, col, row);

          if (currentTile === 0) continue;
          this.buffer.drawImage(image, // image
          (currentTile - 1) * tileSize, // source x
          0, // source y
          tileSize, // source width
          tileSize, // source height
          Math.floor(x), // target x
          Math.floor(y), // target y
          tileSize, // target width
          tileSize // target height
          );
        }
      }

      this._render();
    }
  }, {
    key: "resize",
    value: function resize() {
      var ratio = this._map.height / this._map.width;

      if (this._height / this._width > ratio) {
        this.context.canvas.height = this._width * ratio;
        this.context.canvas.width = this._width;
      } else {
        this.context.canvas.height = this._height;
        this.context.canvas.width = this._height / ratio;
      }

      this.context.imageSmoothingEnabled = true;
    }
  }, {
    key: "_render",
    value: function _render() {
      this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height);
    }
  }, {
    key: "map",
    set: function set(value) {
      this._map = value;
    }
  }]);

  return Display;
}();

/* harmony default export */ __webpack_exports__["default"] = (Display);

/***/ }),

/***/ "./src/engine.js":
/*!***********************!*\
  !*** ./src/engine.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Engine = /*#__PURE__*/function () {
  function Engine(render, update) {
    _classCallCheck(this, Engine);

    this.animatedFrameRequest;
    this.tickLength = 1000 / 60;
    this.update = update;
    this.render = render;
  }

  _createClass(Engine, [{
    key: "run",
    value: function run(tFrame) {
      // theorical next tick
      var nextTick = this.lastTick + this.tickLength;
      var numTicks = 0; // we're late, let's count the ticks we missed

      if (tFrame > nextTick) {
        numTicks = Math.floor((tFrame - this.lastTick) / this.tickLength);
      } // apply an update for each tick we missed


      for (var i = 0; i < numTicks; i++) {
        this.lastTick = this.lastTick + this.tickLength;
        this.update();
      }

      this.render();
      this.animatedFrameRequest = window.requestAnimationFrame(this.handleRun);
    }
  }, {
    key: "start",
    value: function start() {
      var _this = this;

      this.lastTick = performance.now();

      this.handleRun = function (t) {
        return _this.run(t);
      };

      this.animatedFrameRequest = window.requestAnimationFrame(this.handleRun);
    }
  }, {
    key: "stop",
    value: function stop() {
      window.cancelAnimationFrame(this.animatedFrameRequest);
    }
  }]);

  return Engine;
}();

/* harmony default export */ __webpack_exports__["default"] = (Engine);

/***/ }),

/***/ "./src/game-map.js":
/*!*************************!*\
  !*** ./src/game-map.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mixins_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mixins/index.js */ "./src/mixins/index.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var BORDER_LENGTH = 4;
var BORDER_CONTENT = 6;

var GameMap = /*#__PURE__*/function (_ImageLoader) {
  _inherits(GameMap, _ImageLoader);

  var _super = _createSuper(GameMap);

  function GameMap(_ref) {
    var _this;

    var src = _ref.src,
        cols = _ref.cols,
        rows = _ref.rows,
        playableArea = _ref.playableArea,
        rest = _objectWithoutProperties(_ref, ["src", "cols", "rows", "playableArea"]);

    _classCallCheck(this, GameMap);

    _this = _super.call(this, {
      src: src
    });
    _this.playableArea = playableArea;
    _this.playableDimension = {
      rows: rows,
      cols: cols
    };

    for (var _i = 0, _Object$entries = Object.entries(rest); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          prop = _Object$entries$_i[0],
          value = _Object$entries$_i[1];

      if (value === undefined) continue;
      _this[prop] = value;
    }

    _this._buildColisionMap();

    _this._buildCompleteMap();

    return _this;
  }

  _createClass(GameMap, [{
    key: "getTile",
    value: function getTile() {
      var layer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var col = arguments.length > 1 ? arguments[1] : undefined;
      var row = arguments.length > 2 ? arguments[2] : undefined;
      return this.layers[layer][row * this.cols + col];
    }
  }, {
    key: "_buildCompleteMap",

    /**
     * Builds the full map, a square of tiles, which includes:
     * - the playable area in the center
     * - a border, non playable around the playable area
     */
    value: function _buildCompleteMap() {
      var _this$playableDimensi = this.playableDimension,
          rows = _this$playableDimensi.rows,
          cols = _this$playableDimensi.cols;
      this.layers = [this._addBorder(this.playableArea, rows, cols, BORDER_LENGTH, BORDER_CONTENT)];
      this.rows = rows + 2 * BORDER_LENGTH; // new number of rows of the full map

      this.cols = cols + 2 * BORDER_LENGTH; // new number of columns of the full map

      this._buildTopLayer();
    }
  }, {
    key: "_buildTopLayer",
    value: function _buildTopLayer() {
      var _this2 = this;

      var _this$elements = this.elements,
          tree_bottom = _this$elements.tree_bottom,
          tree_top = _this$elements.tree_top;
      var topLayer = new Array(this.rows * this.cols).fill(0);
      this.layers[0].forEach(function (tile, i) {
        if (tile === tree_bottom) {
          topLayer[i - _this2.rows] = tree_top;
        }
      });
      this.layers[1] = topLayer;
    }
  }, {
    key: "_buildColisionMap",
    value: function _buildColisionMap() {
      var _this$playableDimensi2 = this.playableDimension,
          rows = _this$playableDimensi2.rows,
          cols = _this$playableDimensi2.cols;
      var playableAreaCollisionMap = this.playableArea.map(function (e) {
        if (e === 3) return 1;
        return 0;
      });
      this._collisionMap = this._addBorder(playableAreaCollisionMap, rows, cols, BORDER_LENGTH, 1);
    }
    /**
     * Returns 1 if the point (x,y) belongs to a tile
     * marked as an obstacle on the map. 0 otherwise.
     * @param {*} x
     * @param {*} y
     */

  }, {
    key: "collision",
    value: function collision(x, y) {
      var col = Math.floor(x / this.tsize);
      var row = Math.floor(y / this.tsize);
      return this._collisionMap[row * this.cols + col];
    }
    /**
     * Logs an array in the shape of a square
     * @param {*} game - array of numbers
     * @param {*} numOfRows - number of rows of the square to print
     */

  }, {
    key: "_prettyPrint",
    value: function _prettyPrint(game, numOfRows) {
      var prettyString = '\n';
      var i = 0;
      game.forEach(function (e) {
        if (i === numOfRows) {
          prettyString += '\n';
          i = 0;
        }

        prettyString += String(e) + '  ';
        i++;
      });
      prettyString += '\n';
    }
    /**
     * This method takes a square of tiles that is represented by an array of numbers
     * and returns a bigger array that is the first one with extra rows and columns around.
     *
     * Example:
     *
     * playableGame:
     * [
     *  1, 1, 1,
     *  1, 1, 1,
     *  1, 1, 1
     * ]
     * numRows = numCols = 3 (dimension of playableGame)
     * borderLen = 2
     * fillNumber = 9
     *
     * output:
     * [
     *  9, 9, 9, 9, 9, 9, 9
     *  9, 9, 9, 9, 9, 9, 9
     *  9, 9, 1, 1, 1, 9, 9
     *  9, 9, 1, 1, 1, 9, 9
     *  9, 9, 1, 1, 1, 9, 9
     *  9, 9, 9, 9, 9, 9, 9
     *  9, 9, 9, 9, 9, 9, 9
     * ]
     *
     * the playableGame is surounded by 2 (=borderLen) rows/columns of 9 (fillNumber)
     *
     * @param {*} playableGame - array that represent the playable area
     * @param {*} numRows - number of rows of the playable area
     * @param {*} numCols - number of columns of the playable area
     * @param {*} borderLen - the border width (in number of row/column) to add all around the playable area
     * @param {*} fillNumber - the content of the border
     */

  }, {
    key: "_addBorder",
    value: function _addBorder(playableGame, numRows, numCols, borderLen, fillNumber) {
      var newGame = [];
      var newRowLen = numRows + 2 * borderLen;
      var firstLine = new Array(newRowLen).fill(fillNumber);

      for (var i = 0; i < borderLen; i++) {
        newGame = [].concat(_toConsumableArray(newGame), _toConsumableArray(firstLine));
      }

      for (var _i2 = 0; _i2 < numRows; _i2++) {
        var newLine = [].concat(_toConsumableArray(new Array(borderLen).fill(fillNumber)), _toConsumableArray(playableGame.slice(numCols * _i2, numCols * _i2 + numRows)), _toConsumableArray(new Array(borderLen).fill(fillNumber)));
        newGame = [].concat(_toConsumableArray(newGame), _toConsumableArray(newLine));
      }

      for (var _i3 = 0; _i3 < borderLen; _i3++) {
        newGame = [].concat(_toConsumableArray(newGame), _toConsumableArray(firstLine));
      }

      return newGame;
    }
  }, {
    key: "width",
    get: function get() {
      return this.tsize * this.rows;
    }
  }, {
    key: "height",
    get: function get() {
      return this.tsize * this.cols;
    }
  }]);

  return GameMap;
}(_mixins_index_js__WEBPACK_IMPORTED_MODULE_0__["ImageLoader"]);

/* harmony default export */ __webpack_exports__["default"] = (GameMap);

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Game = /*#__PURE__*/function () {
  function Game(map, player, camera) {
    _classCallCheck(this, Game);

    this.map = map;
    this.player = player;
    this.camera = camera;
    this.collisionOffset = this.camera.speed;
  }

  _createClass(Game, [{
    key: "update",
    value: function update() {
      this.player.update();
      this.collide();
    }
  }, {
    key: "getPlayerInfo",
    value: function getPlayerInfo() {
      return _objectSpread(_objectSpread({}, this.player.getScreenCoordinate()), {}, {
        width: this.player.width,
        height: this.player.height,
        color: this.player.color
      });
    }
  }, {
    key: "movePlayer",
    value: function movePlayer(direction) {
      if (direction === 'right') this.player.moveRight();
      if (direction === 'left') this.player.moveLeft();
      if (direction === 'up') this.player.moveUp();
      if (direction === 'down') this.player.moveDown();
      if (direction === 'idle') this.player.setIdle();
    } // coords in map

  }, {
    key: "collide",
    value: function collide() {
      this.camera.reset();
      this.camera.stop.left = this._leftCollision();
      this.camera.stop.right = this._rightCollision();
      this.camera.stop.up = this._topCollision();
      this.camera.stop.down = this._bottomCollision();
    }
    /**
    							 player
    	(x,y) ->  +-----------+ <- (x + width, y)
    						|           |
    						|           |
    						|           |
    						+-----------+ <- (x + width, y + height)
    						 <- width ->
    */

  }, {
    key: "_rightCollision",
    value: function _rightCollision() {
      var one = [this.player.x + this.player.width + this.collisionOffset, this.player.y];
      var two = [this.player.x + this.player.width + this.collisionOffset, this.player.y + 1];
      var three = [this.player.x + this.player.width + this.collisionOffset, this.player.y + this.player.height];
      var four = [this.player.x + this.player.width + this.collisionOffset, this.player.y + this.player.height - 1];
      var first = Boolean(this.map.collision(one[0], one[1])) && Boolean(this.map.collision(two[0], two[1]));
      var second = Boolean(this.map.collision(three[0], three[1])) && Boolean(this.map.collision(four[0], four[1]));
      return first || second;
    }
  }, {
    key: "_leftCollision",
    value: function _leftCollision() {
      var one = [this.player.x - this.collisionOffset, this.player.y];
      var two = [this.player.x - this.collisionOffset, this.player.y + 1];
      var three = [this.player.x - this.collisionOffset, this.player.y + this.player.height];
      var four = [this.player.x - this.collisionOffset, this.player.y + this.player.height - 1];
      var first = Boolean(this.map.collision(one[0], one[1])) && Boolean(this.map.collision(two[0], two[1]));
      var second = Boolean(this.map.collision(three[0], three[1])) && Boolean(this.map.collision(four[0], four[1]));
      return first || second;
    }
  }, {
    key: "_topCollision",
    value: function _topCollision() {
      var one = [this.player.x, this.player.y - this.collisionOffset];
      var two = [this.player.x + 1, this.player.y - this.collisionOffset];
      var three = [this.player.x + this.player.width, this.player.y - this.collisionOffset];
      var four = [this.player.x + this.player.width - 1, this.player.y - this.collisionOffset];
      var first = Boolean(this.map.collision(one[0], one[1])) && Boolean(this.map.collision(two[0], two[1]));
      var second = Boolean(this.map.collision(three[0], three[1])) && Boolean(this.map.collision(four[0], four[1]));
      return first || second;
    }
  }, {
    key: "_bottomCollision",
    value: function _bottomCollision() {
      var one = [this.player.x, this.player.y + this.player.height + this.collisionOffset];
      var two = [this.player.x + 1, this.player.y + this.player.height + this.collisionOffset];
      var three = [this.player.x + this.player.width, this.player.y + this.player.height + this.collisionOffset];
      var four = [this.player.x + this.player.width - 1, this.player.y + this.player.height + this.collisionOffset];
      var first = Boolean(this.map.collision(one[0], one[1])) && Boolean(this.map.collision(two[0], two[1]));
      var second = Boolean(this.map.collision(three[0], three[1])) && Boolean(this.map.collision(four[0], four[1]));
      return first || second;
    }
  }]);

  return Game;
}();

/* harmony default export */ __webpack_exports__["default"] = (Game);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _engine_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./engine.js */ "./src/engine.js");
/* harmony import */ var _display_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./display.js */ "./src/display.js");
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game.js */ "./src/game.js");
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./player.js */ "./src/player.js");
/* harmony import */ var _controller_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./controller.js */ "./src/controller.js");
/* harmony import */ var _game_map_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./game-map.js */ "./src/game-map.js");
/* harmony import */ var _camera_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./camera.js */ "./src/camera.js");
/* harmony import */ var _asset_info_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./asset-info.js */ "./src/asset-info.js");
/* harmony import */ var _player_animator_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./player-animator.js */ "./src/player-animator.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var display, engine, game, controller;


var map = new _game_map_js__WEBPACK_IMPORTED_MODULE_5__["default"](_asset_info_js__WEBPACK_IMPORTED_MODULE_7__["TREES"]);
var SIZE = 512;
var gameWidth = SIZE;
var gameHeight = SIZE;
var camera = new _camera_js__WEBPACK_IMPORTED_MODULE_6__["default"](map, SIZE, SIZE);
var player = new _player_js__WEBPACK_IMPORTED_MODULE_3__["default"](64, camera, map);
var playerAnimator = new _player_animator_js__WEBPACK_IMPORTED_MODULE_8__["PlayerAnimator"](_objectSpread(_objectSpread({}, _asset_info_js__WEBPACK_IMPORTED_MODULE_7__["PLAYER"]), {}, {
  initPlayerState: player.getMoveState() // init state of player

}));
playerAnimator.setOnLoad(function () {
  render();
});

var render = function render() {
  display.drawMap(0);

  var _player$getMoveState = player.getMoveState(),
      action = _player$getMoveState.action,
      sequenceIndex = _player$getMoveState.sequenceIndex;

  var frame = playerAnimator.getCurrentFrame(action, sequenceIndex);
  display.drawPlayer(playerAnimator.getImage(), frame, game.getPlayerInfo());
  display.drawMap(1);
};

var update = function update() {
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

var canvas = document.querySelector('canvas');
controller = new _controller_js__WEBPACK_IMPORTED_MODULE_4__["default"]();
engine = new _engine_js__WEBPACK_IMPORTED_MODULE_0__["default"](render, update);
display = new _display_js__WEBPACK_IMPORTED_MODULE_1__["default"](canvas, map, camera, SIZE, SIZE);
game = new _game_js__WEBPACK_IMPORTED_MODULE_2__["default"](map, player, camera);
map.setOnLoad(function () {
  display.resize();
});
engine.start();

/***/ }),

/***/ "./src/mixins/image-loader.js":
/*!************************************!*\
  !*** ./src/mixins/image-loader.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ImageLoader = /*#__PURE__*/function () {
  function ImageLoader(_ref) {
    var src = _ref.src;

    _classCallCheck(this, ImageLoader);

    this._image = new Image();
    this._image.src = src;
  }

  _createClass(ImageLoader, [{
    key: "setOnLoad",
    value: function setOnLoad(callback) {
      this._image.onload = callback;
    }
  }, {
    key: "getImage",
    value: function getImage() {
      return this._image;
    }
  }]);

  return ImageLoader;
}();

/* harmony default export */ __webpack_exports__["default"] = (ImageLoader);

/***/ }),

/***/ "./src/mixins/index.js":
/*!*****************************!*\
  !*** ./src/mixins/index.js ***!
  \*****************************/
/*! exports provided: ImageLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _image_loader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image-loader.js */ "./src/mixins/image-loader.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ImageLoader", function() { return _image_loader_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./src/player-animator.js":
/*!********************************!*\
  !*** ./src/player-animator.js ***!
  \********************************/
/*! exports provided: PlayerAnimator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerAnimator", function() { return PlayerAnimator; });
/* harmony import */ var _mixins_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mixins/index.js */ "./src/mixins/index.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var DELAY = 7;
var PlayerAnimator = /*#__PURE__*/function (_ImageLoader) {
  _inherits(PlayerAnimator, _ImageLoader);

  var _super = _createSuper(PlayerAnimator);

  function PlayerAnimator(_ref) {
    var _this;

    var src = _ref.src,
        positions = _ref.positions,
        initPlayerState = _ref.initPlayerState,
        rest = _objectWithoutProperties(_ref, ["src", "positions", "initPlayerState"]);

    _classCallCheck(this, PlayerAnimator);

    _this = _super.call(this, {
      src: src
    });
    _this.positions = positions;

    for (var _i = 0, _Object$entries = Object.entries(rest); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          prop = _Object$entries$_i[0],
          value = _Object$entries$_i[1];

      if (value === undefined) continue;
      _this[prop] = value;
    }

    _this._createFrameSets();

    _this._currentFrame = _this._frameSets[initPlayerState.action][0];
    _this._count = 0;
    _this._delay = DELAY;
    return _this;
  }

  _createClass(PlayerAnimator, [{
    key: "_createFrameSets",
    value: function _createFrameSets() {
      this._frameSets = {};

      for (var _i2 = 0, _Object$entries2 = Object.entries(this.moveSequences); _i2 < _Object$entries2.length; _i2++) {
        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
            move = _Object$entries2$_i[0],
            sequence = _Object$entries2$_i[1];

        this._frameSets[move] = sequence.map(this.getTile.bind(this));
      }
    }
  }, {
    key: "getCurrentFrame",
    value: function getCurrentFrame(action, sequenceIndex) {
      if (this._count >= this._delay) {
        this._count = 0;
        this._currentFrame = this._frameSets[action][sequenceIndex];
      }

      this._count++;
      return this._currentFrame;
    }
  }, {
    key: "getTile",
    value: function getTile(_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          row = _ref3[0],
          col = _ref3[1];

      return [col * this.tsize, // x
      row * this.tsize, // y
      this.tsize, // width
      this.tsize // height
      ];
    }
  }]);

  return PlayerAnimator;
}(_mixins_index_js__WEBPACK_IMPORTED_MODULE_0__["ImageLoader"]);

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Player; });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./src/constants.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var WALK_UP = _constants_js__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].WALK_UP,
    WALK_DOWN = _constants_js__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].WALK_DOWN,
    WALK_RIGHT = _constants_js__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].WALK_RIGHT,
    WALK_LEFT = _constants_js__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].WALK_LEFT,
    IDLE_DOWN = _constants_js__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].IDLE_DOWN,
    IDLE_UP = _constants_js__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].IDLE_UP,
    IDLE_RIGHT = _constants_js__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].IDLE_RIGHT,
    IDLE_LEFT = _constants_js__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].IDLE_LEFT;

var Player = /*#__PURE__*/function () {
  function Player(size, camera, map) {
    _classCallCheck(this, Player);

    this.screenX = camera.width / 2 - size;
    this.screenY = camera.height / 2 - size;
    this.camera = camera;
    this.map = map;
    this.width = size;
    this.height = size;

    this._init();
  }

  _createClass(Player, [{
    key: "update",
    value: function update() {
      this.x = this.screenX + this.camera.x;
      this.y = this.screenY + this.camera.y;
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      this._updateState(WALK_RIGHT);
    }
  }, {
    key: "moveLeft",
    value: function moveLeft() {
      this._updateState(WALK_LEFT);
    }
  }, {
    key: "moveUp",
    value: function moveUp() {
      this._updateState(WALK_UP);
    }
  }, {
    key: "moveDown",
    value: function moveDown() {
      this._updateState(WALK_DOWN);
    }
  }, {
    key: "getScreenCoordinate",
    value: function getScreenCoordinate() {
      return {
        x: this.x - this.camera.x,
        y: this.y - this.camera.y
      };
    }
  }, {
    key: "_init",
    value: function _init() {
      this._state = {
        action: IDLE_DOWN.name,
        actionSequenceIndex: {}
      };

      for (var _i = 0, _Object$values = Object.values(_constants_js__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"]); _i < _Object$values.length; _i++) {
        var action = _Object$values[_i];
        this._state.actionSequenceIndex[action.name] = 0;
      }

      this.x = this.screenX + this.camera.x;
      this.y = this.screenY + this.camera.y;
    }
  }, {
    key: "_updateState",
    value: function _updateState(currentAction) {
      // update current action
      this._state.action = currentAction.name; // increment the current action

      this._state.actionSequenceIndex[currentAction.name] = (this._state.actionSequenceIndex[currentAction.name] + 1) % currentAction.length; // reset action sequence index for other actions

      for (var _i2 = 0, _Object$values2 = Object.values(_constants_js__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"]); _i2 < _Object$values2.length; _i2++) {
        var action = _Object$values2[_i2];

        if (action.name !== currentAction.name) {
          this._state.actionSequenceIndex[action.name] = 0;
        }
      }
    }
  }, {
    key: "getMoveState",
    value: function getMoveState() {
      return {
        action: this._state.action,
        sequenceIndex: this._state.actionSequenceIndex[this._state.action]
      };
    }
  }, {
    key: "face",
    value: function face(direction) {
      return this._state.action.indexOf(direction) >= 0;
    }
  }, {
    key: "setIdle",
    value: function setIdle() {
      if (this.face('right')) this._updateState(IDLE_RIGHT);
      if (this.face('left')) this._updateState(IDLE_LEFT);
      if (this.face('up')) this._updateState(IDLE_UP);
      if (this.face('down')) this._updateState(IDLE_DOWN);
    }
  }]);

  return Player;
}();



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0LWluZm8uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NhbWVyYS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9kaXNwbGF5LmpzIiwid2VicGFjazovLy8uL3NyYy9lbmdpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUtbWFwLmpzIiwid2VicGFjazovLy8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWl4aW5zL2ltYWdlLWxvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWl4aW5zL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9wbGF5ZXItYW5pbWF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsYXllci5qcyJdLCJuYW1lcyI6WyJXQUxLX1VQIiwiQUNUSU9OUyIsIldBTEtfRE9XTiIsIldBTEtfUklHSFQiLCJXQUxLX0xFRlQiLCJJRExFX0RPV04iLCJJRExFX1VQIiwiSURMRV9SSUdIVCIsIklETEVfTEVGVCIsIlRSRUVTIiwic3JjIiwiY29scyIsInJvd3MiLCJ0c2l6ZSIsImVsZW1lbnRzIiwidHJlZV9ib3R0b20iLCJ0cmVlX3RvcCIsImdyYXNzIiwicGF0aCIsImJ1c2giLCJvY2VhbiIsInBsYXlhYmxlQXJlYSIsIlBMQVlFUiIsIm1vdmVTZXF1ZW5jZXMiLCJuYW1lIiwiQ0FNRVJBX1NQRUVEIiwiQ2FtZXJhIiwibWFwIiwid2lkdGgiLCJoZWlnaHQiLCJ4IiwieSIsInNwZWVkIiwic3RvcCIsInJpZ2h0IiwibGVmdCIsInVwIiwiZG93biIsIm1heFgiLCJtYXhZIiwiX2lkbGUiLCJsZW5ndGgiLCJDT05TVEFOVF9TUEVFRCIsIkNvbnRyb2xsZXIiLCJhY3RpdmUiLCJwbHVnIiwidHlwZSIsImtleUNvZGUiLCJpc0tleURvd24iLCJpc0Rvd25BY3RpdmUiLCJpc1VwQWN0aXZlIiwiaXNSaWdodEFjdGl2ZSIsImlzTGVmdEFjdGl2ZSIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJzZXRLZXlEb3duIiwiYmluZCIsIkRpc3BsYXkiLCJjYW52YXMiLCJjYW1lcmEiLCJjYW52YXNXaWR0aCIsImNhbnZhc0hlaWdodCIsImJ1ZmZlciIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImdldENvbnRleHQiLCJjb250ZXh0IiwiX21hcCIsIl93aWR0aCIsIl9oZWlnaHQiLCJpbWFnZSIsInRpbGUiLCJwb3NpdGlvbiIsImRyYXdJbWFnZSIsIl9yZW5kZXIiLCJsYXllciIsImdldEltYWdlIiwidGlsZVNpemUiLCJzdGFydENvbCIsIk1hdGgiLCJmbG9vciIsImVuZENvbCIsInN0YXJ0Um93IiwiZW5kUm93IiwiY29sIiwicm93IiwiY3VycmVudFRpbGUiLCJnZXRUaWxlIiwicmF0aW8iLCJpbWFnZVNtb290aGluZ0VuYWJsZWQiLCJ2YWx1ZSIsIkVuZ2luZSIsInJlbmRlciIsInVwZGF0ZSIsImFuaW1hdGVkRnJhbWVSZXF1ZXN0IiwidGlja0xlbmd0aCIsInRGcmFtZSIsIm5leHRUaWNrIiwibGFzdFRpY2siLCJudW1UaWNrcyIsImkiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJoYW5kbGVSdW4iLCJwZXJmb3JtYW5jZSIsIm5vdyIsInQiLCJydW4iLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsIkJPUkRFUl9MRU5HVEgiLCJCT1JERVJfQ09OVEVOVCIsIkdhbWVNYXAiLCJyZXN0IiwicGxheWFibGVEaW1lbnNpb24iLCJPYmplY3QiLCJlbnRyaWVzIiwicHJvcCIsInVuZGVmaW5lZCIsIl9idWlsZENvbGlzaW9uTWFwIiwiX2J1aWxkQ29tcGxldGVNYXAiLCJsYXllcnMiLCJfYWRkQm9yZGVyIiwiX2J1aWxkVG9wTGF5ZXIiLCJ0b3BMYXllciIsIkFycmF5IiwiZmlsbCIsImZvckVhY2giLCJwbGF5YWJsZUFyZWFDb2xsaXNpb25NYXAiLCJlIiwiX2NvbGxpc2lvbk1hcCIsImdhbWUiLCJudW1PZlJvd3MiLCJwcmV0dHlTdHJpbmciLCJTdHJpbmciLCJwbGF5YWJsZUdhbWUiLCJudW1Sb3dzIiwibnVtQ29scyIsImJvcmRlckxlbiIsImZpbGxOdW1iZXIiLCJuZXdHYW1lIiwibmV3Um93TGVuIiwiZmlyc3RMaW5lIiwibmV3TGluZSIsInNsaWNlIiwiSW1hZ2VMb2FkZXIiLCJHYW1lIiwicGxheWVyIiwiY29sbGlzaW9uT2Zmc2V0IiwiY29sbGlkZSIsImdldFNjcmVlbkNvb3JkaW5hdGUiLCJjb2xvciIsImRpcmVjdGlvbiIsIm1vdmVSaWdodCIsIm1vdmVMZWZ0IiwibW92ZVVwIiwibW92ZURvd24iLCJzZXRJZGxlIiwicmVzZXQiLCJfbGVmdENvbGxpc2lvbiIsIl9yaWdodENvbGxpc2lvbiIsIl90b3BDb2xsaXNpb24iLCJfYm90dG9tQ29sbGlzaW9uIiwib25lIiwidHdvIiwidGhyZWUiLCJmb3VyIiwiZmlyc3QiLCJCb29sZWFuIiwiY29sbGlzaW9uIiwic2Vjb25kIiwiZGlzcGxheSIsImVuZ2luZSIsImNvbnRyb2xsZXIiLCJTSVpFIiwiZ2FtZVdpZHRoIiwiZ2FtZUhlaWdodCIsIlBsYXllciIsInBsYXllckFuaW1hdG9yIiwiUGxheWVyQW5pbWF0b3IiLCJpbml0UGxheWVyU3RhdGUiLCJnZXRNb3ZlU3RhdGUiLCJzZXRPbkxvYWQiLCJkcmF3TWFwIiwiYWN0aW9uIiwic2VxdWVuY2VJbmRleCIsImZyYW1lIiwiZ2V0Q3VycmVudEZyYW1lIiwiZHJhd1BsYXllciIsImdldFBsYXllckluZm8iLCJtb3ZlUGxheWVyIiwiaXNJZGxlIiwicXVlcnlTZWxlY3RvciIsInJlc2l6ZSIsInN0YXJ0IiwiX2ltYWdlIiwiSW1hZ2UiLCJjYWxsYmFjayIsIm9ubG9hZCIsIkRFTEFZIiwicG9zaXRpb25zIiwiX2NyZWF0ZUZyYW1lU2V0cyIsIl9jdXJyZW50RnJhbWUiLCJfZnJhbWVTZXRzIiwiX2NvdW50IiwiX2RlbGF5IiwibW92ZSIsInNlcXVlbmNlIiwic2l6ZSIsInNjcmVlblgiLCJzY3JlZW5ZIiwiX2luaXQiLCJfdXBkYXRlU3RhdGUiLCJfc3RhdGUiLCJhY3Rpb25TZXF1ZW5jZUluZGV4IiwidmFsdWVzIiwiY3VycmVudEFjdGlvbiIsImluZGV4T2YiLCJmYWNlIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRkE7SUFFRUEsTyxHQVFFQyxxRCxDQVJGRCxPO0lBQ0FFLFMsR0FPRUQscUQsQ0FQRkMsUztJQUNBQyxVLEdBTUVGLHFELENBTkZFLFU7SUFDQUMsUyxHQUtFSCxxRCxDQUxGRyxTO0lBQ0FDLFMsR0FJRUoscUQsQ0FKRkksUztJQUNBQyxPLEdBR0VMLHFELENBSEZLLE87SUFDQUMsVSxHQUVFTixxRCxDQUZGTSxVO0lBQ0FDLFMsR0FDRVAscUQsQ0FERk8sUztBQUdLLElBQU1DLEtBQUssR0FBRztBQUNuQkMsS0FBRyxFQUFFLGdDQURjO0FBRW5CQyxNQUFJLEVBQUUsQ0FGYTtBQUduQkMsTUFBSSxFQUFFLENBSGE7QUFJbkJDLE9BQUssRUFBRSxFQUpZO0FBS25CQyxVQUFRLEVBQUU7QUFDUkMsZUFBVyxFQUFFLENBREw7QUFFUkMsWUFBUSxFQUFFLENBRkY7QUFHUkMsU0FBSyxFQUFFLENBSEM7QUFJUkMsUUFBSSxFQUFFLENBSkU7QUFLUkMsUUFBSSxFQUFFLENBTEU7QUFNUkMsU0FBSyxFQUFFO0FBTkMsR0FMUztBQWFuQkMsY0FBWSxFQUFFLENBQ1osQ0FEWSxFQUNULENBRFMsRUFDTixDQURNLEVBQ0gsQ0FERyxFQUNBLENBREEsRUFDRyxDQURILEVBQ00sQ0FETixFQUNTLENBRFQsRUFFWixDQUZZLEVBRVQsQ0FGUyxFQUVOLENBRk0sRUFFSCxDQUZHLEVBRUEsQ0FGQSxFQUVHLENBRkgsRUFFTSxDQUZOLEVBRVMsQ0FGVCxFQUdaLENBSFksRUFHVCxDQUhTLEVBR04sQ0FITSxFQUdILENBSEcsRUFHQSxDQUhBLEVBR0csQ0FISCxFQUdNLENBSE4sRUFHUyxDQUhULEVBSVosQ0FKWSxFQUlULENBSlMsRUFJTixDQUpNLEVBSUgsQ0FKRyxFQUlBLENBSkEsRUFJRyxDQUpILEVBSU0sQ0FKTixFQUlTLENBSlQsRUFLWixDQUxZLEVBS1QsQ0FMUyxFQUtOLENBTE0sRUFLSCxDQUxHLEVBS0EsQ0FMQSxFQUtHLENBTEgsRUFLTSxDQUxOLEVBS1MsQ0FMVCxFQU1aLENBTlksRUFNVCxDQU5TLEVBTU4sQ0FOTSxFQU1ILENBTkcsRUFNQSxDQU5BLEVBTUcsQ0FOSCxFQU1NLENBTk4sRUFNUyxDQU5ULEVBT1osQ0FQWSxFQU9ULENBUFMsRUFPTixDQVBNLEVBT0gsQ0FQRyxFQU9BLENBUEEsRUFPRyxDQVBILEVBT00sQ0FQTixFQU9TLENBUFQsRUFRWixDQVJZLEVBUVQsQ0FSUyxFQVFOLENBUk0sRUFRSCxDQVJHLEVBUUEsQ0FSQSxFQVFHLENBUkgsRUFRTSxDQVJOLEVBUVMsQ0FSVDtBQWJLLENBQWQ7QUF5QkEsSUFBTUMsTUFBTSxHQUFHO0FBQ3BCWixLQUFHLEVBQUUsa0JBRGU7QUFFcEJDLE1BQUksRUFBRSxDQUZjO0FBR3BCQyxNQUFJLEVBQUUsQ0FIYztBQUlwQkMsT0FBSyxFQUFFLEVBSmE7QUFLcEJVLGVBQWEsd0RBQ1ZyQixTQUFTLENBQUNzQixJQURBLEVBQ08sQ0FBRSxDQUFFLENBQUYsRUFBSyxDQUFMLENBQUYsRUFBWSxDQUFFLENBQUYsRUFBSyxDQUFMLENBQVosRUFBc0IsQ0FBRSxDQUFGLEVBQUssQ0FBTCxDQUF0QixDQURQLG1DQUVWbkIsU0FBUyxDQUFDbUIsSUFGQSxFQUVNLENBQUUsQ0FBRSxDQUFGLEVBQUssQ0FBTCxDQUFGLENBRk4sbUNBR1ZwQixTQUFTLENBQUNvQixJQUhBLEVBR08sQ0FBRSxDQUFFLENBQUYsRUFBSyxDQUFMLENBQUYsRUFBWSxDQUFFLENBQUYsRUFBSyxDQUFMLENBQVosRUFBc0IsQ0FBRSxDQUFGLEVBQUssQ0FBTCxDQUF0QixDQUhQLG1DQUlWaEIsU0FBUyxDQUFDZ0IsSUFKQSxFQUlNLENBQUUsQ0FBRSxDQUFGLEVBQUksQ0FBSixDQUFGLENBSk4sbUNBS1Z4QixPQUFPLENBQUN3QixJQUxFLEVBS0ssQ0FBRSxDQUFFLENBQUYsRUFBSyxDQUFMLENBQUYsRUFBWSxDQUFFLENBQUYsRUFBSyxDQUFMLENBQVosRUFBc0IsQ0FBRSxDQUFGLEVBQUssQ0FBTCxDQUF0QixDQUxMLG1DQU1WbEIsT0FBTyxDQUFDa0IsSUFORSxFQU1JLENBQUUsQ0FBRSxDQUFGLEVBQUksQ0FBSixDQUFGLENBTkosbUNBT1ZyQixVQUFVLENBQUNxQixJQVBELEVBT1EsQ0FBRSxDQUFFLENBQUYsRUFBSyxDQUFMLENBQUYsRUFBWSxDQUFFLENBQUYsRUFBSyxDQUFMLENBQVosRUFBc0IsQ0FBRSxDQUFGLEVBQUssQ0FBTCxDQUF0QixDQVBSLG1DQVFWakIsVUFBVSxDQUFDaUIsSUFSRCxFQVFPLENBQUUsQ0FBRSxDQUFGLEVBQUksQ0FBSixDQUFGLENBUlA7QUFMTyxDQUFmLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQ1AsSUFBTUMsWUFBWSxHQUFHLENBQXJCO0FBRUE7Ozs7SUFHTUMsTTtBQUNKLGtCQUFZQyxHQUFaLEVBQWlCQyxLQUFqQixFQUF3QkMsTUFBeEIsRUFBZ0M7QUFBQTs7QUFDOUIsU0FBS0MsQ0FBTCxHQUFTRixLQUFLLEdBQUMsQ0FBZjtBQUNBLFNBQUtHLENBQUwsR0FBU0YsTUFBTSxHQUFDLENBQWhCO0FBQ0EsU0FBS0QsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsU0FBS0csS0FBTCxHQUFhUCxZQUFiO0FBQ0EsU0FBS1EsSUFBTCxHQUFZO0FBQ1ZDLFdBQUssRUFBRSxLQURHO0FBRVZDLFVBQUksRUFBRSxLQUZJO0FBR1ZDLFFBQUUsRUFBRSxLQUhNO0FBSVZDLFVBQUksRUFBRTtBQUpJLEtBQVo7QUFNQSxTQUFLQyxJQUFMLEdBQVlYLEdBQUcsQ0FBQ2hCLElBQUosR0FBV2dCLEdBQUcsQ0FBQ2QsS0FBZixHQUF1QmUsS0FBbkM7QUFDQSxTQUFLVyxJQUFMLEdBQVlaLEdBQUcsQ0FBQ2YsSUFBSixHQUFXZSxHQUFHLENBQUNkLEtBQWYsR0FBdUJnQixNQUFuQztBQUNEOzs7O2dDQUVXO0FBQ1YsVUFBSSxDQUFDLEtBQUtJLElBQUwsQ0FBVUMsS0FBZixFQUFzQjtBQUNwQixhQUFLSixDQUFMLElBQVVMLFlBQVY7QUFDRDtBQUNGOzs7K0JBRVU7QUFDVCxVQUFJLENBQUMsS0FBS1EsSUFBTCxDQUFVRSxJQUFmLEVBQXFCO0FBQ25CLGFBQUtMLENBQUwsSUFBVUwsWUFBVjtBQUNEO0FBQ0Y7Ozs2QkFFUTtBQUNQLFVBQUksQ0FBQyxLQUFLUSxJQUFMLENBQVVHLEVBQWYsRUFBbUI7QUFDakIsYUFBS0wsQ0FBTCxJQUFVTixZQUFWO0FBQ0Q7QUFDRjs7OytCQUVVO0FBQ1QsVUFBSSxDQUFDLEtBQUtRLElBQUwsQ0FBVUksSUFBZixFQUFxQjtBQUNuQixhQUFLTixDQUFMLElBQVVOLFlBQVY7QUFDRDtBQUNGOzs7NEJBRU87QUFDTixXQUFLUSxJQUFMLENBQVVDLEtBQVYsR0FBa0IsS0FBbEI7QUFDQSxXQUFLRCxJQUFMLENBQVVFLElBQVYsR0FBaUIsS0FBakI7QUFDQSxXQUFLRixJQUFMLENBQVVHLEVBQVYsR0FBZSxLQUFmO0FBQ0EsV0FBS0gsSUFBTCxDQUFVSSxJQUFWLEdBQWlCLEtBQWpCO0FBQ0Q7Ozs2QkFFUTtBQUNQLGFBQU8sS0FBS0csS0FBWjtBQUNEOzs7Ozs7QUFJWWQscUVBQWYsRTs7Ozs7Ozs7Ozs7O0FDM0RBO0FBQUE7QUFBQTtBQUFPLElBQU16QixPQUFPLEdBQUc7QUFDckJFLFlBQVUsRUFBRTtBQUNWcUIsUUFBSSxFQUFFLFlBREk7QUFFVmlCLFVBQU0sRUFBRTtBQUZFLEdBRFM7QUFLckJ2QyxXQUFTLEVBQUM7QUFDUnNCLFFBQUksRUFBRSxXQURFO0FBRVJpQixVQUFNLEVBQUU7QUFGQSxHQUxXO0FBVXJCckMsV0FBUyxFQUFFO0FBQ1RvQixRQUFJLEVBQUUsV0FERztBQUVUaUIsVUFBTSxFQUFFO0FBRkMsR0FWVTtBQWNyQnpDLFNBQU8sRUFBRTtBQUNQd0IsUUFBSSxFQUFFLFNBREM7QUFFUGlCLFVBQU0sRUFBRTtBQUZELEdBZFk7QUFrQnJCbEMsWUFBVSxFQUFFO0FBQ1ZpQixRQUFJLEVBQUUsWUFESTtBQUVWaUIsVUFBTSxFQUFFO0FBRkUsR0FsQlM7QUFzQnJCakMsV0FBUyxFQUFFO0FBQ1RnQixRQUFJLEVBQUUsV0FERztBQUVUaUIsVUFBTSxFQUFFO0FBRkMsR0F0QlU7QUEwQnJCbkMsU0FBTyxFQUFFO0FBQ1BrQixRQUFJLEVBQUUsU0FEQztBQUVQaUIsVUFBTSxFQUFFO0FBRkQsR0ExQlk7QUE4QnJCcEMsV0FBUyxFQUFFO0FBQ1RtQixRQUFJLEVBQUUsV0FERztBQUVUaUIsVUFBTSxFQUFFO0FBRkM7QUE5QlUsQ0FBaEI7QUFvQ0EsSUFBTUMsY0FBYyxHQUFHLENBQXZCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNwQ0RDLFU7QUFDSix3QkFBYztBQUFBOztBQUNaLFNBQUtSLElBQUwsR0FBWTtBQUFFUyxZQUFNLEVBQUUsS0FBVjtBQUFpQlAsVUFBSSxFQUFFO0FBQXZCLEtBQVo7QUFDQSxTQUFLSCxLQUFMLEdBQWE7QUFBRVUsWUFBTSxFQUFFLEtBQVY7QUFBaUJQLFVBQUksRUFBRTtBQUF2QixLQUFiO0FBQ0EsU0FBS0QsRUFBTCxHQUFVO0FBQUVRLFlBQU0sRUFBRSxLQUFWO0FBQWlCUCxVQUFJLEVBQUU7QUFBdkIsS0FBVjtBQUNBLFNBQUtBLElBQUwsR0FBWTtBQUFFTyxZQUFNLEVBQUUsS0FBVjtBQUFpQlAsVUFBSSxFQUFFO0FBQXZCLEtBQVo7QUFDQSxTQUFLUSxJQUFMO0FBQ0Q7Ozs7cUNBRTZCO0FBQUEsVUFBakJDLElBQWlCLFFBQWpCQSxJQUFpQjtBQUFBLFVBQVhDLE9BQVcsUUFBWEEsT0FBVztBQUM1QixVQUFNQyxTQUFTLEdBQUdGLElBQUksS0FBSyxTQUEzQjs7QUFDQSxjQUFRQyxPQUFSO0FBQ0UsYUFBSyxFQUFMO0FBQVM7QUFDUCxlQUFLWixJQUFMLENBQVVFLElBQVYsR0FBaUJXLFNBQWpCO0FBQ0E7O0FBQ0YsYUFBSyxFQUFMO0FBQVM7QUFDUCxlQUFLWixFQUFMLENBQVFDLElBQVIsR0FBZVcsU0FBZjtBQUNBOztBQUNGLGFBQUssRUFBTDtBQUFTO0FBQ1AsZUFBS2QsS0FBTCxDQUFXRyxJQUFYLEdBQWtCVyxTQUFsQjtBQUNBOztBQUNGLGFBQUssRUFBTDtBQUFTO0FBQ1AsZUFBS1gsSUFBTCxDQUFVQSxJQUFWLEdBQWlCVyxTQUFqQjtBQUNBO0FBWko7QUFjRDs7O21DQUVjO0FBQ2IsYUFBTyxLQUFLYixJQUFMLENBQVVFLElBQWpCO0FBQ0Q7OztvQ0FFZTtBQUNkLGFBQU8sS0FBS0gsS0FBTCxDQUFXRyxJQUFsQjtBQUNEOzs7aUNBRVk7QUFDWCxhQUFPLEtBQUtELEVBQUwsQ0FBUUMsSUFBZjtBQUNEOzs7bUNBRWM7QUFDYixhQUFPLEtBQUtBLElBQUwsQ0FBVUEsSUFBakI7QUFDRDs7OzZCQUVRO0FBQ1AsYUFBTyxDQUFDLEtBQUtZLFlBQUwsRUFBRCxJQUF3QixDQUFDLEtBQUtDLFVBQUwsRUFBekIsSUFBOEMsQ0FBQyxLQUFLQyxhQUFMLEVBQS9DLElBQXVFLENBQUMsS0FBS0MsWUFBTCxFQUEvRTtBQUNEOzs7MkJBRU07QUFDTEMsWUFBTSxDQUFDQyxnQkFBUCxDQUF3QixTQUF4QixFQUFtQyxLQUFLQyxVQUFMLENBQWdCQyxJQUFoQixDQUFxQixJQUFyQixDQUFuQztBQUNBSCxZQUFNLENBQUNDLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLEtBQUtDLFVBQUwsQ0FBZ0JDLElBQWhCLENBQXFCLElBQXJCLENBQWpDO0FBQ0Q7Ozs7OztBQUdZYix5RUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDckRNYyxPO0FBQ0osbUJBQVlDLE1BQVosRUFBb0IvQixHQUFwQixFQUF5QmdDLE1BQXpCLEVBQWlDQyxXQUFqQyxFQUE4Q0MsWUFBOUMsRUFBNEQ7QUFBQTs7QUFDMUQsU0FBS0MsTUFBTCxHQUFlQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsUUFBdkIsRUFBaUNDLFVBQWpDLENBQTRDLElBQTVDLENBQWYsRUFDQSxLQUFLQyxPQUFMLEdBQWVSLE1BQU0sQ0FBQ08sVUFBUCxDQUFrQixJQUFsQixDQURmO0FBRUEsU0FBS0UsSUFBTCxHQUFZeEMsR0FBWjtBQUNBLFNBQUt5QyxNQUFMLEdBQWNSLFdBQWQ7QUFDQSxTQUFLRCxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLVSxPQUFMLEdBQWVSLFlBQWY7QUFDQSxTQUFLQyxNQUFMLENBQVlKLE1BQVosQ0FBbUI5QixLQUFuQixHQUEyQmdDLFdBQTNCO0FBQ0EsU0FBS0UsTUFBTCxDQUFZSixNQUFaLENBQW1CN0IsTUFBbkIsR0FBNEJnQyxZQUE1QjtBQUNEOzs7OytCQUVVUyxLLEVBQU9DLEksRUFBTUMsUSxFQUFVO0FBQUE7O0FBQ2hDLDJCQUFLVixNQUFMLEVBQVlXLFNBQVosc0JBQ0VILEtBREYsNEJBRUtDLElBRkwsSUFHRUMsUUFBUSxDQUFDMUMsQ0FIWCxFQUlFMEMsUUFBUSxDQUFDekMsQ0FKWCxFQUtFeUMsUUFBUSxDQUFDNUMsS0FMWCxFQU1FNEMsUUFBUSxDQUFDM0MsTUFOWDs7QUFRQSxXQUFLNkMsT0FBTDtBQUNEOzs7NEJBRU9DLEssRUFBTztBQUNiLFVBQU1MLEtBQUssR0FBRyxLQUFLSCxJQUFMLENBQVVTLFFBQVYsRUFBZDs7QUFDQSxVQUFNQyxRQUFRLEdBQUcsS0FBS1YsSUFBTCxDQUFVdEQsS0FBM0I7QUFFQSxVQUFNaUUsUUFBUSxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBVyxLQUFLckIsTUFBTCxDQUFZN0IsQ0FBWixHQUFnQixLQUFLcUMsSUFBTCxDQUFVdEQsS0FBckMsQ0FBakI7QUFDQSxVQUFNb0UsTUFBTSxHQUFHSCxRQUFRLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXLEtBQUtyQixNQUFMLENBQVkvQixLQUFaLEdBQW9CLEtBQUt1QyxJQUFMLENBQVV0RCxLQUF6QyxDQUFYLEdBQTZELENBQTVFO0FBQ0EsVUFBTXFFLFFBQVEsR0FBR0gsSUFBSSxDQUFDQyxLQUFMLENBQVcsS0FBS3JCLE1BQUwsQ0FBWTVCLENBQVosR0FBZ0IsS0FBS29DLElBQUwsQ0FBVXRELEtBQXJDLENBQWpCO0FBQ0EsVUFBTXNFLE1BQU0sR0FBR0QsUUFBUSxHQUFHSCxJQUFJLENBQUNDLEtBQUwsQ0FBVyxLQUFLckIsTUFBTCxDQUFZOUIsTUFBWixHQUFxQixLQUFLc0MsSUFBTCxDQUFVdEQsS0FBMUMsQ0FBWCxHQUE4RCxDQUE3RTs7QUFFQSxXQUFLLElBQUl1RSxHQUFHLEdBQUdOLFFBQWYsRUFBeUJNLEdBQUcsSUFBSUgsTUFBaEMsRUFBd0NHLEdBQUcsRUFBM0MsRUFBK0M7QUFDN0MsYUFBSyxJQUFJQyxHQUFHLEdBQUdILFFBQWYsRUFBeUJHLEdBQUcsSUFBSUYsTUFBaEMsRUFBd0NFLEdBQUcsRUFBM0MsRUFBK0M7QUFDN0MsY0FBSXZELENBQUMsR0FBR3NELEdBQUcsR0FBRyxLQUFLakIsSUFBTCxDQUFVdEQsS0FBaEIsR0FBd0IsS0FBSzhDLE1BQUwsQ0FBWTdCLENBQTVDO0FBQ0EsY0FBSUMsQ0FBQyxHQUFHc0QsR0FBRyxHQUFHLEtBQUtsQixJQUFMLENBQVV0RCxLQUFoQixHQUF3QixLQUFLOEMsTUFBTCxDQUFZNUIsQ0FBNUM7O0FBQ0EsY0FBTXVELFdBQVcsR0FBRyxLQUFLbkIsSUFBTCxDQUFVb0IsT0FBVixDQUFrQlosS0FBbEIsRUFBeUJTLEdBQXpCLEVBQThCQyxHQUE5QixDQUFwQjs7QUFDQSxjQUFJQyxXQUFXLEtBQUssQ0FBcEIsRUFBdUI7QUFDdkIsZUFBS3hCLE1BQUwsQ0FBWVcsU0FBWixDQUNFSCxLQURGLEVBQ1M7QUFDUCxXQUFDZ0IsV0FBVyxHQUFHLENBQWYsSUFBb0JULFFBRnRCLEVBRWdDO0FBQzlCLFdBSEYsRUFHSztBQUNIQSxrQkFKRixFQUlZO0FBQ1ZBLGtCQUxGLEVBS1k7QUFDVkUsY0FBSSxDQUFDQyxLQUFMLENBQVdsRCxDQUFYLENBTkYsRUFNaUI7QUFDZmlELGNBQUksQ0FBQ0MsS0FBTCxDQUFXakQsQ0FBWCxDQVBGLEVBT2lCO0FBQ2Y4QyxrQkFSRixFQVFZO0FBQ1ZBLGtCQVRGLENBU1c7QUFUWDtBQVdEO0FBQ0Y7O0FBQ0QsV0FBS0gsT0FBTDtBQUNEOzs7NkJBR1E7QUFDUCxVQUFNYyxLQUFLLEdBQUcsS0FBS3JCLElBQUwsQ0FBVXRDLE1BQVYsR0FBbUIsS0FBS3NDLElBQUwsQ0FBVXZDLEtBQTNDOztBQUNBLFVBQUksS0FBS3lDLE9BQUwsR0FBZSxLQUFLRCxNQUFwQixHQUE2Qm9CLEtBQWpDLEVBQXdDO0FBQ3RDLGFBQUt0QixPQUFMLENBQWFSLE1BQWIsQ0FBb0I3QixNQUFwQixHQUE2QixLQUFLdUMsTUFBTCxHQUFjb0IsS0FBM0M7QUFDQSxhQUFLdEIsT0FBTCxDQUFhUixNQUFiLENBQW9COUIsS0FBcEIsR0FBNEIsS0FBS3dDLE1BQWpDO0FBQ0QsT0FIRCxNQUdPO0FBQ0wsYUFBS0YsT0FBTCxDQUFhUixNQUFiLENBQW9CN0IsTUFBcEIsR0FBNkIsS0FBS3dDLE9BQWxDO0FBQ0EsYUFBS0gsT0FBTCxDQUFhUixNQUFiLENBQW9COUIsS0FBcEIsR0FBNEIsS0FBS3lDLE9BQUwsR0FBZW1CLEtBQTNDO0FBQ0Q7O0FBQ0QsV0FBS3RCLE9BQUwsQ0FBYXVCLHFCQUFiLEdBQXFDLElBQXJDO0FBQ0Q7Ozs4QkFFUztBQUNSLFdBQUt2QixPQUFMLENBQWFPLFNBQWIsQ0FDRSxLQUFLWCxNQUFMLENBQVlKLE1BRGQsRUFFRSxDQUZGLEVBR0UsQ0FIRixFQUlFLEtBQUtJLE1BQUwsQ0FBWUosTUFBWixDQUFtQjlCLEtBSnJCLEVBS0UsS0FBS2tDLE1BQUwsQ0FBWUosTUFBWixDQUFtQjdCLE1BTHJCLEVBTUUsQ0FORixFQU9FLENBUEYsRUFRRSxLQUFLcUMsT0FBTCxDQUFhUixNQUFiLENBQW9COUIsS0FSdEIsRUFTRSxLQUFLc0MsT0FBTCxDQUFhUixNQUFiLENBQW9CN0IsTUFUdEI7QUFXRDs7O3NCQUVPNkQsSyxFQUFPO0FBQ2IsV0FBS3ZCLElBQUwsR0FBWXVCLEtBQVo7QUFDRDs7Ozs7O0FBSVlqQyxzRUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDeEZNa0MsTTtBQUNKLGtCQUFZQyxNQUFaLEVBQW9CQyxNQUFwQixFQUE0QjtBQUFBOztBQUMxQixTQUFLQyxvQkFBTDtBQUNBLFNBQUtDLFVBQUwsR0FBa0IsT0FBSyxFQUF2QjtBQUNBLFNBQUtGLE1BQUwsR0FBY0EsTUFBZDtBQUNBLFNBQUtELE1BQUwsR0FBY0EsTUFBZDtBQUNEOzs7O3dCQUVHSSxNLEVBQVE7QUFDVjtBQUNBLFVBQU1DLFFBQVEsR0FBRyxLQUFLQyxRQUFMLEdBQWdCLEtBQUtILFVBQXRDO0FBQ0EsVUFBSUksUUFBUSxHQUFHLENBQWYsQ0FIVSxDQUtWOztBQUNBLFVBQUlILE1BQU0sR0FBR0MsUUFBYixFQUF1QjtBQUNyQkUsZ0JBQVEsR0FBR3BCLElBQUksQ0FBQ0MsS0FBTCxDQUFXLENBQUNnQixNQUFNLEdBQUcsS0FBS0UsUUFBZixJQUEyQixLQUFLSCxVQUEzQyxDQUFYO0FBQ0QsT0FSUyxDQVVWOzs7QUFDQSxXQUFLLElBQUlLLENBQUMsR0FBQyxDQUFYLEVBQWNBLENBQUMsR0FBQ0QsUUFBaEIsRUFBMEJDLENBQUMsRUFBM0IsRUFBK0I7QUFDN0IsYUFBS0YsUUFBTCxHQUFnQixLQUFLQSxRQUFMLEdBQWdCLEtBQUtILFVBQXJDO0FBQ0EsYUFBS0YsTUFBTDtBQUNEOztBQUVELFdBQUtELE1BQUw7QUFDQSxXQUFLRSxvQkFBTCxHQUE0QnpDLE1BQU0sQ0FBQ2dELHFCQUFQLENBQTZCLEtBQUtDLFNBQWxDLENBQTVCO0FBRUQ7Ozs0QkFFTztBQUFBOztBQUNOLFdBQUtKLFFBQUwsR0FBZ0JLLFdBQVcsQ0FBQ0MsR0FBWixFQUFoQjs7QUFDQSxXQUFLRixTQUFMLEdBQWlCLFVBQUNHLENBQUQ7QUFBQSxlQUFPLEtBQUksQ0FBQ0MsR0FBTCxDQUFTRCxDQUFULENBQVA7QUFBQSxPQUFqQjs7QUFDQSxXQUFLWCxvQkFBTCxHQUE0QnpDLE1BQU0sQ0FBQ2dELHFCQUFQLENBQTZCLEtBQUtDLFNBQWxDLENBQTVCO0FBQ0Q7OzsyQkFFTTtBQUNMakQsWUFBTSxDQUFDc0Qsb0JBQVAsQ0FBNEIsS0FBS2Isb0JBQWpDO0FBQ0Q7Ozs7OztBQUdZSCxxRUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4Q0E7QUFFQSxJQUFNaUIsYUFBYSxHQUFHLENBQXRCO0FBQ0EsSUFBTUMsY0FBYyxHQUFHLENBQXZCOztJQUVNQyxPOzs7OztBQUNMLHlCQU1HO0FBQUE7O0FBQUEsUUFMRnBHLEdBS0UsUUFMRkEsR0FLRTtBQUFBLFFBSkZDLElBSUUsUUFKRkEsSUFJRTtBQUFBLFFBSEZDLElBR0UsUUFIRkEsSUFHRTtBQUFBLFFBRkZTLFlBRUUsUUFGRkEsWUFFRTtBQUFBLFFBREMwRixJQUNEOztBQUFBOztBQUNGLDhCQUFNO0FBQUVyRyxTQUFHLEVBQUhBO0FBQUYsS0FBTjtBQUNBLFVBQUtXLFlBQUwsR0FBb0JBLFlBQXBCO0FBQ0EsVUFBSzJGLGlCQUFMLEdBQXlCO0FBQ3hCcEcsVUFBSSxFQUFKQSxJQUR3QjtBQUV4QkQsVUFBSSxFQUFKQTtBQUZ3QixLQUF6Qjs7QUFJQSx1Q0FBOEJzRyxNQUFNLENBQUNDLE9BQVAsQ0FBZUgsSUFBZixDQUE5QixxQ0FBb0Q7QUFBQTtBQUFBLFVBQXZDSSxJQUF1QztBQUFBLFVBQWpDekIsS0FBaUM7O0FBQ25ELFVBQUlBLEtBQUssS0FBSzBCLFNBQWQsRUFBeUI7QUFDekIsWUFBS0QsSUFBTCxJQUFhekIsS0FBYjtBQUNBOztBQUNELFVBQUsyQixpQkFBTDs7QUFDQSxVQUFLQyxpQkFBTDs7QUFaRTtBQWFGOzs7OzhCQUU0QjtBQUFBLFVBQXJCM0MsS0FBcUIsdUVBQWIsQ0FBYTtBQUFBLFVBQVZTLEdBQVU7QUFBQSxVQUFMQyxHQUFLO0FBQzVCLGFBQU8sS0FBS2tDLE1BQUwsQ0FBWTVDLEtBQVosRUFBbUJVLEdBQUcsR0FBRyxLQUFLMUUsSUFBWCxHQUFrQnlFLEdBQXJDLENBQVA7QUFDQTs7OztBQVVEOzs7Ozt3Q0FLb0I7QUFBQSxrQ0FDSSxLQUFLNEIsaUJBRFQ7QUFBQSxVQUNYcEcsSUFEVyx5QkFDWEEsSUFEVztBQUFBLFVBQ0xELElBREsseUJBQ0xBLElBREs7QUFFbkIsV0FBSzRHLE1BQUwsR0FBYyxDQUFFLEtBQUtDLFVBQUwsQ0FBZ0IsS0FBS25HLFlBQXJCLEVBQW1DVCxJQUFuQyxFQUF5Q0QsSUFBekMsRUFBK0NpRyxhQUEvQyxFQUE4REMsY0FBOUQsQ0FBRixDQUFkO0FBQ0EsV0FBS2pHLElBQUwsR0FBWUEsSUFBSSxHQUFHLElBQUlnRyxhQUF2QixDQUhtQixDQUdtQjs7QUFDdEMsV0FBS2pHLElBQUwsR0FBWUEsSUFBSSxHQUFHLElBQUlpRyxhQUF2QixDQUptQixDQUltQjs7QUFDdEMsV0FBS2EsY0FBTDtBQUNBOzs7cUNBRWdCO0FBQUE7O0FBQUEsMkJBQ2tCLEtBQUszRyxRQUR2QjtBQUFBLFVBQ1JDLFdBRFEsa0JBQ1JBLFdBRFE7QUFBQSxVQUNLQyxRQURMLGtCQUNLQSxRQURMO0FBRWhCLFVBQUkwRyxRQUFRLEdBQUcsSUFBSUMsS0FBSixDQUFVLEtBQUsvRyxJQUFMLEdBQVUsS0FBS0QsSUFBekIsRUFBK0JpSCxJQUEvQixDQUFvQyxDQUFwQyxDQUFmO0FBQ0EsV0FBS0wsTUFBTCxDQUFZLENBQVosRUFBZU0sT0FBZixDQUF1QixVQUFDdEQsSUFBRCxFQUFPNkIsQ0FBUCxFQUFhO0FBQ25DLFlBQUk3QixJQUFJLEtBQUt4RCxXQUFiLEVBQTBCO0FBQ3pCMkcsa0JBQVEsQ0FBQ3RCLENBQUMsR0FBRyxNQUFJLENBQUN4RixJQUFWLENBQVIsR0FBMEJJLFFBQTFCO0FBQ0E7QUFDRCxPQUpEO0FBS0EsV0FBS3VHLE1BQUwsQ0FBWSxDQUFaLElBQWlCRyxRQUFqQjtBQUNBOzs7d0NBRW1CO0FBQUEsbUNBQ0ksS0FBS1YsaUJBRFQ7QUFBQSxVQUNYcEcsSUFEVywwQkFDWEEsSUFEVztBQUFBLFVBQ0xELElBREssMEJBQ0xBLElBREs7QUFFbkIsVUFBSW1ILHdCQUF3QixHQUFHLEtBQUt6RyxZQUFMLENBQWtCTSxHQUFsQixDQUFzQixVQUFBb0csQ0FBQyxFQUFJO0FBQ3pELFlBQUlBLENBQUMsS0FBSyxDQUFWLEVBQWEsT0FBUSxDQUFSO0FBQ2IsZUFBTyxDQUFQO0FBQ0EsT0FIOEIsQ0FBL0I7QUFJQSxXQUFLQyxhQUFMLEdBQXFCLEtBQUtSLFVBQUwsQ0FBZ0JNLHdCQUFoQixFQUEwQ2xILElBQTFDLEVBQWdERCxJQUFoRCxFQUFzRGlHLGFBQXRELEVBQXFFLENBQXJFLENBQXJCO0FBQ0E7QUFFRDs7Ozs7Ozs7OzhCQU1VOUUsQyxFQUFHQyxDLEVBQUc7QUFDZixVQUFNcUQsR0FBRyxHQUFHTCxJQUFJLENBQUNDLEtBQUwsQ0FBV2xELENBQUMsR0FBRyxLQUFLakIsS0FBcEIsQ0FBWjtBQUNBLFVBQU13RSxHQUFHLEdBQUdOLElBQUksQ0FBQ0MsS0FBTCxDQUFXakQsQ0FBQyxHQUFHLEtBQUtsQixLQUFwQixDQUFaO0FBQ0EsYUFBTyxLQUFLbUgsYUFBTCxDQUFtQjNDLEdBQUcsR0FBRyxLQUFLMUUsSUFBWCxHQUFrQnlFLEdBQXJDLENBQVA7QUFDQTtBQUVEOzs7Ozs7OztpQ0FLYTZDLEksRUFBTUMsUyxFQUFXO0FBQzdCLFVBQUlDLFlBQVksR0FBRyxJQUFuQjtBQUNBLFVBQUkvQixDQUFDLEdBQUcsQ0FBUjtBQUNBNkIsVUFBSSxDQUFDSixPQUFMLENBQWEsVUFBQUUsQ0FBQyxFQUFJO0FBQ2pCLFlBQUkzQixDQUFDLEtBQUs4QixTQUFWLEVBQXFCO0FBQ3BCQyxzQkFBWSxJQUFJLElBQWhCO0FBQ0EvQixXQUFDLEdBQUcsQ0FBSjtBQUNBOztBQUNEK0Isb0JBQVksSUFBSUMsTUFBTSxDQUFDTCxDQUFELENBQU4sR0FBWSxJQUE1QjtBQUNBM0IsU0FBQztBQUNELE9BUEQ7QUFRQStCLGtCQUFZLElBQUksSUFBaEI7QUFDQTtBQUdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsrQkFtQ1dFLFksRUFBY0MsTyxFQUFTQyxPLEVBQVNDLFMsRUFBV0MsVSxFQUFZO0FBQ2pFLFVBQUlDLE9BQU8sR0FBRyxFQUFkO0FBQ0EsVUFBTUMsU0FBUyxHQUFHTCxPQUFPLEdBQUcsSUFBRUUsU0FBOUI7QUFDQSxVQUFNSSxTQUFTLEdBQUksSUFBSWpCLEtBQUosQ0FBVWdCLFNBQVYsRUFBcUJmLElBQXJCLENBQTBCYSxVQUExQixDQUFuQjs7QUFDQSxXQUFLLElBQUlyQyxDQUFDLEdBQUMsQ0FBWCxFQUFjQSxDQUFDLEdBQUNvQyxTQUFoQixFQUEyQnBDLENBQUMsRUFBNUIsRUFBZ0M7QUFDOUJzQyxlQUFPLGdDQUFRQSxPQUFSLHNCQUFvQkUsU0FBcEIsRUFBUDtBQUNEOztBQUNELFdBQUssSUFBSXhDLEdBQUMsR0FBQyxDQUFYLEVBQWNBLEdBQUMsR0FBR2tDLE9BQWxCLEVBQTJCbEMsR0FBQyxFQUE1QixFQUFnQztBQUMvQixZQUFJeUMsT0FBTyxnQ0FDTixJQUFJbEIsS0FBSixDQUFVYSxTQUFWLEVBQXFCWixJQUFyQixDQUEwQmEsVUFBMUIsQ0FETSxzQkFFUEosWUFBWSxDQUFDUyxLQUFiLENBQW1CUCxPQUFPLEdBQUNuQyxHQUEzQixFQUE4Qm1DLE9BQU8sR0FBQ25DLEdBQVIsR0FBWWtDLE9BQTFDLENBRk8sc0JBR04sSUFBSVgsS0FBSixDQUFVYSxTQUFWLEVBQXFCWixJQUFyQixDQUEwQmEsVUFBMUIsQ0FITSxFQUFYO0FBS0FDLGVBQU8sZ0NBQVFBLE9BQVIsc0JBQW9CRyxPQUFwQixFQUFQO0FBQ0E7O0FBQ0QsV0FBSyxJQUFJekMsR0FBQyxHQUFDLENBQVgsRUFBY0EsR0FBQyxHQUFDb0MsU0FBaEIsRUFBMkJwQyxHQUFDLEVBQTVCLEVBQWdDO0FBQzlCc0MsZUFBTyxnQ0FBUUEsT0FBUixzQkFBb0JFLFNBQXBCLEVBQVA7QUFDRDs7QUFDRCxhQUFPRixPQUFQO0FBQ0E7Ozt3QkEvSFc7QUFDWCxhQUFPLEtBQUs3SCxLQUFMLEdBQWEsS0FBS0QsSUFBekI7QUFDQTs7O3dCQUVZO0FBQ1osYUFBTyxLQUFLQyxLQUFMLEdBQWEsS0FBS0YsSUFBekI7QUFDQTs7OztFQWhDb0JvSSw0RDs7QUE0SlBqQyxzRUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDaktNa0MsSTtBQUNMLGdCQUFZckgsR0FBWixFQUFpQnNILE1BQWpCLEVBQXlCdEYsTUFBekIsRUFBaUM7QUFBQTs7QUFDaEMsU0FBS2hDLEdBQUwsR0FBV0EsR0FBWDtBQUNBLFNBQUtzSCxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLdEYsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsU0FBS3VGLGVBQUwsR0FBdUIsS0FBS3ZGLE1BQUwsQ0FBWTNCLEtBQW5DO0FBQ0E7Ozs7NkJBRVE7QUFDUixXQUFLaUgsTUFBTCxDQUFZcEQsTUFBWjtBQUNBLFdBQUtzRCxPQUFMO0FBQ0E7OztvQ0FFZTtBQUNmLDZDQUNJLEtBQUtGLE1BQUwsQ0FBWUcsbUJBQVosRUFESjtBQUVDeEgsYUFBSyxFQUFFLEtBQUtxSCxNQUFMLENBQVlySCxLQUZwQjtBQUdDQyxjQUFNLEVBQUUsS0FBS29ILE1BQUwsQ0FBWXBILE1BSHJCO0FBSUN3SCxhQUFLLEVBQUUsS0FBS0osTUFBTCxDQUFZSTtBQUpwQjtBQU1BOzs7K0JBRVVDLFMsRUFBVztBQUNyQixVQUFJQSxTQUFTLEtBQUssT0FBbEIsRUFBMkIsS0FBS0wsTUFBTCxDQUFZTSxTQUFaO0FBQzNCLFVBQUlELFNBQVMsS0FBSyxNQUFsQixFQUEwQixLQUFLTCxNQUFMLENBQVlPLFFBQVo7QUFDMUIsVUFBSUYsU0FBUyxLQUFLLElBQWxCLEVBQXdCLEtBQUtMLE1BQUwsQ0FBWVEsTUFBWjtBQUN4QixVQUFJSCxTQUFTLEtBQUssTUFBbEIsRUFBMEIsS0FBS0wsTUFBTCxDQUFZUyxRQUFaO0FBQzFCLFVBQUlKLFNBQVMsS0FBSyxNQUFsQixFQUEwQixLQUFLTCxNQUFMLENBQVlVLE9BQVo7QUFDMUIsSyxDQUdEOzs7OzhCQUNVO0FBQ1QsV0FBS2hHLE1BQUwsQ0FBWWlHLEtBQVo7QUFDQSxXQUFLakcsTUFBTCxDQUFZMUIsSUFBWixDQUFpQkUsSUFBakIsR0FBd0IsS0FBSzBILGNBQUwsRUFBeEI7QUFDQSxXQUFLbEcsTUFBTCxDQUFZMUIsSUFBWixDQUFpQkMsS0FBakIsR0FBeUIsS0FBSzRILGVBQUwsRUFBekI7QUFDQSxXQUFLbkcsTUFBTCxDQUFZMUIsSUFBWixDQUFpQkcsRUFBakIsR0FBc0IsS0FBSzJILGFBQUwsRUFBdEI7QUFDQSxXQUFLcEcsTUFBTCxDQUFZMUIsSUFBWixDQUFpQkksSUFBakIsR0FBd0IsS0FBSzJILGdCQUFMLEVBQXhCO0FBQ0E7QUFFRDs7Ozs7Ozs7Ozs7O3NDQVVrQjtBQUNqQixVQUFNQyxHQUFHLEdBQUcsQ0FBRSxLQUFLaEIsTUFBTCxDQUFZbkgsQ0FBWixHQUFnQixLQUFLbUgsTUFBTCxDQUFZckgsS0FBNUIsR0FBb0MsS0FBS3NILGVBQTNDLEVBQTRELEtBQUtELE1BQUwsQ0FBWWxILENBQXhFLENBQVo7QUFDQSxVQUFNbUksR0FBRyxHQUFHLENBQUUsS0FBS2pCLE1BQUwsQ0FBWW5ILENBQVosR0FBZ0IsS0FBS21ILE1BQUwsQ0FBWXJILEtBQTVCLEdBQW9DLEtBQUtzSCxlQUEzQyxFQUE0RCxLQUFLRCxNQUFMLENBQVlsSCxDQUFaLEdBQWdCLENBQTVFLENBQVo7QUFDQSxVQUFNb0ksS0FBSyxHQUFHLENBQUUsS0FBS2xCLE1BQUwsQ0FBWW5ILENBQVosR0FBZ0IsS0FBS21ILE1BQUwsQ0FBWXJILEtBQTVCLEdBQW9DLEtBQUtzSCxlQUEzQyxFQUE0RCxLQUFLRCxNQUFMLENBQVlsSCxDQUFaLEdBQWdCLEtBQUtrSCxNQUFMLENBQVlwSCxNQUF4RixDQUFkO0FBQ0EsVUFBTXVJLElBQUksR0FBRyxDQUFFLEtBQUtuQixNQUFMLENBQVluSCxDQUFaLEdBQWdCLEtBQUttSCxNQUFMLENBQVlySCxLQUE1QixHQUFvQyxLQUFLc0gsZUFBM0MsRUFBNEQsS0FBS0QsTUFBTCxDQUFZbEgsQ0FBWixHQUFnQixLQUFLa0gsTUFBTCxDQUFZcEgsTUFBNUIsR0FBcUMsQ0FBakcsQ0FBYjtBQUNBLFVBQU13SSxLQUFLLEdBQUdDLE9BQU8sQ0FBQyxLQUFLM0ksR0FBTCxDQUFTNEksU0FBVCxDQUFtQk4sR0FBRyxDQUFDLENBQUQsQ0FBdEIsRUFBMkJBLEdBQUcsQ0FBQyxDQUFELENBQTlCLENBQUQsQ0FBUCxJQUErQ0ssT0FBTyxDQUFDLEtBQUszSSxHQUFMLENBQVM0SSxTQUFULENBQW1CTCxHQUFHLENBQUMsQ0FBRCxDQUF0QixFQUEyQkEsR0FBRyxDQUFDLENBQUQsQ0FBOUIsQ0FBRCxDQUFwRTtBQUNBLFVBQU1NLE1BQU0sR0FBR0YsT0FBTyxDQUFDLEtBQUszSSxHQUFMLENBQVM0SSxTQUFULENBQW1CSixLQUFLLENBQUMsQ0FBRCxDQUF4QixFQUE2QkEsS0FBSyxDQUFDLENBQUQsQ0FBbEMsQ0FBRCxDQUFQLElBQW1ERyxPQUFPLENBQUMsS0FBSzNJLEdBQUwsQ0FBUzRJLFNBQVQsQ0FBbUJILElBQUksQ0FBQyxDQUFELENBQXZCLEVBQTRCQSxJQUFJLENBQUMsQ0FBRCxDQUFoQyxDQUFELENBQXpFO0FBQ0EsYUFBT0MsS0FBSyxJQUFJRyxNQUFoQjtBQUNBOzs7cUNBRWdCO0FBQ2hCLFVBQU1QLEdBQUcsR0FBRyxDQUFFLEtBQUtoQixNQUFMLENBQVluSCxDQUFaLEdBQWdCLEtBQUtvSCxlQUF2QixFQUF3QyxLQUFLRCxNQUFMLENBQVlsSCxDQUFwRCxDQUFaO0FBQ0EsVUFBTW1JLEdBQUcsR0FBRyxDQUFFLEtBQUtqQixNQUFMLENBQVluSCxDQUFaLEdBQWdCLEtBQUtvSCxlQUF2QixFQUF3QyxLQUFLRCxNQUFMLENBQVlsSCxDQUFaLEdBQWdCLENBQXhELENBQVo7QUFDQSxVQUFNb0ksS0FBSyxHQUFHLENBQUUsS0FBS2xCLE1BQUwsQ0FBWW5ILENBQVosR0FBZ0IsS0FBS29ILGVBQXZCLEVBQXdDLEtBQUtELE1BQUwsQ0FBWWxILENBQVosR0FBaUIsS0FBS2tILE1BQUwsQ0FBWXBILE1BQXJFLENBQWQ7QUFDQSxVQUFNdUksSUFBSSxHQUFHLENBQUUsS0FBS25CLE1BQUwsQ0FBWW5ILENBQVosR0FBZ0IsS0FBS29ILGVBQXZCLEVBQXdDLEtBQUtELE1BQUwsQ0FBWWxILENBQVosR0FBZ0IsS0FBS2tILE1BQUwsQ0FBWXBILE1BQTVCLEdBQXFDLENBQTdFLENBQWI7QUFDQSxVQUFNd0ksS0FBSyxHQUFHQyxPQUFPLENBQUMsS0FBSzNJLEdBQUwsQ0FBUzRJLFNBQVQsQ0FBbUJOLEdBQUcsQ0FBQyxDQUFELENBQXRCLEVBQTJCQSxHQUFHLENBQUMsQ0FBRCxDQUE5QixDQUFELENBQVAsSUFBK0NLLE9BQU8sQ0FBQyxLQUFLM0ksR0FBTCxDQUFTNEksU0FBVCxDQUFtQkwsR0FBRyxDQUFDLENBQUQsQ0FBdEIsRUFBMkJBLEdBQUcsQ0FBQyxDQUFELENBQTlCLENBQUQsQ0FBcEU7QUFDQSxVQUFNTSxNQUFNLEdBQUdGLE9BQU8sQ0FBQyxLQUFLM0ksR0FBTCxDQUFTNEksU0FBVCxDQUFtQkosS0FBSyxDQUFDLENBQUQsQ0FBeEIsRUFBNkJBLEtBQUssQ0FBQyxDQUFELENBQWxDLENBQUQsQ0FBUCxJQUFtREcsT0FBTyxDQUFDLEtBQUszSSxHQUFMLENBQVM0SSxTQUFULENBQW1CSCxJQUFJLENBQUMsQ0FBRCxDQUF2QixFQUE0QkEsSUFBSSxDQUFDLENBQUQsQ0FBaEMsQ0FBRCxDQUF6RTtBQUNBLGFBQU9DLEtBQUssSUFBSUcsTUFBaEI7QUFDQTs7O29DQUVlO0FBQ2YsVUFBTVAsR0FBRyxHQUFHLENBQUUsS0FBS2hCLE1BQUwsQ0FBWW5ILENBQWQsRUFBaUIsS0FBS21ILE1BQUwsQ0FBWWxILENBQVosR0FBZ0IsS0FBS21ILGVBQXRDLENBQVo7QUFDQSxVQUFNZ0IsR0FBRyxHQUFHLENBQUUsS0FBS2pCLE1BQUwsQ0FBWW5ILENBQVosR0FBZ0IsQ0FBbEIsRUFBcUIsS0FBS21ILE1BQUwsQ0FBWWxILENBQVosR0FBaUIsS0FBS21ILGVBQTNDLENBQVo7QUFDQSxVQUFNaUIsS0FBSyxHQUFHLENBQUUsS0FBS2xCLE1BQUwsQ0FBWW5ILENBQVosR0FBZ0IsS0FBS21ILE1BQUwsQ0FBWXJILEtBQTlCLEVBQXFDLEtBQUtxSCxNQUFMLENBQVlsSCxDQUFaLEdBQWdCLEtBQUttSCxlQUExRCxDQUFkO0FBQ0EsVUFBTWtCLElBQUksR0FBRyxDQUFFLEtBQUtuQixNQUFMLENBQVluSCxDQUFaLEdBQWdCLEtBQUttSCxNQUFMLENBQVlySCxLQUE1QixHQUFvQyxDQUF0QyxFQUF5QyxLQUFLcUgsTUFBTCxDQUFZbEgsQ0FBWixHQUFnQixLQUFLbUgsZUFBOUQsQ0FBYjtBQUNBLFVBQU1tQixLQUFLLEdBQUdDLE9BQU8sQ0FBQyxLQUFLM0ksR0FBTCxDQUFTNEksU0FBVCxDQUFtQk4sR0FBRyxDQUFDLENBQUQsQ0FBdEIsRUFBMkJBLEdBQUcsQ0FBQyxDQUFELENBQTlCLENBQUQsQ0FBUCxJQUErQ0ssT0FBTyxDQUFDLEtBQUszSSxHQUFMLENBQVM0SSxTQUFULENBQW1CTCxHQUFHLENBQUMsQ0FBRCxDQUF0QixFQUEyQkEsR0FBRyxDQUFDLENBQUQsQ0FBOUIsQ0FBRCxDQUFwRTtBQUNBLFVBQU1NLE1BQU0sR0FBR0YsT0FBTyxDQUFDLEtBQUszSSxHQUFMLENBQVM0SSxTQUFULENBQW1CSixLQUFLLENBQUMsQ0FBRCxDQUF4QixFQUE2QkEsS0FBSyxDQUFDLENBQUQsQ0FBbEMsQ0FBRCxDQUFQLElBQW1ERyxPQUFPLENBQUMsS0FBSzNJLEdBQUwsQ0FBUzRJLFNBQVQsQ0FBbUJILElBQUksQ0FBQyxDQUFELENBQXZCLEVBQTRCQSxJQUFJLENBQUMsQ0FBRCxDQUFoQyxDQUFELENBQXpFO0FBQ0EsYUFBT0MsS0FBSyxJQUFJRyxNQUFoQjtBQUNBOzs7dUNBRWtCO0FBQ2xCLFVBQU1QLEdBQUcsR0FBRyxDQUFFLEtBQUtoQixNQUFMLENBQVluSCxDQUFkLEVBQWlCLEtBQUttSCxNQUFMLENBQVlsSCxDQUFaLEdBQWdCLEtBQUtrSCxNQUFMLENBQVlwSCxNQUE1QixHQUFxQyxLQUFLcUgsZUFBM0QsQ0FBWjtBQUNBLFVBQU1nQixHQUFHLEdBQUcsQ0FBRSxLQUFLakIsTUFBTCxDQUFZbkgsQ0FBWixHQUFnQixDQUFsQixFQUFxQixLQUFLbUgsTUFBTCxDQUFZbEgsQ0FBWixHQUFnQixLQUFLa0gsTUFBTCxDQUFZcEgsTUFBNUIsR0FBcUMsS0FBS3FILGVBQS9ELENBQVo7QUFDQSxVQUFNaUIsS0FBSyxHQUFHLENBQUUsS0FBS2xCLE1BQUwsQ0FBWW5ILENBQVosR0FBZ0IsS0FBS21ILE1BQUwsQ0FBWXJILEtBQTlCLEVBQXFDLEtBQUtxSCxNQUFMLENBQVlsSCxDQUFaLEdBQWdCLEtBQUtrSCxNQUFMLENBQVlwSCxNQUE1QixHQUFxQyxLQUFLcUgsZUFBL0UsQ0FBZDtBQUNBLFVBQU1rQixJQUFJLEdBQUcsQ0FBRSxLQUFLbkIsTUFBTCxDQUFZbkgsQ0FBWixHQUFnQixLQUFLbUgsTUFBTCxDQUFZckgsS0FBNUIsR0FBb0MsQ0FBdEMsRUFBeUMsS0FBS3FILE1BQUwsQ0FBWWxILENBQVosR0FBZ0IsS0FBS2tILE1BQUwsQ0FBWXBILE1BQTVCLEdBQXFDLEtBQUtxSCxlQUFuRixDQUFiO0FBQ0EsVUFBTW1CLEtBQUssR0FBR0MsT0FBTyxDQUFDLEtBQUszSSxHQUFMLENBQVM0SSxTQUFULENBQW1CTixHQUFHLENBQUMsQ0FBRCxDQUF0QixFQUEyQkEsR0FBRyxDQUFDLENBQUQsQ0FBOUIsQ0FBRCxDQUFQLElBQStDSyxPQUFPLENBQUMsS0FBSzNJLEdBQUwsQ0FBUzRJLFNBQVQsQ0FBbUJMLEdBQUcsQ0FBQyxDQUFELENBQXRCLEVBQTJCQSxHQUFHLENBQUMsQ0FBRCxDQUE5QixDQUFELENBQXBFO0FBQ0EsVUFBTU0sTUFBTSxHQUFHRixPQUFPLENBQUMsS0FBSzNJLEdBQUwsQ0FBUzRJLFNBQVQsQ0FBbUJKLEtBQUssQ0FBQyxDQUFELENBQXhCLEVBQTZCQSxLQUFLLENBQUMsQ0FBRCxDQUFsQyxDQUFELENBQVAsSUFBbURHLE9BQU8sQ0FBQyxLQUFLM0ksR0FBTCxDQUFTNEksU0FBVCxDQUFtQkgsSUFBSSxDQUFDLENBQUQsQ0FBdkIsRUFBNEJBLElBQUksQ0FBQyxDQUFELENBQWhDLENBQUQsQ0FBekU7QUFDQSxhQUFPQyxLQUFLLElBQUlHLE1BQWhCO0FBQ0E7Ozs7OztBQUdheEIsbUVBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUl5QixPQUFKLEVBQWFDLE1BQWIsRUFBcUJ6QyxJQUFyQixFQUEyQjBDLFVBQTNCO0FBQ0E7QUFDQTtBQUNBLElBQU1oSixHQUFHLEdBQUcsSUFBSW1GLG9EQUFKLENBQVlyRyxvREFBWixDQUFaO0FBRUEsSUFBTW1LLElBQUksR0FBRyxHQUFiO0FBQ0EsSUFBTUMsU0FBUyxHQUFHRCxJQUFsQjtBQUNBLElBQU1FLFVBQVUsR0FBR0YsSUFBbkI7QUFDQSxJQUFNakgsTUFBTSxHQUFHLElBQUlqQyxrREFBSixDQUFXQyxHQUFYLEVBQWdCaUosSUFBaEIsRUFBc0JBLElBQXRCLENBQWY7QUFFQSxJQUFNM0IsTUFBTSxHQUFHLElBQUk4QixrREFBSixDQUFXLEVBQVgsRUFBZXBILE1BQWYsRUFBdUJoQyxHQUF2QixDQUFmO0FBQ0EsSUFBTXFKLGNBQWMsR0FBRyxJQUFJQyxrRUFBSixpQ0FDbEIzSixxREFEa0I7QUFFckI0SixpQkFBZSxFQUFFakMsTUFBTSxDQUFDa0MsWUFBUCxFQUZJLENBRWtCOztBQUZsQixHQUF2QjtBQU1BSCxjQUFjLENBQUNJLFNBQWYsQ0FBeUIsWUFBTTtBQUM3QnhGLFFBQU07QUFDUCxDQUZEOztBQUlBLElBQU1BLE1BQU0sR0FBRyxTQUFUQSxNQUFTLEdBQU07QUFDbkI2RSxTQUFPLENBQUNZLE9BQVIsQ0FBZ0IsQ0FBaEI7O0FBRG1CLDZCQUVlcEMsTUFBTSxDQUFDa0MsWUFBUCxFQUZmO0FBQUEsTUFFWEcsTUFGVyx3QkFFWEEsTUFGVztBQUFBLE1BRUhDLGFBRkcsd0JBRUhBLGFBRkc7O0FBR25CLE1BQU1DLEtBQUssR0FBR1IsY0FBYyxDQUFDUyxlQUFmLENBQStCSCxNQUEvQixFQUF1Q0MsYUFBdkMsQ0FBZDtBQUNBZCxTQUFPLENBQUNpQixVQUFSLENBQW1CVixjQUFjLENBQUNwRyxRQUFmLEVBQW5CLEVBQThDNEcsS0FBOUMsRUFBcUR2RCxJQUFJLENBQUMwRCxhQUFMLEVBQXJEO0FBQ0FsQixTQUFPLENBQUNZLE9BQVIsQ0FBZ0IsQ0FBaEI7QUFDRCxDQU5EOztBQVFBLElBQU14RixNQUFNLEdBQUcsU0FBVEEsTUFBUyxHQUFNO0FBQ25Cb0MsTUFBSSxDQUFDcEMsTUFBTDs7QUFDQSxNQUFJOEUsVUFBVSxDQUFDdkgsWUFBWCxFQUFKLEVBQStCO0FBQzdCTyxVQUFNLENBQUM2RixRQUFQO0FBQ0F2QixRQUFJLENBQUMyRCxVQUFMLENBQWdCLE1BQWhCO0FBQ0QsR0FIRCxNQUdPLElBQUlqQixVQUFVLENBQUN4SCxhQUFYLEVBQUosRUFBZ0M7QUFDckNRLFVBQU0sQ0FBQzRGLFNBQVA7QUFDQXRCLFFBQUksQ0FBQzJELFVBQUwsQ0FBZ0IsT0FBaEI7QUFDRCxHQUhNLE1BR0EsSUFBSWpCLFVBQVUsQ0FBQ3pILFVBQVgsRUFBSixFQUE2QjtBQUNsQ1MsVUFBTSxDQUFDOEYsTUFBUDtBQUNBeEIsUUFBSSxDQUFDMkQsVUFBTCxDQUFnQixJQUFoQjtBQUNELEdBSE0sTUFHQSxJQUFJakIsVUFBVSxDQUFDMUgsWUFBWCxFQUFKLEVBQStCO0FBQ3BDVSxVQUFNLENBQUMrRixRQUFQO0FBQ0F6QixRQUFJLENBQUMyRCxVQUFMLENBQWdCLE1BQWhCO0FBQ0QsR0FITSxNQUdBLElBQUlqQixVQUFVLENBQUNrQixNQUFYLEVBQUosRUFBeUI7QUFDOUI1RCxRQUFJLENBQUMyRCxVQUFMLENBQWdCLE1BQWhCO0FBQ0Q7QUFDRixDQWpCRDs7QUFtQkEsSUFBTWxJLE1BQU0sR0FBR0ssUUFBUSxDQUFDK0gsYUFBVCxDQUF1QixRQUF2QixDQUFmO0FBQ0FuQixVQUFVLEdBQUcsSUFBSWhJLHNEQUFKLEVBQWI7QUFDQStILE1BQU0sR0FBRyxJQUFJL0Usa0RBQUosQ0FBV0MsTUFBWCxFQUFtQkMsTUFBbkIsQ0FBVDtBQUNBNEUsT0FBTyxHQUFHLElBQUloSCxtREFBSixDQUFZQyxNQUFaLEVBQW9CL0IsR0FBcEIsRUFBeUJnQyxNQUF6QixFQUFpQ2lILElBQWpDLEVBQXVDQSxJQUF2QyxDQUFWO0FBQ0EzQyxJQUFJLEdBQUcsSUFBSWUsZ0RBQUosQ0FBU3JILEdBQVQsRUFBY3NILE1BQWQsRUFBc0J0RixNQUF0QixDQUFQO0FBQ0FoQyxHQUFHLENBQUN5SixTQUFKLENBQWMsWUFBTTtBQUNsQlgsU0FBTyxDQUFDc0IsTUFBUjtBQUNELENBRkQ7QUFHQXJCLE1BQU0sQ0FBQ3NCLEtBQVAsRzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQy9ETWpELFc7QUFDSiw2QkFBcUI7QUFBQSxRQUFQckksR0FBTyxRQUFQQSxHQUFPOztBQUFBOztBQUNuQixTQUFLdUwsTUFBTCxHQUFjLElBQUlDLEtBQUosRUFBZDtBQUNBLFNBQUtELE1BQUwsQ0FBWXZMLEdBQVosR0FBa0JBLEdBQWxCO0FBQ0Q7Ozs7OEJBRVN5TCxRLEVBQVU7QUFDbEIsV0FBS0YsTUFBTCxDQUFZRyxNQUFaLEdBQXFCRCxRQUFyQjtBQUNEOzs7K0JBRVU7QUFDVCxhQUFPLEtBQUtGLE1BQVo7QUFDRDs7Ozs7O0FBR1lsRCwwRUFBZixFOzs7Ozs7Ozs7Ozs7QUNmQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFHQSxJQUFNc0QsS0FBSyxHQUFHLENBQWQ7QUFDTyxJQUFNcEIsY0FBYjtBQUFBOztBQUFBOztBQUNFLGdDQUEwRDtBQUFBOztBQUFBLFFBQTVDdkssR0FBNEMsUUFBNUNBLEdBQTRDO0FBQUEsUUFBdkM0TCxTQUF1QyxRQUF2Q0EsU0FBdUM7QUFBQSxRQUE1QnBCLGVBQTRCLFFBQTVCQSxlQUE0QjtBQUFBLFFBQVJuRSxJQUFROztBQUFBOztBQUN4RCw4QkFBTTtBQUFFckcsU0FBRyxFQUFIQTtBQUFGLEtBQU47QUFDQSxVQUFLNEwsU0FBTCxHQUFpQkEsU0FBakI7O0FBQ0EsdUNBQThCckYsTUFBTSxDQUFDQyxPQUFQLENBQWVILElBQWYsQ0FBOUIscUNBQW9EO0FBQUE7QUFBQSxVQUF2Q0ksSUFBdUM7QUFBQSxVQUFqQ3pCLEtBQWlDOztBQUNsRCxVQUFJQSxLQUFLLEtBQUswQixTQUFkLEVBQXlCO0FBQ3pCLFlBQUtELElBQUwsSUFBYXpCLEtBQWI7QUFDRDs7QUFDRCxVQUFLNkcsZ0JBQUw7O0FBQ0EsVUFBS0MsYUFBTCxHQUFxQixNQUFLQyxVQUFMLENBQWdCdkIsZUFBZSxDQUFDSSxNQUFoQyxFQUF3QyxDQUF4QyxDQUFyQjtBQUNBLFVBQUtvQixNQUFMLEdBQWMsQ0FBZDtBQUNBLFVBQUtDLE1BQUwsR0FBY04sS0FBZDtBQVZ3RDtBQVd6RDs7QUFaSDtBQUFBO0FBQUEsdUNBY3FCO0FBQ2pCLFdBQUtJLFVBQUwsR0FBa0IsRUFBbEI7O0FBQ0EsMkNBQWlDeEYsTUFBTSxDQUFDQyxPQUFQLENBQWUsS0FBSzNGLGFBQXBCLENBQWpDLHdDQUFxRTtBQUFBO0FBQUEsWUFBeERxTCxJQUF3RDtBQUFBLFlBQWxEQyxRQUFrRDs7QUFDbkUsYUFBS0osVUFBTCxDQUFnQkcsSUFBaEIsSUFBd0JDLFFBQVEsQ0FBQ2xMLEdBQVQsQ0FBYSxLQUFLNEQsT0FBTCxDQUFhL0IsSUFBYixDQUFrQixJQUFsQixDQUFiLENBQXhCO0FBQ0Q7QUFDRjtBQW5CSDtBQUFBO0FBQUEsb0NBcUJrQjhILE1BckJsQixFQXFCMEJDLGFBckIxQixFQXFCeUM7QUFDckMsVUFBSSxLQUFLbUIsTUFBTCxJQUFlLEtBQUtDLE1BQXhCLEVBQWdDO0FBQzlCLGFBQUtELE1BQUwsR0FBYyxDQUFkO0FBQ0EsYUFBS0YsYUFBTCxHQUFzQixLQUFLQyxVQUFMLENBQWdCbkIsTUFBaEIsRUFBd0JDLGFBQXhCLENBQXRCO0FBQ0Q7O0FBQ0QsV0FBS21CLE1BQUw7QUFDQSxhQUFPLEtBQUtGLGFBQVo7QUFDRDtBQTVCSDtBQUFBO0FBQUEsbUNBOEJ3QjtBQUFBO0FBQUEsVUFBWm5ILEdBQVk7QUFBQSxVQUFQRCxHQUFPOztBQUNwQixhQUFPLENBQ0xBLEdBQUcsR0FBQyxLQUFLdkUsS0FESixFQUNXO0FBQ2hCd0UsU0FBRyxHQUFDLEtBQUt4RSxLQUZKLEVBRVc7QUFDaEIsV0FBS0EsS0FIQSxFQUdPO0FBQ1osV0FBS0EsS0FKQSxDQUlNO0FBSk4sT0FBUDtBQU1EO0FBckNIOztBQUFBO0FBQUEsRUFBb0NrSSw0REFBcEMsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSkE7SUFFQy9JLE8sR0FRR0MscUQsQ0FSSEQsTztJQUNBRSxTLEdBT0dELHFELENBUEhDLFM7SUFDQUMsVSxHQU1HRixxRCxDQU5IRSxVO0lBQ0FDLFMsR0FLR0gscUQsQ0FMSEcsUztJQUNBQyxTLEdBSUdKLHFELENBSkhJLFM7SUFDQUMsTyxHQUdHTCxxRCxDQUhISyxPO0lBQ0FDLFUsR0FFR04scUQsQ0FGSE0sVTtJQUNBQyxTLEdBQ0dQLHFELENBREhPLFM7O0lBR29CdUssTTtBQUNwQixrQkFBWStCLElBQVosRUFBa0JuSixNQUFsQixFQUEwQmhDLEdBQTFCLEVBQStCO0FBQUE7O0FBQzlCLFNBQUtvTCxPQUFMLEdBQWVwSixNQUFNLENBQUMvQixLQUFQLEdBQWEsQ0FBYixHQUFpQmtMLElBQWhDO0FBQ0EsU0FBS0UsT0FBTCxHQUFlckosTUFBTSxDQUFDOUIsTUFBUCxHQUFjLENBQWQsR0FBa0JpTCxJQUFqQztBQUNBLFNBQUtuSixNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLaEMsR0FBTCxHQUFXQSxHQUFYO0FBQ0EsU0FBS0MsS0FBTCxHQUFha0wsSUFBYjtBQUNBLFNBQUtqTCxNQUFMLEdBQWVpTCxJQUFmOztBQUNBLFNBQUtHLEtBQUw7QUFDQTs7Ozs2QkFFUTtBQUNSLFdBQUtuTCxDQUFMLEdBQVMsS0FBS2lMLE9BQUwsR0FBZSxLQUFLcEosTUFBTCxDQUFZN0IsQ0FBcEM7QUFDQSxXQUFLQyxDQUFMLEdBQVMsS0FBS2lMLE9BQUwsR0FBZSxLQUFLckosTUFBTCxDQUFZNUIsQ0FBcEM7QUFDQTs7O2dDQUdXO0FBQ1gsV0FBS21MLFlBQUwsQ0FBa0IvTSxVQUFsQjtBQUNBOzs7K0JBRVU7QUFDVixXQUFLK00sWUFBTCxDQUFrQjlNLFNBQWxCO0FBQ0E7Ozs2QkFFUTtBQUNSLFdBQUs4TSxZQUFMLENBQWtCbE4sT0FBbEI7QUFDQTs7OytCQUVVO0FBQ1YsV0FBS2tOLFlBQUwsQ0FBa0JoTixTQUFsQjtBQUNBOzs7MENBRXFCO0FBQ3JCLGFBQU87QUFDTjRCLFNBQUMsRUFBRSxLQUFLQSxDQUFMLEdBQVMsS0FBSzZCLE1BQUwsQ0FBWTdCLENBRGxCO0FBRU5DLFNBQUMsRUFBRSxLQUFLQSxDQUFMLEdBQVMsS0FBSzRCLE1BQUwsQ0FBWTVCO0FBRmxCLE9BQVA7QUFJQTs7OzRCQUVPO0FBQ1AsV0FBS29MLE1BQUwsR0FBYztBQUNiN0IsY0FBTSxFQUFFakwsU0FBUyxDQUFDbUIsSUFETDtBQUViNEwsMkJBQW1CLEVBQUU7QUFGUixPQUFkOztBQUlBLHdDQUFxQm5HLE1BQU0sQ0FBQ29HLE1BQVAsQ0FBY3BOLHFEQUFkLENBQXJCLG9DQUE2QztBQUF4QyxZQUFNcUwsTUFBTSxxQkFBWjtBQUNKLGFBQUs2QixNQUFMLENBQVlDLG1CQUFaLENBQWdDOUIsTUFBTSxDQUFDOUosSUFBdkMsSUFBK0MsQ0FBL0M7QUFDQTs7QUFDRCxXQUFLTSxDQUFMLEdBQVMsS0FBS2lMLE9BQUwsR0FBZSxLQUFLcEosTUFBTCxDQUFZN0IsQ0FBcEM7QUFDQSxXQUFLQyxDQUFMLEdBQVMsS0FBS2lMLE9BQUwsR0FBZSxLQUFLckosTUFBTCxDQUFZNUIsQ0FBcEM7QUFDQTs7O2lDQUVZdUwsYSxFQUFlO0FBQzNCO0FBQ0EsV0FBS0gsTUFBTCxDQUFZN0IsTUFBWixHQUFxQmdDLGFBQWEsQ0FBQzlMLElBQW5DLENBRjJCLENBRzNCOztBQUNBLFdBQUsyTCxNQUFMLENBQVlDLG1CQUFaLENBQWdDRSxhQUFhLENBQUM5TCxJQUE5QyxJQUFzRCxDQUFDLEtBQUsyTCxNQUFMLENBQVlDLG1CQUFaLENBQWdDRSxhQUFhLENBQUM5TCxJQUE5QyxJQUFzRCxDQUF2RCxJQUE0RDhMLGFBQWEsQ0FBQzdLLE1BQWhJLENBSjJCLENBSzNCOztBQUNBLDBDQUFxQndFLE1BQU0sQ0FBQ29HLE1BQVAsQ0FBY3BOLHFEQUFkLENBQXJCLHVDQUE2QztBQUF4QyxZQUFNcUwsTUFBTSx1QkFBWjs7QUFDSixZQUFJQSxNQUFNLENBQUM5SixJQUFQLEtBQWdCOEwsYUFBYSxDQUFDOUwsSUFBbEMsRUFBd0M7QUFDdkMsZUFBSzJMLE1BQUwsQ0FBWUMsbUJBQVosQ0FBZ0M5QixNQUFNLENBQUM5SixJQUF2QyxJQUErQyxDQUEvQztBQUNBO0FBQ0Q7QUFDRDs7O21DQUVjO0FBQ2QsYUFBTztBQUNOOEosY0FBTSxFQUFFLEtBQUs2QixNQUFMLENBQVk3QixNQURkO0FBRU5DLHFCQUFhLEVBQUUsS0FBSzRCLE1BQUwsQ0FBWUMsbUJBQVosQ0FBZ0MsS0FBS0QsTUFBTCxDQUFZN0IsTUFBNUM7QUFGVCxPQUFQO0FBSUE7Ozt5QkFFSWhDLFMsRUFBVztBQUNmLGFBQU8sS0FBSzZELE1BQUwsQ0FBWTdCLE1BQVosQ0FBbUJpQyxPQUFuQixDQUEyQmpFLFNBQTNCLEtBQXdDLENBQS9DO0FBQ0E7Ozs4QkFFUztBQUNULFVBQUksS0FBS2tFLElBQUwsQ0FBVSxPQUFWLENBQUosRUFBd0IsS0FBS04sWUFBTCxDQUFrQjNNLFVBQWxCO0FBQ3hCLFVBQUksS0FBS2lOLElBQUwsQ0FBVSxNQUFWLENBQUosRUFBdUIsS0FBS04sWUFBTCxDQUFrQjFNLFNBQWxCO0FBQ3ZCLFVBQUksS0FBS2dOLElBQUwsQ0FBVSxJQUFWLENBQUosRUFBcUIsS0FBS04sWUFBTCxDQUFrQjVNLE9BQWxCO0FBQ3JCLFVBQUksS0FBS2tOLElBQUwsQ0FBVSxNQUFWLENBQUosRUFBdUIsS0FBS04sWUFBTCxDQUFrQjdNLFNBQWxCO0FBQ3ZCIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCB7IEFDVElPTlMgfSBmcm9tICcuL2NvbnN0YW50cy5qcyc7XG5jb25zdCB7XG4gIFdBTEtfVVAsXG4gIFdBTEtfRE9XTixcbiAgV0FMS19SSUdIVCxcbiAgV0FMS19MRUZULFxuICBJRExFX0RPV04sXG4gIElETEVfVVAsXG4gIElETEVfUklHSFQsXG4gIElETEVfTEVGVFxufSA9IEFDVElPTlM7XG5cbmV4cG9ydCBjb25zdCBUUkVFUyA9IHtcbiAgc3JjOiAnLi9hc3NldHMvZ2FyZGVuX3dpdGhfb2NlYW4ucG5nJyxcbiAgY29sczogOCxcbiAgcm93czogOCxcbiAgdHNpemU6IDY0LFxuICBlbGVtZW50czoge1xuICAgIHRyZWVfYm90dG9tOiAzLFxuICAgIHRyZWVfdG9wOiA0LFxuICAgIGdyYXNzOiAxLFxuICAgIHBhdGg6IDIsXG4gICAgYnVzaDogNSxcbiAgICBvY2VhbjogNlxuICB9LFxuICBwbGF5YWJsZUFyZWE6IFtcbiAgICAzLCAzLCAzLCAzLCAzLCAzLCAzLCAzLFxuICAgIDMsIDEsIDEsIDEsIDEsIDEsIDEsIDMsXG4gICAgMywgMSwgMywgMSwgMSwgMSwgMSwgMyxcbiAgICAzLCAxLCAxLCAyLCAyLCAxLCAxLCAzLFxuICAgIDMsIDEsIDEsIDIsIDIsIDEsIDEsIDMsXG4gICAgMywgMSwgMSwgMiwgMiwgMSwgMSwgMyxcbiAgICAzLCAxLCAxLCAyLCAyLCAxLCAxLCAzLFxuICAgIDMsIDMsIDMsIDIsIDIsIDMsIDMsIDNcbiAgXVxufTtcblxuZXhwb3J0IGNvbnN0IFBMQVlFUiA9IHtcbiAgc3JjOiAnLi9hc3NldHMvbW9pLnBuZycsXG4gIGNvbHM6IDQsXG4gIHJvd3M6IDQsXG4gIHRzaXplOiA1MCxcbiAgbW92ZVNlcXVlbmNlczoge1xuICAgIFtXQUxLX0RPV04ubmFtZV06IFsgWyAxLCAwIF0sIFsgMiwgMCBdLCBbIDMsIDAgXSBdLFxuICAgIFtJRExFX0RPV04ubmFtZV06WyBbIDAsIDAgXSBdLFxuICAgIFtXQUxLX0xFRlQubmFtZV06IFsgWyAxLCAxIF0sIFsgMiwgMSBdLCBbIDMsIDEgXSBdLFxuICAgIFtJRExFX0xFRlQubmFtZV06WyBbIDAsMSBdIF0sXG4gICAgW1dBTEtfVVAubmFtZV06IFsgWyAxLCAyIF0sIFsgMiwgMiBdLCBbIDMsIDIgXSBdLFxuICAgIFtJRExFX1VQLm5hbWVdOlsgWyAwLDIgXSBdLFxuICAgIFtXQUxLX1JJR0hULm5hbWVdOiBbIFsgMSwgMyBdLCBbIDIsIDMgXSwgWyAzLCAzIF0gXSxcbiAgICBbSURMRV9SSUdIVC5uYW1lXTpbIFsgMCwzIF0gXVxuICB9XG59O1xuXG4iLCJjb25zdCBDQU1FUkFfU1BFRUQgPSAyO1xuXG4vKipcbiAqIG1hcCAtIGluc3RhbmNlIG9mIEdhbWVNYXBcbiAqL1xuY2xhc3MgQ2FtZXJhIHtcbiAgY29uc3RydWN0b3IobWFwLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy54ID0gd2lkdGgvMjtcbiAgICB0aGlzLnkgPSBoZWlnaHQvMjtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy5zcGVlZCA9IENBTUVSQV9TUEVFRDtcbiAgICB0aGlzLnN0b3AgPSB7XG4gICAgICByaWdodDogZmFsc2UsXG4gICAgICBsZWZ0OiBmYWxzZSxcbiAgICAgIHVwOiBmYWxzZSxcbiAgICAgIGRvd246IGZhbHNlXG4gICAgfTtcbiAgICB0aGlzLm1heFggPSBtYXAuY29scyAqIG1hcC50c2l6ZSAtIHdpZHRoO1xuICAgIHRoaXMubWF4WSA9IG1hcC5yb3dzICogbWFwLnRzaXplIC0gaGVpZ2h0O1xuICB9XG5cbiAgbW92ZVJpZ2h0KCkge1xuICAgIGlmICghdGhpcy5zdG9wLnJpZ2h0KSB7XG4gICAgICB0aGlzLnggKz0gQ0FNRVJBX1NQRUVEO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVMZWZ0KCkge1xuICAgIGlmICghdGhpcy5zdG9wLmxlZnQpIHtcbiAgICAgIHRoaXMueCAtPSBDQU1FUkFfU1BFRUQ7XG4gICAgfVxuICB9XG5cbiAgbW92ZVVwKCkge1xuICAgIGlmICghdGhpcy5zdG9wLnVwKSB7XG4gICAgICB0aGlzLnkgLT0gQ0FNRVJBX1NQRUVEO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVEb3duKCkge1xuICAgIGlmICghdGhpcy5zdG9wLmRvd24pIHtcbiAgICAgIHRoaXMueSArPSBDQU1FUkFfU1BFRUQ7XG4gICAgfVxuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5zdG9wLnJpZ2h0ID0gZmFsc2U7XG4gICAgdGhpcy5zdG9wLmxlZnQgPSBmYWxzZTtcbiAgICB0aGlzLnN0b3AudXAgPSBmYWxzZTtcbiAgICB0aGlzLnN0b3AuZG93biA9IGZhbHNlO1xuICB9XG5cbiAgaXNJZGxlKCkge1xuICAgIHJldHVybiB0aGlzLl9pZGxlO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FtZXJhOyIsImV4cG9ydCBjb25zdCBBQ1RJT05TID0ge1xuICBXQUxLX1JJR0hUOiB7XG4gICAgbmFtZTogJ3dhbGtfcmlnaHQnLFxuICAgIGxlbmd0aDogM1xuICB9LFxuICBXQUxLX0RPV046e1xuICAgIG5hbWU6ICd3YWxrX2Rvd24nLFxuICAgIGxlbmd0aDogM1xuICB9LFxuXG4gIFdBTEtfTEVGVDoge1xuICAgIG5hbWU6ICd3YWxrX2xlZnQnLFxuICAgIGxlbmd0aDogM1xuICB9LFxuICBXQUxLX1VQOiB7XG4gICAgbmFtZTogJ3dhbGtfdXAnLFxuICAgIGxlbmd0aDogM1xuICB9LFxuICBJRExFX1JJR0hUOiB7XG4gICAgbmFtZTogJ2lkbGVfcmlnaHQnLFxuICAgIGxlbmd0aDogMVxuICB9LFxuICBJRExFX0xFRlQ6IHtcbiAgICBuYW1lOiAnaWRsZV9sZWZ0JyxcbiAgICBsZW5ndGg6IDFcbiAgfSxcbiAgSURMRV9VUDoge1xuICAgIG5hbWU6ICdpZGxlX3VwJyxcbiAgICBsZW5ndGg6IDFcbiAgfSxcbiAgSURMRV9ET1dOOiB7XG4gICAgbmFtZTogJ2lkbGVfZG93bicsXG4gICAgbGVuZ3RoOiAxXG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBDT05TVEFOVF9TUEVFRCA9IDM7IiwiY2xhc3MgQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubGVmdCA9IHsgYWN0aXZlOiBmYWxzZSwgZG93bjogZmFsc2UgfTtcbiAgICB0aGlzLnJpZ2h0ID0geyBhY3RpdmU6IGZhbHNlLCBkb3duOiBmYWxzZSB9O1xuICAgIHRoaXMudXAgPSB7IGFjdGl2ZTogZmFsc2UsIGRvd246IGZhbHNlIH07XG4gICAgdGhpcy5kb3duID0geyBhY3RpdmU6IGZhbHNlLCBkb3duOiBmYWxzZSB9O1xuICAgIHRoaXMucGx1ZygpO1xuICB9XG5cbiAgc2V0S2V5RG93bih7IHR5cGUsIGtleUNvZGUgfSkge1xuICAgIGNvbnN0IGlzS2V5RG93biA9IHR5cGUgPT09ICdrZXlkb3duJztcbiAgICBzd2l0Y2ggKGtleUNvZGUpIHtcbiAgICAgIGNhc2UgMzc6IC8vIGxlZnRcbiAgICAgICAgdGhpcy5sZWZ0LmRvd24gPSBpc0tleURvd247XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzODogLy8gdXBcbiAgICAgICAgdGhpcy51cC5kb3duID0gaXNLZXlEb3duO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzk6IC8vIHJpZ2h0XG4gICAgICAgIHRoaXMucmlnaHQuZG93biA9IGlzS2V5RG93bjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQwOiAvLyBkb3duXG4gICAgICAgIHRoaXMuZG93bi5kb3duID0gaXNLZXlEb3duO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBpc0xlZnRBY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMubGVmdC5kb3duO1xuICB9XG5cbiAgaXNSaWdodEFjdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5yaWdodC5kb3duO1xuICB9XG5cbiAgaXNVcEFjdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy51cC5kb3duO1xuICB9XG5cbiAgaXNEb3duQWN0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLmRvd24uZG93bjtcbiAgfVxuXG4gIGlzSWRsZSgpIHtcbiAgICByZXR1cm4gIXRoaXMuaXNEb3duQWN0aXZlKCkgJiYgIXRoaXMuaXNVcEFjdGl2ZSgpICYmICF0aGlzLmlzUmlnaHRBY3RpdmUoKSAmJiAhdGhpcy5pc0xlZnRBY3RpdmUoKTtcbiAgfVxuXG4gIHBsdWcoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLnNldEtleURvd24uYmluZCh0aGlzKSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5zZXRLZXlEb3duLmJpbmQodGhpcykpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbnRyb2xsZXI7IiwiY2xhc3MgRGlzcGxheSB7XG4gIGNvbnN0cnVjdG9yKGNhbnZhcywgbWFwLCBjYW1lcmEsIGNhbnZhc1dpZHRoLCBjYW52YXNIZWlnaHQpIHtcbiAgICB0aGlzLmJ1ZmZlciAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKS5nZXRDb250ZXh0KCcyZCcpLFxuICAgIHRoaXMuY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHRoaXMuX21hcCA9IG1hcDtcbiAgICB0aGlzLl93aWR0aCA9IGNhbnZhc1dpZHRoO1xuICAgIHRoaXMuY2FtZXJhID0gY2FtZXJhO1xuICAgIHRoaXMuX2hlaWdodCA9IGNhbnZhc0hlaWdodDtcbiAgICB0aGlzLmJ1ZmZlci5jYW52YXMud2lkdGggPSBjYW52YXNXaWR0aDtcbiAgICB0aGlzLmJ1ZmZlci5jYW52YXMuaGVpZ2h0ID0gY2FudmFzSGVpZ2h0O1xuICB9XG5cbiAgZHJhd1BsYXllcihpbWFnZSwgdGlsZSwgcG9zaXRpb24pIHtcbiAgICB0aGlzLmJ1ZmZlci5kcmF3SW1hZ2UoXG4gICAgICBpbWFnZSxcbiAgICAgIC4uLnRpbGUsXG4gICAgICBwb3NpdGlvbi54LFxuICAgICAgcG9zaXRpb24ueSxcbiAgICAgIHBvc2l0aW9uLndpZHRoLFxuICAgICAgcG9zaXRpb24uaGVpZ2h0XG4gICAgKTtcbiAgICB0aGlzLl9yZW5kZXIoKTtcbiAgfVxuXG4gIGRyYXdNYXAobGF5ZXIpIHtcbiAgICBjb25zdCBpbWFnZSA9IHRoaXMuX21hcC5nZXRJbWFnZSgpO1xuICAgIGNvbnN0IHRpbGVTaXplID0gdGhpcy5fbWFwLnRzaXplO1xuXG4gICAgY29uc3Qgc3RhcnRDb2wgPSBNYXRoLmZsb29yKHRoaXMuY2FtZXJhLnggLyB0aGlzLl9tYXAudHNpemUpO1xuICAgIGNvbnN0IGVuZENvbCA9IHN0YXJ0Q29sICsgTWF0aC5mbG9vcih0aGlzLmNhbWVyYS53aWR0aCAvIHRoaXMuX21hcC50c2l6ZSkgKyAxO1xuICAgIGNvbnN0IHN0YXJ0Um93ID0gTWF0aC5mbG9vcih0aGlzLmNhbWVyYS55IC8gdGhpcy5fbWFwLnRzaXplKTtcbiAgICBjb25zdCBlbmRSb3cgPSBzdGFydFJvdyArIE1hdGguZmxvb3IodGhpcy5jYW1lcmEuaGVpZ2h0IC8gdGhpcy5fbWFwLnRzaXplKSArIDE7XG5cbiAgICBmb3IgKGxldCBjb2wgPSBzdGFydENvbDsgY29sIDw9IGVuZENvbDsgY29sKyspIHtcbiAgICAgIGZvciAobGV0IHJvdyA9IHN0YXJ0Um93OyByb3cgPD0gZW5kUm93OyByb3crKykge1xuICAgICAgICB2YXIgeCA9IGNvbCAqIHRoaXMuX21hcC50c2l6ZSAtIHRoaXMuY2FtZXJhLng7XG4gICAgICAgIHZhciB5ID0gcm93ICogdGhpcy5fbWFwLnRzaXplIC0gdGhpcy5jYW1lcmEueTtcbiAgICAgICAgY29uc3QgY3VycmVudFRpbGUgPSB0aGlzLl9tYXAuZ2V0VGlsZShsYXllciwgY29sLCByb3cpO1xuICAgICAgICBpZiAoY3VycmVudFRpbGUgPT09IDApIGNvbnRpbnVlO1xuICAgICAgICB0aGlzLmJ1ZmZlci5kcmF3SW1hZ2UoXG4gICAgICAgICAgaW1hZ2UsIC8vIGltYWdlXG4gICAgICAgICAgKGN1cnJlbnRUaWxlIC0gMSkgKiB0aWxlU2l6ZSwgLy8gc291cmNlIHhcbiAgICAgICAgICAwLCAvLyBzb3VyY2UgeVxuICAgICAgICAgIHRpbGVTaXplLCAvLyBzb3VyY2Ugd2lkdGhcbiAgICAgICAgICB0aWxlU2l6ZSwgLy8gc291cmNlIGhlaWdodFxuICAgICAgICAgIE1hdGguZmxvb3IoeCksIC8vIHRhcmdldCB4XG4gICAgICAgICAgTWF0aC5mbG9vcih5KSwgLy8gdGFyZ2V0IHlcbiAgICAgICAgICB0aWxlU2l6ZSwgLy8gdGFyZ2V0IHdpZHRoXG4gICAgICAgICAgdGlsZVNpemUgLy8gdGFyZ2V0IGhlaWdodFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9yZW5kZXIoKTtcbiAgfVxuXG5cbiAgcmVzaXplKCkge1xuICAgIGNvbnN0IHJhdGlvID0gdGhpcy5fbWFwLmhlaWdodCAvIHRoaXMuX21hcC53aWR0aDtcbiAgICBpZiAodGhpcy5faGVpZ2h0IC8gdGhpcy5fd2lkdGggPiByYXRpbykge1xuICAgICAgdGhpcy5jb250ZXh0LmNhbnZhcy5oZWlnaHQgPSB0aGlzLl93aWR0aCAqIHJhdGlvO1xuICAgICAgdGhpcy5jb250ZXh0LmNhbnZhcy53aWR0aCA9IHRoaXMuX3dpZHRoO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbnRleHQuY2FudmFzLmhlaWdodCA9IHRoaXMuX2hlaWdodDtcbiAgICAgIHRoaXMuY29udGV4dC5jYW52YXMud2lkdGggPSB0aGlzLl9oZWlnaHQgLyByYXRpbztcbiAgICB9XG4gICAgdGhpcy5jb250ZXh0LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRydWU7XG4gIH1cblxuICBfcmVuZGVyKCkge1xuICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UoXG4gICAgICB0aGlzLmJ1ZmZlci5jYW52YXMsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIHRoaXMuYnVmZmVyLmNhbnZhcy53aWR0aCxcbiAgICAgIHRoaXMuYnVmZmVyLmNhbnZhcy5oZWlnaHQsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIHRoaXMuY29udGV4dC5jYW52YXMud2lkdGgsXG4gICAgICB0aGlzLmNvbnRleHQuY2FudmFzLmhlaWdodFxuICAgICk7XG4gIH1cblxuICBzZXQgbWFwKHZhbHVlKSB7XG4gICAgdGhpcy5fbWFwID0gdmFsdWU7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBEaXNwbGF5OyIsImNsYXNzIEVuZ2luZSB7XG4gIGNvbnN0cnVjdG9yKHJlbmRlciwgdXBkYXRlKSB7XG4gICAgdGhpcy5hbmltYXRlZEZyYW1lUmVxdWVzdDtcbiAgICB0aGlzLnRpY2tMZW5ndGggPSAxMDAwLzYwO1xuICAgIHRoaXMudXBkYXRlID0gdXBkYXRlO1xuICAgIHRoaXMucmVuZGVyID0gcmVuZGVyO1xuICB9XG5cbiAgcnVuKHRGcmFtZSkge1xuICAgIC8vIHRoZW9yaWNhbCBuZXh0IHRpY2tcbiAgICBjb25zdCBuZXh0VGljayA9IHRoaXMubGFzdFRpY2sgKyB0aGlzLnRpY2tMZW5ndGg7XG4gICAgbGV0IG51bVRpY2tzID0gMDtcblxuICAgIC8vIHdlJ3JlIGxhdGUsIGxldCdzIGNvdW50IHRoZSB0aWNrcyB3ZSBtaXNzZWRcbiAgICBpZiAodEZyYW1lID4gbmV4dFRpY2spIHtcbiAgICAgIG51bVRpY2tzID0gTWF0aC5mbG9vcigodEZyYW1lIC0gdGhpcy5sYXN0VGljaykgLyB0aGlzLnRpY2tMZW5ndGgpO1xuICAgIH1cblxuICAgIC8vIGFwcGx5IGFuIHVwZGF0ZSBmb3IgZWFjaCB0aWNrIHdlIG1pc3NlZFxuICAgIGZvciAobGV0IGk9MDsgaTxudW1UaWNrczsgaSsrKSB7XG4gICAgICB0aGlzLmxhc3RUaWNrID0gdGhpcy5sYXN0VGljayArIHRoaXMudGlja0xlbmd0aDtcbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgICB0aGlzLmFuaW1hdGVkRnJhbWVSZXF1ZXN0ID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmhhbmRsZVJ1bik7XG5cbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIHRoaXMubGFzdFRpY2sgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICB0aGlzLmhhbmRsZVJ1biA9ICh0KSA9PiB0aGlzLnJ1bih0KTtcbiAgICB0aGlzLmFuaW1hdGVkRnJhbWVSZXF1ZXN0ID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmhhbmRsZVJ1bik7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGVkRnJhbWVSZXF1ZXN0KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFbmdpbmU7IiwiaW1wb3J0IHsgSW1hZ2VMb2FkZXIgfSBmcm9tICcuL21peGlucy9pbmRleC5qcyc7XG5cbmNvbnN0IEJPUkRFUl9MRU5HVEggPSA0O1xuY29uc3QgQk9SREVSX0NPTlRFTlQgPSA2O1xuXG5jbGFzcyBHYW1lTWFwIGV4dGVuZHMgSW1hZ2VMb2FkZXIge1xuXHRjb25zdHJ1Y3Rvcih7XG5cdFx0c3JjLFxuXHRcdGNvbHMsXG5cdFx0cm93cyxcblx0XHRwbGF5YWJsZUFyZWEsXG5cdFx0Li4ucmVzdFxuXHR9KSB7XG5cdFx0c3VwZXIoeyBzcmMgfSk7XG5cdFx0dGhpcy5wbGF5YWJsZUFyZWEgPSBwbGF5YWJsZUFyZWE7XG5cdFx0dGhpcy5wbGF5YWJsZURpbWVuc2lvbiA9IHtcblx0XHRcdHJvd3MsXG5cdFx0XHRjb2xzXG5cdFx0fTtcblx0XHRmb3IgKGNvbnN0IFsgcHJvcCwgdmFsdWUgXSBvZiBPYmplY3QuZW50cmllcyhyZXN0KSkge1xuXHRcdFx0aWYgKHZhbHVlID09PSB1bmRlZmluZWQpIGNvbnRpbnVlO1xuXHRcdFx0dGhpc1twcm9wXSA9IHZhbHVlO1xuXHRcdH1cblx0XHR0aGlzLl9idWlsZENvbGlzaW9uTWFwKCk7XG5cdFx0dGhpcy5fYnVpbGRDb21wbGV0ZU1hcCgpO1xuXHR9XG5cblx0Z2V0VGlsZShsYXllciA9IDAsIGNvbCwgcm93KSB7XG5cdFx0cmV0dXJuIHRoaXMubGF5ZXJzW2xheWVyXVtyb3cgKiB0aGlzLmNvbHMgKyBjb2xdO1xuXHR9XG5cblx0Z2V0IHdpZHRoKCkge1xuXHRcdHJldHVybiB0aGlzLnRzaXplICogdGhpcy5yb3dzO1xuXHR9XG5cblx0Z2V0IGhlaWdodCgpIHtcblx0XHRyZXR1cm4gdGhpcy50c2l6ZSAqIHRoaXMuY29scztcblx0fVxuXG5cdC8qKlxuXHQgKiBCdWlsZHMgdGhlIGZ1bGwgbWFwLCBhIHNxdWFyZSBvZiB0aWxlcywgd2hpY2ggaW5jbHVkZXM6XG5cdCAqIC0gdGhlIHBsYXlhYmxlIGFyZWEgaW4gdGhlIGNlbnRlclxuXHQgKiAtIGEgYm9yZGVyLCBub24gcGxheWFibGUgYXJvdW5kIHRoZSBwbGF5YWJsZSBhcmVhXG5cdCAqL1xuXHRfYnVpbGRDb21wbGV0ZU1hcCgpIHtcblx0XHRjb25zdCB7IHJvd3MsIGNvbHMgfSA9IHRoaXMucGxheWFibGVEaW1lbnNpb247XG5cdFx0dGhpcy5sYXllcnMgPSBbIHRoaXMuX2FkZEJvcmRlcih0aGlzLnBsYXlhYmxlQXJlYSwgcm93cywgY29scywgQk9SREVSX0xFTkdUSCwgQk9SREVSX0NPTlRFTlQpIF07XG5cdFx0dGhpcy5yb3dzID0gcm93cyArIDIgKiBCT1JERVJfTEVOR1RIOyAvLyBuZXcgbnVtYmVyIG9mIHJvd3Mgb2YgdGhlIGZ1bGwgbWFwXG5cdFx0dGhpcy5jb2xzID0gY29scyArIDIgKiBCT1JERVJfTEVOR1RIOyAvLyBuZXcgbnVtYmVyIG9mIGNvbHVtbnMgb2YgdGhlIGZ1bGwgbWFwXG5cdFx0dGhpcy5fYnVpbGRUb3BMYXllcigpO1xuXHR9XG5cblx0X2J1aWxkVG9wTGF5ZXIoKSB7XG5cdFx0Y29uc3QgeyB0cmVlX2JvdHRvbSwgdHJlZV90b3AgfSA9IHRoaXMuZWxlbWVudHM7XG5cdFx0bGV0IHRvcExheWVyID0gbmV3IEFycmF5KHRoaXMucm93cyp0aGlzLmNvbHMpLmZpbGwoMCk7XG5cdFx0dGhpcy5sYXllcnNbMF0uZm9yRWFjaCgodGlsZSwgaSkgPT4ge1xuXHRcdFx0aWYgKHRpbGUgPT09IHRyZWVfYm90dG9tKSB7XG5cdFx0XHRcdHRvcExheWVyW2kgLSB0aGlzLnJvd3NdID0gdHJlZV90b3A7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5sYXllcnNbMV0gPSB0b3BMYXllcjtcblx0fVxuXG5cdF9idWlsZENvbGlzaW9uTWFwKCkge1xuXHRcdGNvbnN0IHsgcm93cywgY29scyB9ID0gdGhpcy5wbGF5YWJsZURpbWVuc2lvbjtcblx0XHRsZXQgcGxheWFibGVBcmVhQ29sbGlzaW9uTWFwID0gdGhpcy5wbGF5YWJsZUFyZWEubWFwKGUgPT4ge1xuXHRcdFx0aWYgKGUgPT09IDMpIHJldHVybiAgMTtcblx0XHRcdHJldHVybiAwO1xuXHRcdH0pO1xuXHRcdHRoaXMuX2NvbGxpc2lvbk1hcCA9IHRoaXMuX2FkZEJvcmRlcihwbGF5YWJsZUFyZWFDb2xsaXNpb25NYXAsIHJvd3MsIGNvbHMsIEJPUkRFUl9MRU5HVEgsIDEpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgMSBpZiB0aGUgcG9pbnQgKHgseSkgYmVsb25ncyB0byBhIHRpbGVcblx0ICogbWFya2VkIGFzIGFuIG9ic3RhY2xlIG9uIHRoZSBtYXAuIDAgb3RoZXJ3aXNlLlxuXHQgKiBAcGFyYW0geyp9IHhcblx0ICogQHBhcmFtIHsqfSB5XG5cdCAqL1xuXHRjb2xsaXNpb24oeCwgeSkge1xuXHRcdGNvbnN0IGNvbCA9IE1hdGguZmxvb3IoeCAvIHRoaXMudHNpemUpO1xuXHRcdGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoeSAvIHRoaXMudHNpemUpO1xuXHRcdHJldHVybiB0aGlzLl9jb2xsaXNpb25NYXBbcm93ICogdGhpcy5jb2xzICsgY29sXTtcblx0fVxuXG5cdC8qKlxuXHQgKiBMb2dzIGFuIGFycmF5IGluIHRoZSBzaGFwZSBvZiBhIHNxdWFyZVxuXHQgKiBAcGFyYW0geyp9IGdhbWUgLSBhcnJheSBvZiBudW1iZXJzXG5cdCAqIEBwYXJhbSB7Kn0gbnVtT2ZSb3dzIC0gbnVtYmVyIG9mIHJvd3Mgb2YgdGhlIHNxdWFyZSB0byBwcmludFxuXHQgKi9cblx0X3ByZXR0eVByaW50KGdhbWUsIG51bU9mUm93cykge1xuXHRcdGxldCBwcmV0dHlTdHJpbmcgPSAnXFxuJztcblx0XHRsZXQgaSA9IDA7XG5cdFx0Z2FtZS5mb3JFYWNoKGUgPT4ge1xuXHRcdFx0aWYgKGkgPT09IG51bU9mUm93cykge1xuXHRcdFx0XHRwcmV0dHlTdHJpbmcgKz0gJ1xcbic7XG5cdFx0XHRcdGkgPSAwO1xuXHRcdFx0fVxuXHRcdFx0cHJldHR5U3RyaW5nICs9IFN0cmluZyhlKSArICcgICc7XG5cdFx0XHRpKys7XG5cdFx0fSk7XG5cdFx0cHJldHR5U3RyaW5nICs9ICdcXG4nO1xuXHR9XG5cblxuXHQvKipcblx0ICogVGhpcyBtZXRob2QgdGFrZXMgYSBzcXVhcmUgb2YgdGlsZXMgdGhhdCBpcyByZXByZXNlbnRlZCBieSBhbiBhcnJheSBvZiBudW1iZXJzXG5cdCAqIGFuZCByZXR1cm5zIGEgYmlnZ2VyIGFycmF5IHRoYXQgaXMgdGhlIGZpcnN0IG9uZSB3aXRoIGV4dHJhIHJvd3MgYW5kIGNvbHVtbnMgYXJvdW5kLlxuXHQgKlxuXHQgKiBFeGFtcGxlOlxuXHQgKlxuXHQgKiBwbGF5YWJsZUdhbWU6XG5cdCAqIFtcblx0ICogIDEsIDEsIDEsXG5cdCAqICAxLCAxLCAxLFxuXHQgKiAgMSwgMSwgMVxuXHQgKiBdXG5cdCAqIG51bVJvd3MgPSBudW1Db2xzID0gMyAoZGltZW5zaW9uIG9mIHBsYXlhYmxlR2FtZSlcblx0ICogYm9yZGVyTGVuID0gMlxuXHQgKiBmaWxsTnVtYmVyID0gOVxuXHQgKlxuXHQgKiBvdXRwdXQ6XG5cdCAqIFtcblx0ICogIDksIDksIDksIDksIDksIDksIDlcblx0ICogIDksIDksIDksIDksIDksIDksIDlcblx0ICogIDksIDksIDEsIDEsIDEsIDksIDlcblx0ICogIDksIDksIDEsIDEsIDEsIDksIDlcblx0ICogIDksIDksIDEsIDEsIDEsIDksIDlcblx0ICogIDksIDksIDksIDksIDksIDksIDlcblx0ICogIDksIDksIDksIDksIDksIDksIDlcblx0ICogXVxuXHQgKlxuXHQgKiB0aGUgcGxheWFibGVHYW1lIGlzIHN1cm91bmRlZCBieSAyICg9Ym9yZGVyTGVuKSByb3dzL2NvbHVtbnMgb2YgOSAoZmlsbE51bWJlcilcblx0ICpcblx0ICogQHBhcmFtIHsqfSBwbGF5YWJsZUdhbWUgLSBhcnJheSB0aGF0IHJlcHJlc2VudCB0aGUgcGxheWFibGUgYXJlYVxuXHQgKiBAcGFyYW0geyp9IG51bVJvd3MgLSBudW1iZXIgb2Ygcm93cyBvZiB0aGUgcGxheWFibGUgYXJlYVxuXHQgKiBAcGFyYW0geyp9IG51bUNvbHMgLSBudW1iZXIgb2YgY29sdW1ucyBvZiB0aGUgcGxheWFibGUgYXJlYVxuXHQgKiBAcGFyYW0geyp9IGJvcmRlckxlbiAtIHRoZSBib3JkZXIgd2lkdGggKGluIG51bWJlciBvZiByb3cvY29sdW1uKSB0byBhZGQgYWxsIGFyb3VuZCB0aGUgcGxheWFibGUgYXJlYVxuXHQgKiBAcGFyYW0geyp9IGZpbGxOdW1iZXIgLSB0aGUgY29udGVudCBvZiB0aGUgYm9yZGVyXG5cdCAqL1xuXHRfYWRkQm9yZGVyKHBsYXlhYmxlR2FtZSwgbnVtUm93cywgbnVtQ29scywgYm9yZGVyTGVuLCBmaWxsTnVtYmVyKSB7XG5cdFx0bGV0IG5ld0dhbWUgPSBbXTtcblx0XHRjb25zdCBuZXdSb3dMZW4gPSBudW1Sb3dzICsgMipib3JkZXJMZW47XG5cdFx0Y29uc3QgZmlyc3RMaW5lID0gIG5ldyBBcnJheShuZXdSb3dMZW4pLmZpbGwoZmlsbE51bWJlcik7XG5cdFx0Zm9yIChsZXQgaT0wOyBpPGJvcmRlckxlbjsgaSsrKSB7XG5cdFx0XHQgbmV3R2FtZSA9IFsgLi4ubmV3R2FtZSwgLi4uZmlyc3RMaW5lIF07XG5cdFx0fVxuXHRcdGZvciAobGV0IGk9MDsgaSA8IG51bVJvd3M7IGkrKykge1xuXHRcdFx0bGV0IG5ld0xpbmUgPSBbXG5cdFx0XHRcdC4uLihuZXcgQXJyYXkoYm9yZGVyTGVuKS5maWxsKGZpbGxOdW1iZXIpKSxcblx0XHRcdFx0Li4ucGxheWFibGVHYW1lLnNsaWNlKG51bUNvbHMqaSwgbnVtQ29scyppICsgbnVtUm93cyksXG5cdFx0XHRcdC4uLihuZXcgQXJyYXkoYm9yZGVyTGVuKS5maWxsKGZpbGxOdW1iZXIpKVxuXHRcdFx0XTtcblx0XHRcdG5ld0dhbWUgPSBbIC4uLm5ld0dhbWUsIC4uLm5ld0xpbmUgXTtcblx0XHR9XG5cdFx0Zm9yIChsZXQgaT0wOyBpPGJvcmRlckxlbjsgaSsrKSB7XG5cdFx0XHQgbmV3R2FtZSA9IFsgLi4ubmV3R2FtZSwgLi4uZmlyc3RMaW5lIF07XG5cdFx0fVxuXHRcdHJldHVybiBuZXdHYW1lO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVNYXA7IiwiY2xhc3MgR2FtZSB7XG5cdGNvbnN0cnVjdG9yKG1hcCwgcGxheWVyLCBjYW1lcmEpIHtcblx0XHR0aGlzLm1hcCA9IG1hcDtcblx0XHR0aGlzLnBsYXllciA9IHBsYXllcjtcblx0XHR0aGlzLmNhbWVyYSA9IGNhbWVyYTtcblx0XHR0aGlzLmNvbGxpc2lvbk9mZnNldCA9IHRoaXMuY2FtZXJhLnNwZWVkO1xuXHR9XG5cblx0dXBkYXRlKCkge1xuXHRcdHRoaXMucGxheWVyLnVwZGF0ZSgpO1xuXHRcdHRoaXMuY29sbGlkZSgpO1xuXHR9XG5cblx0Z2V0UGxheWVySW5mbygpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Li4udGhpcy5wbGF5ZXIuZ2V0U2NyZWVuQ29vcmRpbmF0ZSgpLFxuXHRcdFx0d2lkdGg6IHRoaXMucGxheWVyLndpZHRoLFxuXHRcdFx0aGVpZ2h0OiB0aGlzLnBsYXllci5oZWlnaHQsXG5cdFx0XHRjb2xvcjogdGhpcy5wbGF5ZXIuY29sb3Jcblx0XHR9O1xuXHR9XG5cblx0bW92ZVBsYXllcihkaXJlY3Rpb24pIHtcblx0XHRpZiAoZGlyZWN0aW9uID09PSAncmlnaHQnKSB0aGlzLnBsYXllci5tb3ZlUmlnaHQoKTtcblx0XHRpZiAoZGlyZWN0aW9uID09PSAnbGVmdCcpIHRoaXMucGxheWVyLm1vdmVMZWZ0KCk7XG5cdFx0aWYgKGRpcmVjdGlvbiA9PT0gJ3VwJykgdGhpcy5wbGF5ZXIubW92ZVVwKCk7XG5cdFx0aWYgKGRpcmVjdGlvbiA9PT0gJ2Rvd24nKSB0aGlzLnBsYXllci5tb3ZlRG93bigpO1xuXHRcdGlmIChkaXJlY3Rpb24gPT09ICdpZGxlJykgdGhpcy5wbGF5ZXIuc2V0SWRsZSgpO1xuXHR9XG5cblxuXHQvLyBjb29yZHMgaW4gbWFwXG5cdGNvbGxpZGUoKSB7XG5cdFx0dGhpcy5jYW1lcmEucmVzZXQoKTtcblx0XHR0aGlzLmNhbWVyYS5zdG9wLmxlZnQgPSB0aGlzLl9sZWZ0Q29sbGlzaW9uKCk7XG5cdFx0dGhpcy5jYW1lcmEuc3RvcC5yaWdodCA9IHRoaXMuX3JpZ2h0Q29sbGlzaW9uKCk7XG5cdFx0dGhpcy5jYW1lcmEuc3RvcC51cCA9IHRoaXMuX3RvcENvbGxpc2lvbigpO1xuXHRcdHRoaXMuY2FtZXJhLnN0b3AuZG93biA9IHRoaXMuX2JvdHRvbUNvbGxpc2lvbigpO1xuXHR9XG5cblx0LyoqXG5cdFx0XHRcdFx0XHRcdFx0IHBsYXllclxuXHRcdCh4LHkpIC0+ICArLS0tLS0tLS0tLS0rIDwtICh4ICsgd2lkdGgsIHkpXG5cdFx0XHRcdFx0XHRcdHwgICAgICAgICAgIHxcblx0XHRcdFx0XHRcdFx0fCAgICAgICAgICAgfFxuXHRcdFx0XHRcdFx0XHR8ICAgICAgICAgICB8XG5cdFx0XHRcdFx0XHRcdCstLS0tLS0tLS0tLSsgPC0gKHggKyB3aWR0aCwgeSArIGhlaWdodClcblx0XHRcdFx0XHRcdFx0IDwtIHdpZHRoIC0+XG5cdCovXG5cblx0X3JpZ2h0Q29sbGlzaW9uKCkge1xuXHRcdGNvbnN0IG9uZSA9IFsgdGhpcy5wbGF5ZXIueCArIHRoaXMucGxheWVyLndpZHRoICsgdGhpcy5jb2xsaXNpb25PZmZzZXQsIHRoaXMucGxheWVyLnkgXTtcblx0XHRjb25zdCB0d28gPSBbIHRoaXMucGxheWVyLnggKyB0aGlzLnBsYXllci53aWR0aCArIHRoaXMuY29sbGlzaW9uT2Zmc2V0LCB0aGlzLnBsYXllci55ICsgMSBdO1xuXHRcdGNvbnN0IHRocmVlID0gWyB0aGlzLnBsYXllci54ICsgdGhpcy5wbGF5ZXIud2lkdGggKyB0aGlzLmNvbGxpc2lvbk9mZnNldCwgdGhpcy5wbGF5ZXIueSArIHRoaXMucGxheWVyLmhlaWdodCBdO1xuXHRcdGNvbnN0IGZvdXIgPSBbIHRoaXMucGxheWVyLnggKyB0aGlzLnBsYXllci53aWR0aCArIHRoaXMuY29sbGlzaW9uT2Zmc2V0LCB0aGlzLnBsYXllci55ICsgdGhpcy5wbGF5ZXIuaGVpZ2h0IC0gMSBdO1xuXHRcdGNvbnN0IGZpcnN0ID0gQm9vbGVhbih0aGlzLm1hcC5jb2xsaXNpb24ob25lWzBdLCBvbmVbMV0pKSAmJiBCb29sZWFuKHRoaXMubWFwLmNvbGxpc2lvbih0d29bMF0sIHR3b1sxXSkpO1xuXHRcdGNvbnN0IHNlY29uZCA9IEJvb2xlYW4odGhpcy5tYXAuY29sbGlzaW9uKHRocmVlWzBdLCB0aHJlZVsxXSkpICYmIEJvb2xlYW4odGhpcy5tYXAuY29sbGlzaW9uKGZvdXJbMF0sIGZvdXJbMV0pKTtcblx0XHRyZXR1cm4gZmlyc3QgfHwgc2Vjb25kO1xuXHR9XG5cblx0X2xlZnRDb2xsaXNpb24oKSB7XG5cdFx0Y29uc3Qgb25lID0gWyB0aGlzLnBsYXllci54IC0gdGhpcy5jb2xsaXNpb25PZmZzZXQsIHRoaXMucGxheWVyLnkgXTtcblx0XHRjb25zdCB0d28gPSBbIHRoaXMucGxheWVyLnggLSB0aGlzLmNvbGxpc2lvbk9mZnNldCwgdGhpcy5wbGF5ZXIueSArIDEgXTtcblx0XHRjb25zdCB0aHJlZSA9IFsgdGhpcy5wbGF5ZXIueCAtIHRoaXMuY29sbGlzaW9uT2Zmc2V0LCB0aGlzLnBsYXllci55ICArIHRoaXMucGxheWVyLmhlaWdodCBdO1xuXHRcdGNvbnN0IGZvdXIgPSBbIHRoaXMucGxheWVyLnggLSB0aGlzLmNvbGxpc2lvbk9mZnNldCwgdGhpcy5wbGF5ZXIueSArIHRoaXMucGxheWVyLmhlaWdodCAtIDEgXTtcblx0XHRjb25zdCBmaXJzdCA9IEJvb2xlYW4odGhpcy5tYXAuY29sbGlzaW9uKG9uZVswXSwgb25lWzFdKSkgJiYgQm9vbGVhbih0aGlzLm1hcC5jb2xsaXNpb24odHdvWzBdLCB0d29bMV0pKTtcblx0XHRjb25zdCBzZWNvbmQgPSBCb29sZWFuKHRoaXMubWFwLmNvbGxpc2lvbih0aHJlZVswXSwgdGhyZWVbMV0pKSAmJiBCb29sZWFuKHRoaXMubWFwLmNvbGxpc2lvbihmb3VyWzBdLCBmb3VyWzFdKSk7XG5cdFx0cmV0dXJuIGZpcnN0IHx8IHNlY29uZDtcblx0fVxuXG5cdF90b3BDb2xsaXNpb24oKSB7XG5cdFx0Y29uc3Qgb25lID0gWyB0aGlzLnBsYXllci54LCB0aGlzLnBsYXllci55IC0gdGhpcy5jb2xsaXNpb25PZmZzZXQgXTtcblx0XHRjb25zdCB0d28gPSBbIHRoaXMucGxheWVyLnggKyAxLCB0aGlzLnBsYXllci55ICAtIHRoaXMuY29sbGlzaW9uT2Zmc2V0IF07XG5cdFx0Y29uc3QgdGhyZWUgPSBbIHRoaXMucGxheWVyLnggKyB0aGlzLnBsYXllci53aWR0aCwgdGhpcy5wbGF5ZXIueSAtIHRoaXMuY29sbGlzaW9uT2Zmc2V0IF07XG5cdFx0Y29uc3QgZm91ciA9IFsgdGhpcy5wbGF5ZXIueCArIHRoaXMucGxheWVyLndpZHRoIC0gMSwgdGhpcy5wbGF5ZXIueSAtIHRoaXMuY29sbGlzaW9uT2Zmc2V0IF07XG5cdFx0Y29uc3QgZmlyc3QgPSBCb29sZWFuKHRoaXMubWFwLmNvbGxpc2lvbihvbmVbMF0sIG9uZVsxXSkpICYmIEJvb2xlYW4odGhpcy5tYXAuY29sbGlzaW9uKHR3b1swXSwgdHdvWzFdKSk7XG5cdFx0Y29uc3Qgc2Vjb25kID0gQm9vbGVhbih0aGlzLm1hcC5jb2xsaXNpb24odGhyZWVbMF0sIHRocmVlWzFdKSkgJiYgQm9vbGVhbih0aGlzLm1hcC5jb2xsaXNpb24oZm91clswXSwgZm91clsxXSkpO1xuXHRcdHJldHVybiBmaXJzdCB8fCBzZWNvbmQ7XG5cdH1cblxuXHRfYm90dG9tQ29sbGlzaW9uKCkge1xuXHRcdGNvbnN0IG9uZSA9IFsgdGhpcy5wbGF5ZXIueCwgdGhpcy5wbGF5ZXIueSArIHRoaXMucGxheWVyLmhlaWdodCArIHRoaXMuY29sbGlzaW9uT2Zmc2V0IF07XG5cdFx0Y29uc3QgdHdvID0gWyB0aGlzLnBsYXllci54ICsgMSwgdGhpcy5wbGF5ZXIueSArIHRoaXMucGxheWVyLmhlaWdodCArIHRoaXMuY29sbGlzaW9uT2Zmc2V0IF07XG5cdFx0Y29uc3QgdGhyZWUgPSBbIHRoaXMucGxheWVyLnggKyB0aGlzLnBsYXllci53aWR0aCwgdGhpcy5wbGF5ZXIueSArIHRoaXMucGxheWVyLmhlaWdodCArIHRoaXMuY29sbGlzaW9uT2Zmc2V0IF07XG5cdFx0Y29uc3QgZm91ciA9IFsgdGhpcy5wbGF5ZXIueCArIHRoaXMucGxheWVyLndpZHRoIC0gMSwgdGhpcy5wbGF5ZXIueSArIHRoaXMucGxheWVyLmhlaWdodCArIHRoaXMuY29sbGlzaW9uT2Zmc2V0IF07XG5cdFx0Y29uc3QgZmlyc3QgPSBCb29sZWFuKHRoaXMubWFwLmNvbGxpc2lvbihvbmVbMF0sIG9uZVsxXSkpICYmIEJvb2xlYW4odGhpcy5tYXAuY29sbGlzaW9uKHR3b1swXSwgdHdvWzFdKSk7XG5cdFx0Y29uc3Qgc2Vjb25kID0gQm9vbGVhbih0aGlzLm1hcC5jb2xsaXNpb24odGhyZWVbMF0sIHRocmVlWzFdKSkgJiYgQm9vbGVhbih0aGlzLm1hcC5jb2xsaXNpb24oZm91clswXSwgZm91clsxXSkpO1xuXHRcdHJldHVybiBmaXJzdCB8fCBzZWNvbmQ7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZTsiLCJpbXBvcnQgRW5naW5lIGZyb20gJy4vZW5naW5lLmpzJztcbmltcG9ydCBEaXNwbGF5IGZyb20gJy4vZGlzcGxheS5qcyc7XG5pbXBvcnQgR2FtZSBmcm9tICcuL2dhbWUuanMnO1xuaW1wb3J0IFBsYXllciBmcm9tICcuL3BsYXllci5qcyc7XG5pbXBvcnQgQ29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXIuanMnO1xuaW1wb3J0IEdhbWVNYXAgIGZyb20gJy4vZ2FtZS1tYXAuanMnO1xuaW1wb3J0IENhbWVyYSAgZnJvbSAnLi9jYW1lcmEuanMnO1xubGV0IGRpc3BsYXksIGVuZ2luZSwgZ2FtZSwgY29udHJvbGxlcjtcbmltcG9ydCB7IFRSRUVTLCBQTEFZRVIgfSBmcm9tICcuL2Fzc2V0LWluZm8uanMnO1xuaW1wb3J0IHsgUGxheWVyQW5pbWF0b3IgfSBmcm9tICcuL3BsYXllci1hbmltYXRvci5qcyc7XG5jb25zdCBtYXAgPSBuZXcgR2FtZU1hcChUUkVFUyk7XG5cbmNvbnN0IFNJWkUgPSA1MTI7XG5jb25zdCBnYW1lV2lkdGggPSBTSVpFO1xuY29uc3QgZ2FtZUhlaWdodCA9IFNJWkU7XG5jb25zdCBjYW1lcmEgPSBuZXcgQ2FtZXJhKG1hcCwgU0laRSwgU0laRSk7XG5cbmNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXIoNjQsIGNhbWVyYSwgbWFwKTtcbmNvbnN0IHBsYXllckFuaW1hdG9yID0gbmV3IFBsYXllckFuaW1hdG9yKHtcbiAgLi4uUExBWUVSLFxuICBpbml0UGxheWVyU3RhdGU6IHBsYXllci5nZXRNb3ZlU3RhdGUoKSAvLyBpbml0IHN0YXRlIG9mIHBsYXllclxufSk7XG5cblxucGxheWVyQW5pbWF0b3Iuc2V0T25Mb2FkKCgpID0+IHtcbiAgcmVuZGVyKCk7XG59KTtcblxuY29uc3QgcmVuZGVyID0gKCkgPT4ge1xuICBkaXNwbGF5LmRyYXdNYXAoMCk7XG4gIGNvbnN0IHsgYWN0aW9uLCBzZXF1ZW5jZUluZGV4IH0gPSBwbGF5ZXIuZ2V0TW92ZVN0YXRlKCk7XG4gIGNvbnN0IGZyYW1lID0gcGxheWVyQW5pbWF0b3IuZ2V0Q3VycmVudEZyYW1lKGFjdGlvbiwgc2VxdWVuY2VJbmRleCk7XG4gIGRpc3BsYXkuZHJhd1BsYXllcihwbGF5ZXJBbmltYXRvci5nZXRJbWFnZSgpLCBmcmFtZSwgZ2FtZS5nZXRQbGF5ZXJJbmZvKCkpO1xuICBkaXNwbGF5LmRyYXdNYXAoMSk7XG59O1xuXG5jb25zdCB1cGRhdGUgPSAoKSA9PiB7XG4gIGdhbWUudXBkYXRlKCk7XG4gIGlmIChjb250cm9sbGVyLmlzTGVmdEFjdGl2ZSgpKSB7XG4gICAgY2FtZXJhLm1vdmVMZWZ0KCk7XG4gICAgZ2FtZS5tb3ZlUGxheWVyKCdsZWZ0Jyk7XG4gIH0gZWxzZSBpZiAoY29udHJvbGxlci5pc1JpZ2h0QWN0aXZlKCkpIHtcbiAgICBjYW1lcmEubW92ZVJpZ2h0KCk7XG4gICAgZ2FtZS5tb3ZlUGxheWVyKCdyaWdodCcpO1xuICB9IGVsc2UgaWYgKGNvbnRyb2xsZXIuaXNVcEFjdGl2ZSgpKSB7XG4gICAgY2FtZXJhLm1vdmVVcCgpO1xuICAgIGdhbWUubW92ZVBsYXllcigndXAnKTtcbiAgfSBlbHNlIGlmIChjb250cm9sbGVyLmlzRG93bkFjdGl2ZSgpKSB7XG4gICAgY2FtZXJhLm1vdmVEb3duKCk7XG4gICAgZ2FtZS5tb3ZlUGxheWVyKCdkb3duJyk7XG4gIH0gZWxzZSBpZiAoY29udHJvbGxlci5pc0lkbGUoKSkge1xuICAgIGdhbWUubW92ZVBsYXllcignaWRsZScpO1xuICB9XG59O1xuXG5jb25zdCBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdjYW52YXMnKTtcbmNvbnRyb2xsZXIgPSBuZXcgQ29udHJvbGxlcigpO1xuZW5naW5lID0gbmV3IEVuZ2luZShyZW5kZXIsIHVwZGF0ZSk7XG5kaXNwbGF5ID0gbmV3IERpc3BsYXkoY2FudmFzLCBtYXAsIGNhbWVyYSwgU0laRSwgU0laRSk7XG5nYW1lID0gbmV3IEdhbWUobWFwLCBwbGF5ZXIsIGNhbWVyYSk7XG5tYXAuc2V0T25Mb2FkKCgpID0+IHtcbiAgZGlzcGxheS5yZXNpemUoKTtcbn0pO1xuZW5naW5lLnN0YXJ0KCk7IiwiY2xhc3MgSW1hZ2VMb2FkZXIge1xuICBjb25zdHJ1Y3Rvcih7IHNyYyB9KSB7XG4gICAgdGhpcy5faW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICB0aGlzLl9pbWFnZS5zcmMgPSBzcmM7XG4gIH1cblxuICBzZXRPbkxvYWQoY2FsbGJhY2spIHtcbiAgICB0aGlzLl9pbWFnZS5vbmxvYWQgPSBjYWxsYmFjaztcbiAgfVxuXG4gIGdldEltYWdlKCkge1xuICAgIHJldHVybiB0aGlzLl9pbWFnZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBJbWFnZUxvYWRlcjsiLCJleHBvcnQgeyBkZWZhdWx0IGFzIEltYWdlTG9hZGVyIH0gZnJvbSAnLi9pbWFnZS1sb2FkZXIuanMnOyIsImltcG9ydCB7IEltYWdlTG9hZGVyIH0gZnJvbSAnLi9taXhpbnMvaW5kZXguanMnO1xuXG5cbmNvbnN0IERFTEFZID0gNztcbmV4cG9ydCBjbGFzcyBQbGF5ZXJBbmltYXRvciBleHRlbmRzIEltYWdlTG9hZGVyIHtcbiAgY29uc3RydWN0b3IoeyBzcmMsIHBvc2l0aW9ucywgaW5pdFBsYXllclN0YXRlLCAuLi5yZXN0IH0pIHtcbiAgICBzdXBlcih7IHNyYyB9KTtcbiAgICB0aGlzLnBvc2l0aW9ucyA9IHBvc2l0aW9ucztcbiAgICBmb3IgKGNvbnN0IFsgcHJvcCwgdmFsdWUgXSBvZiBPYmplY3QuZW50cmllcyhyZXN0KSkge1xuICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIGNvbnRpbnVlO1xuICAgICAgdGhpc1twcm9wXSA9IHZhbHVlO1xuICAgIH1cbiAgICB0aGlzLl9jcmVhdGVGcmFtZVNldHMoKTtcbiAgICB0aGlzLl9jdXJyZW50RnJhbWUgPSB0aGlzLl9mcmFtZVNldHNbaW5pdFBsYXllclN0YXRlLmFjdGlvbl1bMF07XG4gICAgdGhpcy5fY291bnQgPSAwO1xuICAgIHRoaXMuX2RlbGF5ID0gREVMQVk7XG4gIH1cblxuICBfY3JlYXRlRnJhbWVTZXRzKCkge1xuICAgIHRoaXMuX2ZyYW1lU2V0cyA9IHt9O1xuICAgIGZvciAoY29uc3QgWyBtb3ZlLCBzZXF1ZW5jZSBdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMubW92ZVNlcXVlbmNlcykpIHtcbiAgICAgIHRoaXMuX2ZyYW1lU2V0c1ttb3ZlXSA9IHNlcXVlbmNlLm1hcCh0aGlzLmdldFRpbGUuYmluZCh0aGlzKSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0Q3VycmVudEZyYW1lKGFjdGlvbiwgc2VxdWVuY2VJbmRleCkge1xuICAgIGlmICh0aGlzLl9jb3VudCA+PSB0aGlzLl9kZWxheSkge1xuICAgICAgdGhpcy5fY291bnQgPSAwO1xuICAgICAgdGhpcy5fY3VycmVudEZyYW1lID0gIHRoaXMuX2ZyYW1lU2V0c1thY3Rpb25dW3NlcXVlbmNlSW5kZXhdO1xuICAgIH1cbiAgICB0aGlzLl9jb3VudCsrO1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50RnJhbWU7XG4gIH1cblxuICBnZXRUaWxlKFsgcm93LCBjb2wgXSkge1xuICAgIHJldHVybiBbXG4gICAgICBjb2wqdGhpcy50c2l6ZSwgLy8geFxuICAgICAgcm93KnRoaXMudHNpemUsIC8vIHlcbiAgICAgIHRoaXMudHNpemUsIC8vIHdpZHRoXG4gICAgICB0aGlzLnRzaXplIC8vIGhlaWdodFxuICAgIF07XG4gIH1cbn0iLCJpbXBvcnQgeyBBQ1RJT05TIH0gZnJvbSAnLi9jb25zdGFudHMuanMnO1xuY29uc3Qge1xuXHRXQUxLX1VQLFxuXHRXQUxLX0RPV04sXG5cdFdBTEtfUklHSFQsXG5cdFdBTEtfTEVGVCxcblx0SURMRV9ET1dOLFxuXHRJRExFX1VQLFxuXHRJRExFX1JJR0hULFxuXHRJRExFX0xFRlRcbn0gPSBBQ1RJT05TO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIge1xuXHRjb25zdHJ1Y3RvcihzaXplLCBjYW1lcmEsIG1hcCkge1xuXHRcdHRoaXMuc2NyZWVuWCA9IGNhbWVyYS53aWR0aC8yIC0gc2l6ZTtcblx0XHR0aGlzLnNjcmVlblkgPSBjYW1lcmEuaGVpZ2h0LzIgLSBzaXplO1xuXHRcdHRoaXMuY2FtZXJhID0gY2FtZXJhO1xuXHRcdHRoaXMubWFwID0gbWFwO1xuXHRcdHRoaXMud2lkdGggPSBzaXplO1xuXHRcdHRoaXMuaGVpZ2h0ID0gIHNpemU7XG5cdFx0dGhpcy5faW5pdCgpO1xuXHR9XG5cblx0dXBkYXRlKCkge1xuXHRcdHRoaXMueCA9IHRoaXMuc2NyZWVuWCArIHRoaXMuY2FtZXJhLng7XG5cdFx0dGhpcy55ID0gdGhpcy5zY3JlZW5ZICsgdGhpcy5jYW1lcmEueTtcblx0fVxuXG5cblx0bW92ZVJpZ2h0KCkge1xuXHRcdHRoaXMuX3VwZGF0ZVN0YXRlKFdBTEtfUklHSFQpO1xuXHR9XG5cblx0bW92ZUxlZnQoKSB7XG5cdFx0dGhpcy5fdXBkYXRlU3RhdGUoV0FMS19MRUZUKTtcblx0fVxuXG5cdG1vdmVVcCgpIHtcblx0XHR0aGlzLl91cGRhdGVTdGF0ZShXQUxLX1VQKTtcblx0fVxuXG5cdG1vdmVEb3duKCkge1xuXHRcdHRoaXMuX3VwZGF0ZVN0YXRlKFdBTEtfRE9XTik7XG5cdH1cblxuXHRnZXRTY3JlZW5Db29yZGluYXRlKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHR4OiB0aGlzLnggLSB0aGlzLmNhbWVyYS54LFxuXHRcdFx0eTogdGhpcy55IC0gdGhpcy5jYW1lcmEueVxuXHRcdH07XG5cdH1cblxuXHRfaW5pdCgpIHtcblx0XHR0aGlzLl9zdGF0ZSA9IHtcblx0XHRcdGFjdGlvbjogSURMRV9ET1dOLm5hbWUsXG5cdFx0XHRhY3Rpb25TZXF1ZW5jZUluZGV4OiB7fVxuXHRcdH07XG5cdFx0Zm9yIChjb25zdCBhY3Rpb24gb2YgT2JqZWN0LnZhbHVlcyhBQ1RJT05TKSkge1xuXHRcdFx0dGhpcy5fc3RhdGUuYWN0aW9uU2VxdWVuY2VJbmRleFthY3Rpb24ubmFtZV0gPSAwO1xuXHRcdH1cblx0XHR0aGlzLnggPSB0aGlzLnNjcmVlblggKyB0aGlzLmNhbWVyYS54O1xuXHRcdHRoaXMueSA9IHRoaXMuc2NyZWVuWSArIHRoaXMuY2FtZXJhLnk7XG5cdH1cblxuXHRfdXBkYXRlU3RhdGUoY3VycmVudEFjdGlvbikge1xuXHRcdC8vIHVwZGF0ZSBjdXJyZW50IGFjdGlvblxuXHRcdHRoaXMuX3N0YXRlLmFjdGlvbiA9IGN1cnJlbnRBY3Rpb24ubmFtZTtcblx0XHQvLyBpbmNyZW1lbnQgdGhlIGN1cnJlbnQgYWN0aW9uXG5cdFx0dGhpcy5fc3RhdGUuYWN0aW9uU2VxdWVuY2VJbmRleFtjdXJyZW50QWN0aW9uLm5hbWVdID0gKHRoaXMuX3N0YXRlLmFjdGlvblNlcXVlbmNlSW5kZXhbY3VycmVudEFjdGlvbi5uYW1lXSArIDEpICUgY3VycmVudEFjdGlvbi5sZW5ndGg7XG5cdFx0Ly8gcmVzZXQgYWN0aW9uIHNlcXVlbmNlIGluZGV4IGZvciBvdGhlciBhY3Rpb25zXG5cdFx0Zm9yIChjb25zdCBhY3Rpb24gb2YgT2JqZWN0LnZhbHVlcyhBQ1RJT05TKSkge1xuXHRcdFx0aWYgKGFjdGlvbi5uYW1lICE9PSBjdXJyZW50QWN0aW9uLm5hbWUpIHtcblx0XHRcdFx0dGhpcy5fc3RhdGUuYWN0aW9uU2VxdWVuY2VJbmRleFthY3Rpb24ubmFtZV0gPSAwO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGdldE1vdmVTdGF0ZSgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0YWN0aW9uOiB0aGlzLl9zdGF0ZS5hY3Rpb24sXG5cdFx0XHRzZXF1ZW5jZUluZGV4OiB0aGlzLl9zdGF0ZS5hY3Rpb25TZXF1ZW5jZUluZGV4W3RoaXMuX3N0YXRlLmFjdGlvbl1cblx0XHR9O1xuXHR9XG5cblx0ZmFjZShkaXJlY3Rpb24pIHtcblx0XHRyZXR1cm4gdGhpcy5fc3RhdGUuYWN0aW9uLmluZGV4T2YoZGlyZWN0aW9uKSA+PTA7XG5cdH1cblxuXHRzZXRJZGxlKCkge1xuXHRcdGlmICh0aGlzLmZhY2UoJ3JpZ2h0JykpIHRoaXMuX3VwZGF0ZVN0YXRlKElETEVfUklHSFQpO1xuXHRcdGlmICh0aGlzLmZhY2UoJ2xlZnQnKSkgdGhpcy5fdXBkYXRlU3RhdGUoSURMRV9MRUZUKTtcblx0XHRpZiAodGhpcy5mYWNlKCd1cCcpKSB0aGlzLl91cGRhdGVTdGF0ZShJRExFX1VQKTtcblx0XHRpZiAodGhpcy5mYWNlKCdkb3duJykpIHRoaXMuX3VwZGF0ZVN0YXRlKElETEVfRE9XTik7XG5cdH1cbn0iXSwic291cmNlUm9vdCI6IiJ9