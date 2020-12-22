import { WORLD, PLAYER, CAT } from './asset-info';
import Player from './player';
import Cat from './cat';
import { CollisionDetector, MultiMixins } from '../mixins/index';
import NPC from './npc';

class Game extends MultiMixins(CollisionDetector) {
	constructor(map, camera, dispatchFunction) {
		super();
		this.collisionOffset = camera.speed;
		this.map = map;
		this.camera = camera;
		this.dispatchFunction = dispatchFunction;
		this._initPlayer();
		this._initNPCs();
	}

	_initPlayer() {
		this.player = new Player(PLAYER);
		this.playerCoordinates = { // 🤷🏻‍♂️
			screenX: this.camera.width/2 - this.player.width,
			screenY: this.camera.height/2 - this.player.height,
			x: this.camera.width/2 - this.player.width + this.camera.x,
			y: this.camera.height/2 - this.player.height + this.camera.y
		};
	}

	_initNPCs() {
		this.npc = new NPC({
			assetInfo: CAT,
			Klass: Cat,
			coord: { // 🤷🏻‍♂️
				screenX: this.camera.width/2,
				screenY: this.camera.width/2,
				x: this.camera.width/2 + this.camera.x,
				y: this.camera.width/2 + this.camera.y
			}
		});
	}

	update() {
		this.updatePlayerCoordinates();
		this.collide();
		this._updateNPCs();
	}

	_updateNPCs() {
		this.npc.update();
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

	getNPCsInfo() {
		return this.npc.getDisplayInfo();
	}

	moveLeft() {
		this.camera.moveLeft();
		this.player.moveLeft();
		if (!this.camera.stop.left) {
			this.npc.coordinates.screenX += this.camera.speed;
		}
	}

	moveRight() {
		this.camera.moveRight();
		this.player.moveRight();
		if (!this.camera.stop.right) {
			this.npc.coordinates.screenX -= this.camera.speed;
		}
	}

	moveUp() {
		this.camera.moveUp();
		this.player.moveUp();
		if (!this.camera.stop.up) {
			this.npc.coordinates.screenY += this.camera.speed;
		}
	}

	moveDown() {
		this.camera.moveDown();
		this.player.moveDown();
		if (!this.camera.stop.down) {
			this.npc.coordinates.screenY -= this.camera.speed;
		}
	}

	setIdle() {
		this.player.setIdle();
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


	_handleSpeech(x, y) {
		if (this._speechDialogInvoked) return;
		if (this.map.getElement(x, y) === WORLD.elements.ocean) {
			this._displaySpeechDialog({
				name: 'Jimmy',
				text: 'I can\'t swim!'
			});
		}
		if (this.map.getElement(x, y) === WORLD.elements.tree_bottom) {
			this._displaySpeechDialog({
				name: 'Jimmy',
				text: 'I like trees!'
			});
		}
		if (this.npc.collision(x,y)) {
			this._displaySpeechDialog({
				name: 'Cat',
				text: 'Meooow ❤️'
			});
		}
	}

	_displaySpeechDialog(content) {
		this._speechDialogInvoked = true;
		this.dispatchFunction({
			show: true,
			...content
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