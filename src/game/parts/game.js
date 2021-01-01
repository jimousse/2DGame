import { PLAYER } from './asset-info';
import Player from './player';
import NPC from './npc';
import { CATS } from './npc-cats';

class Game {
	constructor(map, camera, dispatchFunction) {
		this.collisionOffset = camera.speed;
		this.map = map;
		this.camera = camera;
		this.dispatchFunction = dispatchFunction;
		this._availableInitialPositions = [ ...this.map.grassPositions ];
		this._initPlayer();
		this._initNPCs();
	}

	_initPlayer() {
		this.player = new Player(PLAYER, this.camera);
		this.player.screenX = this.camera.width/2;
		this.player.screenY = this.camera.height/2;
	}

	_initNPCs() {
		this.npcs = CATS.map(npcDesc => {
			const position = this._getRandomInitialPosition();
			return new NPC({
				assetInfo: npcDesc.asset,
				camera: this.camera,
				dialog: {
					name: npcDesc.name,
					text: npcDesc.text
				},
				speed: npcDesc.speed,
				maxDistance: npcDesc.maxDistance,
				initialDirection: npcDesc.initialDirection,
				screenX: position[0] - this.camera.x + this.collisionOffset,
				screenY: position[1] - this.camera.y + this.collisionOffset
			});
		});
	}

	/**
	 * This method returns one of those position and ensures that
	 * there's no collision with map elements and the player.
	 * Once a position is returned, it is removed from this._availableInitialPositions
	 * to avoid having two NPCs with the same initial position.
	 */
	_getRandomInitialPosition() {
		let index = Math.floor(Math.random()*(this._availableInitialPositions.length - 1));
		let pickNext = true;
		let position;
		while(pickNext) {
			position = this.map.grassPositions[index];
			const playerCollision = this.player.collision(position[0], position[1], this.player.width, this.player.height, this.collisionOffset);
			const mapCollision = this.map.collision(position[0], position[1], this.player.width, this.player.height, this.collisionOffset);
			const inPlayer = Object.values(playerCollision).reduce((acc, value) => acc || value, false);
			const inObstacle = Object.values(mapCollision).reduce((acc, value) => acc || value, false);
			if (inPlayer || inObstacle) {
				index = (index + 1) % (this._availableInitialPositions.length - 1);
			} else {
				pickNext = false;
			}
		}
		// remove from available position to avoid clash
		this._availableInitialPositions.splice(index, 1);
		return position;
	}

	update() {
		this.player.update();
		this.collide();
		this.npcsMove();
	}

	npcsMove() {
		this.npcs.forEach((npc, i) => {
			let otherNPCs = [ ...this.npcs ];
			otherNPCs.splice(i, 1);
			const { x, y, width, height } = npc;
			const playerCollision = this.player.collision(x, y, width, height, this.collisionOffset);
			const { collision: npcCollision } = this.checkNPCsCollision(otherNPCs, { x, y, width, height });
			const mapCollision = this.map.collision(x, y, width, height, this.collisionOffset);
			const metOstacle = Object.values(mapCollision).reduce((acc, value) => acc || value, false);
			const metNPC = Object.values(npcCollision).reduce((acc, value) => acc || value, false);
			npc.move(metOstacle, playerCollision, metNPC);
		});
	}

	getCharactersDisplayInfo() {
		return [
			this.player.getDisplayInfo(),
			...this.npcs.map(npc => npc.getDisplayInfo())
		];
	}

	moveLeft() {
		this.camera.moveLeft();
		this.player.moveLeft();
		for (const npc of this.npcs) {
			npc.keepImmobile('left');
		}
	}

	moveRight() {
		this.camera.moveRight();
		this.player.moveRight();
		for (const npc of this.npcs) {
			npc.keepImmobile('right');
		}
	}

	moveUp() {
		this.camera.moveUp();
		this.player.moveUp();
		for (const npc of this.npcs) {
			npc.keepImmobile('up');
		}

	}

	moveDown() {
		this.camera.moveDown();
		this.player.moveDown();
		for (const npc of this.npcs) {
			npc.keepImmobile('down');
		}
	}

	setIdle() {
		this.player.setIdle();
	}

	checkNPCsCollision(npcList, { x, y, width, height }) {
		const collision = { left: false, right: false, top: false, bottom: false };
		let npcIndex = null;
		npcList.forEach((npc, i) =>{
			const currentCollision = npc.collision(x, y, width, height,  this.collisionOffset);
			collision.left = collision.left || currentCollision.left;
			collision.right = collision.right || currentCollision.right;
			collision.top = collision.top || currentCollision.top;
			collision.bottom = collision.bottom || currentCollision.bottom;
			if (Object.values(currentCollision).reduce((acc, value) => acc || value, false)) {
				npcIndex = i;
			}
		});
		return { collision, npcIndex };
	}

	collide() {
		this.camera.reset();

		// get player size and coord
		const { height, width, x, y } = this.player;

		// get collision info
		const mapCollision = this.map.collision(x, y, width, height, this.collisionOffset);
		const { collision: npcCollision, npcIndex } = this.checkNPCsCollision(this.npcs, { x, y, width, height });

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
		if (bottom && this.player.face('down') ||
			top && this.player.face('up') ||
			right && this.player.face('right') ||
			left && this.player.face('left')) {
				this._handleSpeech(npcIndex);
		} else {
			this._cancelSpeechDialog();
		}
	}

	_handleSpeech(npcIndex) {
		if (this._speechDialogInvoked || typeof npcIndex !== 'number') return;
		this._displaySpeechDialog(this.npcs[npcIndex].dialog);
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