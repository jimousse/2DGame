import { WORLD, PLAYER, CAT } from './asset-info';
import Player from './player';
import NPC from './npc';

const CAT_SPEED = 0.5;
const NPC_MAX_DISTANCE = 400;
class Game {
	constructor(map, camera, dispatchFunction) {
		this.collisionOffset = camera.speed;
		this.map = map;
		this.camera = camera;
		this.dispatchFunction = dispatchFunction;
		this._initPlayer();
		this._initNPCs();
		this._npcDistance = 0;
		this._npcHorizontalDirection = -1;
	}

	_initPlayer() {
		this.player = new Player(PLAYER, this.camera);
		this.player.screenX = this.camera.width/2;
		this.player.screenY = this.camera.height/2;
	}

	_initNPCs() {
		this.npc = new NPC({
			assetInfo: CAT,
			camera: this.camera,
			dialog: {
				name: 'Jasper',
				text: 'Meoooow ❤️'
			}
		});
		this.npc.screenX = this.player.screenX - 60,
		this.npc.screenY = this.player.screenY + 60;
	}

	update() {
		this.player.update();
		this.collide();
		this._npcStartMoving();
	}

	_npcStartMoving() {
		const { x, y, width, height } = this.npc;
		const playerCollision = this.player.collision(x, y, width, height, this.collisionOffset);
		const metPlayer = Object.values(playerCollision).reduce((acc, value) => acc || value, false);
		if (metPlayer) {
			this.npc.setIdle();
			return;
		};

		const mapCollision = this.map.collision(x, y, width, height, this.collisionOffset);
		const metOstacle = Object.values(mapCollision).reduce((acc, value) => acc || value, false);
		if (metOstacle) {
			this._npcHorizontalDirection = this._npcHorizontalDirection === 1 ? -1 : 1;
			this._npcDistance = 0;
		}
		if(this._npcHorizontalDirection < 0) {
			this.npc.moveLeft();
			this.npc.screenX -= CAT_SPEED;
			if (this._npcDistance > NPC_MAX_DISTANCE) {
				this._npcHorizontalDirection = 1;
				this._npcDistance = 0;
			}
		} else {
			this.npc.moveRight();
			this.npc.screenX += CAT_SPEED;
			if (this._npcDistance > NPC_MAX_DISTANCE) {
				this._npcHorizontalDirection = -1;
				this._npcDistance = 0;
			}
		}
		this._npcDistance += CAT_SPEED;
	}

	getPlayerInfo() {
		return this.player.getDisplayInfo();
	}

	getNPCsInfo() {
		return this.npc.getDisplayInfo();
	}

	moveLeft() {
		this.camera.moveLeft();
		this.player.moveLeft();
		this.npc.keepImmobile('left');

	}

	moveRight() {
		this.camera.moveRight();
		this.player.moveRight();
		this.npc.keepImmobile('right');
	}

	moveUp() {
		this.camera.moveUp();
		this.player.moveUp();
		this.npc.keepImmobile('up');

	}

	moveDown() {
		this.camera.moveDown();
		this.player.moveDown();
		this.npc.keepImmobile('down');

	}

	setIdle() {
		this.player.setIdle();
	}

	collide() {
		this.camera.reset();

		// get player size and coord
		const { height, width, x, y } = this.player;

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