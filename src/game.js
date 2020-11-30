class Game {
	constructor(map, player, camera) {
		this.map = map;
		this.player = player;
		this.camera = camera;
		this.collisionOffset = this.camera.speed;
	}

	update() {
		this.player.update();
		this.collide();
	}

	getPlayerInfo() {
		return {
			...this.player.getScreenCoordinate(),
			width: this.player.width,
			height: this.player.height,
			color: this.player.color
		};
	}

	movePlayer(direction) {
		if (direction === 'right') this.player.moveRight();
		if (direction === 'left') this.player.moveLeft();
		if (direction === 'up') this.player.moveUp();
		if (direction === 'down') this.player.moveDown();
		if (direction === 'idle') this.player.setIdle();
	}


	// coords in map
	collide() {
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

	_rightCollision() {
		const one = [ this.player.x + this.player.width + this.collisionOffset, this.player.y ];
		const two = [ this.player.x + this.player.width + this.collisionOffset, this.player.y + 1 ];
		const three = [ this.player.x + this.player.width + this.collisionOffset, this.player.y + this.player.height ];
		const four = [ this.player.x + this.player.width + this.collisionOffset, this.player.y + this.player.height - 1 ];
		const first = Boolean(this.map.collision(one[0], one[1])) && Boolean(this.map.collision(two[0], two[1]));
		const second = Boolean(this.map.collision(three[0], three[1])) && Boolean(this.map.collision(four[0], four[1]));
		return first || second;
	}

	_leftCollision() {
		const one = [ this.player.x - this.collisionOffset, this.player.y ];
		const two = [ this.player.x - this.collisionOffset, this.player.y + 1 ];
		const three = [ this.player.x - this.collisionOffset, this.player.y  + this.player.height ];
		const four = [ this.player.x - this.collisionOffset, this.player.y + this.player.height - 1 ];
		const first = Boolean(this.map.collision(one[0], one[1])) && Boolean(this.map.collision(two[0], two[1]));
		const second = Boolean(this.map.collision(three[0], three[1])) && Boolean(this.map.collision(four[0], four[1]));
		return first || second;
	}

	_topCollision() {
		const one = [ this.player.x, this.player.y - this.collisionOffset ];
		const two = [ this.player.x + 1, this.player.y  - this.collisionOffset ];
		const three = [ this.player.x + this.player.width, this.player.y - this.collisionOffset ];
		const four = [ this.player.x + this.player.width - 1, this.player.y - this.collisionOffset ];
		const first = Boolean(this.map.collision(one[0], one[1])) && Boolean(this.map.collision(two[0], two[1]));
		const second = Boolean(this.map.collision(three[0], three[1])) && Boolean(this.map.collision(four[0], four[1]));
		return first || second;
	}

	_bottomCollision() {
		const one = [ this.player.x, this.player.y + this.player.height + this.collisionOffset ];
		const two = [ this.player.x + 1, this.player.y + this.player.height + this.collisionOffset ];
		const three = [ this.player.x + this.player.width, this.player.y + this.player.height + this.collisionOffset ];
		const four = [ this.player.x + this.player.width - 1, this.player.y + this.player.height + this.collisionOffset ];
		const first = Boolean(this.map.collision(one[0], one[1])) && Boolean(this.map.collision(two[0], two[1]));
		const second = Boolean(this.map.collision(three[0], three[1])) && Boolean(this.map.collision(four[0], four[1]));
		return first || second;
	}
}

export default Game;