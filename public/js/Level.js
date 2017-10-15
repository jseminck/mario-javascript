import Compositor from "./Compositor.js"
import TileCollider from "./TileCollider.js";
import { Matrix } from "./math.js"

export default class Level {
    constructor() {
        this.gravity = 2000;

        this.comp = new Compositor()
        this.entities = new Set()
        this.tiles = new Matrix()

        this.tileCollider = new TileCollider(this.tiles)
    }

    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime)

            // Move on the x-axis and check for x-collison
            entity.pos.x += entity.vel.x * deltaTime
            this.tileCollider.checkX(entity)

            // Move on the y-axis and check for y-collison
            entity.pos.y += entity.vel.y * deltaTime
            this.tileCollider.checkY(entity)

            entity.vel.y += this.gravity * deltaTime;
        });

    }
}