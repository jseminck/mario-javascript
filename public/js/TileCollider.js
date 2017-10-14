import TileResolver from "./TileResolver.js";

export default class TileCollider {
    constructor(tileMatrix) {
        this.tiles = new TileResolver(tileMatrix);
    }

    checkY(entity) {
        const matches = this.getMatches(entity)

        matches.forEach(match => {
            if (match.tile.name !== 'ground') {
                return;
            }

            // Moving down (falling)
            if (entity.vel.y > 0) {
                if (entity.pos.y + entity.size.y > match.y1) {
                    entity.pos.y = match.y1 - entity.size.y;
                    entity.vel.y = 0;
                }
            }
            // Moving up (jumping)
            else if (entity.vel.y < 0) {
                if (entity.pos.y < match.y2) {
                    entity.pos.y = match.y2
                    entity.vel.y = 0
                }
            }
        })
    }

    checkX(entity) {
        const matches = this.getMatches(entity)

        matches.forEach(match => {
            if (match.tile.name !== 'ground') {
                return;
            }
            // Moving right
            if (entity.vel.x > 0) {
                if (entity.pos.x + entity.size.x > match.x1) {
                    console.log("Collision detected while moving right");
                    entity.pos.x = match.x1 - entity.size.x;
                    entity.vel.x = 0;
                }
            }
            // Moving left
            else if (entity.vel.x < 0) {
                if (entity.pos.x < match.x2) {
                    console.log("Collision detected while moving left");
                    entity.pos.x = match.x2
                    entity.vel.x = 0
                }
            }
        })
    }

    getMatches(entity) {
        return this.tiles.matchByRange(
            entity.pos.x, entity.pos.x + entity.size.x,
            entity.pos.y, entity.pos.y + entity.size.y
        );
    }
}