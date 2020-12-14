import { WORLD } from './asset-info';

class Game {
	constructor(map, player, camera, dispatchFunction) {
		this.map = map;
		this.player = player;
		this.camera = camera;
		this.collisionOffset = this.camera.speed;
		this.playerCoordinates = {
			screenX: camera.width/2 - this.player.width,
			screenY: camera.height/2 - this.player.height,
			x: camera.width/2 - this.player.width + this.camera.x,
			y: camera.height/2 - this.player.height + this.camera.y
		};
		this.dispatchFunction = dispatchFunction;
	}

	update() {
		this.updatePlayerCoordinates();
		this.collide();
	}

	getPlayerInfo() {
		return {
			image: this.player.getImage(),
			frame: this.player.getCurrentFrame(),
			x: this.playerCoordinates.screenX,
			y: this.playerCoordinates.screenY,
			width: this.player.width,
			height: this.player.height
		};
	}

	movePlayer(direction) {
		if (direction === 'right') this.player.moveRight();
		if (direction === 'left') this.player.moveLeft();
		if (direction === 'up') this.player.moveUp();
		if (direction === 'down') this.player.moveDown();
		if (direction === 'idle') this.player.setIdle();
	}

	updatePlayerCoordinates() {
		this.playerCoordinates.x = this.playerCoordinates.screenX + this.camera.x;
		this.playerCoordinates.y = this.playerCoordinates.screenY + this.camera.y;
	}


	collide() {
		this.camera.reset();

		// get player size and coord
		const { height, width } = this.player;
		const { x, y } = this.playerCoordinates;

		// get collision info
		const leftCollision = this._leftCollision({ x, y, height, width });
		const rightCollision = this._rightCollision({ x, y, height, width });
		const bottomCollision = this._bottomCollision({ x, y, height, width });
		const topCollision = this._topCollision({ x, y, height, width });

		// stop camera if necessary
		this.camera.stop.left = leftCollision;
		this.camera.stop.right = rightCollision;
		this.camera.stop.down = bottomCollision;
		this.camera.stop.up = topCollision;

		// display speech dialog
		if (bottomCollision && this.player.face('down')) {
			this._handleSpeech(x + width/2, y + height + this.collisionOffset);
		} else if (topCollision && this.player.face('up'))  {
			this._handleSpeech(x + width/2, y - this.collisionOffset);
		} else if (rightCollision && this.player.face('right'))  {
			this._handleSpeech(x + width + this.collisionOffset, y + height/2);
		} else if (leftCollision && this.player.face('left'))  {
			this._handleSpeech(x - this.collisionOffset, y + height/2);
		} else {
			this._cancelSpeechDialog();
		}
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

	_rightCollision({ x, y, height, width }) {
		const pointsToCheck = [
			[ x + width + this.collisionOffset, y ],
			[ x + width + this.collisionOffset, y + 1 ],
			[ x + width + this.collisionOffset, y + height ],
			[ x + width + this.collisionOffset, y + height - 1 ]
		];
		return this.map.collision(pointsToCheck[0][0], pointsToCheck[0][1]) &&
			this.map.collision(pointsToCheck[1][0], pointsToCheck[1][1]) ||
			this.map.collision(pointsToCheck[2][0], pointsToCheck[2][1]) &&
			this.map.collision(pointsToCheck[3][0], pointsToCheck[3][1]);
	}

	_leftCollision({ x, y, height }) {
		const pointsToCheck = [
			[ x - this.collisionOffset, y ],
			[ x - this.collisionOffset, y + 1 ],
			[ x - this.collisionOffset, y  + height ],
			[ x - this.collisionOffset, y + height - 1 ]
		];
		return this.map.collision(pointsToCheck[0][0], pointsToCheck[0][1]) &&
			this.map.collision(pointsToCheck[1][0], pointsToCheck[1][1]) ||
			this.map.collision(pointsToCheck[2][0], pointsToCheck[2][1]) &&
			this.map.collision(pointsToCheck[3][0], pointsToCheck[3][1]);
	}

	_topCollision({ x, y, width }) {
		const pointsToCheck = [
			[ x, y - this.collisionOffset ],
			[ x + 1, y  - this.collisionOffset ],
			[ x + width, y - this.collisionOffset ],
			[ x + width - 1, y - this.collisionOffset ]
		];
		return this.map.collision(pointsToCheck[0][0], pointsToCheck[0][1]) &&
			this.map.collision(pointsToCheck[1][0], pointsToCheck[1][1]) ||
			this.map.collision(pointsToCheck[2][0], pointsToCheck[2][1]) &&
			this.map.collision(pointsToCheck[3][0], pointsToCheck[3][1]);
	}

	_bottomCollision({ x, y, height, width }) {
		const pointsToCheck = [
			[ x, y + height + this.collisionOffset ],
			[ x + 1, y + height + this.collisionOffset ],
			[ x + width, y + height + this.collisionOffset ],
			[ x + width - 1, y + height + this.collisionOffset ]
		];
		return this.map.collision(pointsToCheck[0][0], pointsToCheck[0][1]) &&
			this.map.collision(pointsToCheck[1][0], pointsToCheck[1][1]) ||
			this.map.collision(pointsToCheck[2][0], pointsToCheck[2][1]) &&
			this.map.collision(pointsToCheck[3][0], pointsToCheck[3][1]);
	}

	_handleSpeech(x, y) {
		const element = this.map.getElement(x, y);
		if (element === WORLD.elements.ocean && !this._speechDialogInvoked) {
			this._displaySpeechDialog('I can\'t swim!');
		}
		if (element === WORLD.elements.tree_bottom && !this._speechDialogInvoked) {
			this._displaySpeechDialog('I like cheese! 🧀');
		}
	}

	_displaySpeechDialog(content) {
		this._speechDialogInvoked = true;
		this.dispatchFunction({
			show: true,
			content
		});
	}

	_cancelSpeechDialog() {
		if (this._speechDialogInvoked) {
			this._speechDialogInvoked = false;
			this.dispatchFunction({
				show: false
			});
		}
	}
}

export default Game;