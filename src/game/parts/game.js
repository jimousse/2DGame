import { WORLD, PLAYER, CAT } from './asset-info';
import Player from './player';
import NPC from './npc';

class Game {
	constructor(map, camera, dispatchFunction) {
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
			camera: this.camera,
			speed: - this.camera.speed,
			dialog: {
				name: 'Jasper',
				text: 'Meoooow ❤️'
			},
			coord: { // 🤷🏻‍♂️
				screenX: 0.6*this.camera.width,
				screenY: 0.6*this.camera.height,
				x: 0.6*this.camera.width + this.camera.x,
				y: 0.6*this.camera.height + this.camera.y
			}
		});
	}

	update() {
		this.updatePlayerCoordinates();
		this.npc.update();
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
		const mapCollision = this.map.collision(x, y, width, height, this.collisionOffset);
		const npcCollision = this.npc.collision(x, y, width, height,  this.collisionOffset);

		const left = mapCollision.left || npcCollision.left;
		const right = mapCollision.right || npcCollision.right;
		const bottom = mapCollision.bottom || npcCollision.bottom;
		const top = mapCollision.top || npcCollision.top;

		// stop camera if necessary
		this.camera.stop.left = left;
		this.camera.stop.right = right;
		this.camera.stop.down = bottom;
		this.camera.stop.up = top;

		// display speech dialog
		if (bottom && this.player.face('down')) {
			const _x = x + width/2;
			const _y = y + height + this.collisionOffset;
			this._handleSpeech(_x, _y, mapCollision, npcCollision);
		} else if (top && this.player.face('up'))  {
			const _x = x + width/2;
			const _y = y - this.collisionOffset;
			this._handleSpeech(_x, _y, mapCollision, npcCollision);
		} else if (right && this.player.face('right'))  {
			const _x = x + width + this.collisionOffset;
			const _y =  y + height/2;
			this._handleSpeech(_x, _y, mapCollision, npcCollision);
		} else if (left && this.player.face('left'))  {
			const _x = x - this.collisionOffset;
			const _y =  y + height/2;
			this._handleSpeech(_x, _y, mapCollision, npcCollision);
		} else {
			this._cancelSpeechDialog();
		}
	}


	_handleSpeech(x, y, mapCollision, npcCollision) {
		if (this._speechDialogInvoked) return;

		const isMapElement = Object.values(mapCollision).reduce((acc, value) => acc || value, false);
		const isNPC = Object.values(npcCollision).reduce((acc, value) => acc || value, false);

		if (isMapElement) {
			const element = this.map.getElement(x, y);
			switch (element) {
				case WORLD.elements.ocean[0]:
					this._displaySpeechDialog({
						name: 'Jimmy',
						text: 'I can\'t swim!'
					});
					break;
				case WORLD.elements.tree[0]:
					this._displaySpeechDialog({
						name: 'Jimmy',
						text: 'I like trees!'
					});
					break;
				default:
					break;
			}
		}

		if (isNPC) {
			this._displaySpeechDialog(this.npc.dialog);
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