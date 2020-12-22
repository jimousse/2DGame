const CollisionDetector = base => {
	return class extends base {
		constructor() {
			super();
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
			const constantX = x + width + this.collisionOffset;
			const mapCollision =
				this.map.collision(constantX, y) &&
				this.map.collision(constantX, y + 1) ||
				this.map.collision(constantX, y + height) &&
				this.map.collision(constantX, y + height - 1);
			const npcCollision =
				this.npc.collision(constantX, y) ||
				this.npc.collision(constantX, y + height/ 2) ||
				this.npc.collision(constantX, y + height);

			return npcCollision || mapCollision;
		}

		_leftCollision({ x, y, height }) {
			const constantX = x - this.collisionOffset;
			const mapCollision =
				this.map.collision(constantX, y) &&
				this.map.collision(constantX, y + 1) ||
				this.map.collision(constantX, y  + height) &&
				this.map.collision(constantX, y + height - 1);
			const npcCollision =
				this.npc.collision(constantX, y) ||
				this.npc.collision(constantX, y  + height/2) ||
				this.npc.collision(constantX, y  + height);

			return npcCollision || mapCollision;
		}

		_topCollision({ x, y, width }) {
			const constantY = y - this.collisionOffset;
			const mapCollision =
				this.map.collision(x, constantY) &&
				this.map.collision(x + 1, constantY) ||
				this.map.collision(x + width, constantY) &&
				this.map.collision(x + width - 1, constantY);
			const npcCollision =
				this.npc.collision(x, constantY) ||
				this.npc.collision(x + width/2, constantY) ||
				this.npc.collision(x + width, constantY);

			return npcCollision || mapCollision;
		}

		_bottomCollision({ x, y, height, width }) {
			const constantY = y + height + this.collisionOffset;
			const mapCollision =
				this.map.collision(x, constantY) &&
				this.map.collision(x + 1, constantY) ||
				this.map.collision(x + width, constantY) &&
				this.map.collision(x + width - 1, constantY);
			const npcCollision =
				this.npc.collision(x, constantY) ||
				this.npc.collision(x + width / 2, constantY) ||
				this.npc.collision(x + width, constantY);

			return npcCollision || mapCollision;
		}
	};
};

export default CollisionDetector;