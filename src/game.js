class Game {
	constructor(map, player, camera) {
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
		const { height, width } = this.player;
		const { x, y } = this.playerCoordinates;
		this.camera.stop.left = this._leftCollision({ x, y, height, width });
		this.camera.stop.right = this._rightCollision({ x, y, height, width });
		this.camera.stop.up = this._topCollision({ x, y, height, width });
		this.camera.stop.down = this._bottomCollision({ x, y, height, width });
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
		const one = [ x + width + this.collisionOffset, y ];
		const two = [ x + width + this.collisionOffset, y + 1 ];
		const three = [ x + width + this.collisionOffset, y + height ];
		const four = [ x + width + this.collisionOffset, y + height - 1 ];
		const first = Boolean(this.map.collision(one[0], one[1])) && Boolean(this.map.collision(two[0], two[1]));
		const second = Boolean(this.map.collision(three[0], three[1])) && Boolean(this.map.collision(four[0], four[1]));
		return first || second;
	}

	_leftCollision({ x, y, height }) {
		const one = [ x - this.collisionOffset, y ];
		const two = [ x - this.collisionOffset, y + 1 ];
		const three = [ x - this.collisionOffset, y  + height ];
		const four = [ x - this.collisionOffset, y + height - 1 ];
		const first = Boolean(this.map.collision(one[0], one[1])) && Boolean(this.map.collision(two[0], two[1]));
		const second = Boolean(this.map.collision(three[0], three[1])) && Boolean(this.map.collision(four[0], four[1]));
		return first || second;
	}

	_topCollision({ x, y, width }) {
		const one = [ x, y - this.collisionOffset ];
		const two = [ x + 1, y  - this.collisionOffset ];
		const three = [ x + width, y - this.collisionOffset ];
		const four = [ x + width - 1, y - this.collisionOffset ];
		const first = Boolean(this.map.collision(one[0], one[1])) && Boolean(this.map.collision(two[0], two[1]));
		const second = Boolean(this.map.collision(three[0], three[1])) && Boolean(this.map.collision(four[0], four[1]));
		return first || second;
	}

	_bottomCollision({ x, y, height, width }) {
		const one = [ x, y + height + this.collisionOffset ];
		const two = [ x + 1, y + height + this.collisionOffset ];
		const three = [ x + width, y + height + this.collisionOffset ];
		const four = [ x + width - 1, y + height + this.collisionOffset ];
		const first = Boolean(this.map.collision(one[0], one[1])) && Boolean(this.map.collision(two[0], two[1]));
		const second = Boolean(this.map.collision(three[0], three[1])) && Boolean(this.map.collision(four[0], four[1]));
		return first || second;
	}
}

export default Game;