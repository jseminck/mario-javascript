import Trait from "./Trait.js";

export default class Go extends Trait {
    constructor() {
        super("go")
        this.speed = 200
        this.distance = 0

        this.dir = 0
        // Remembers the last direction. Even if we are stopped and direction is set back to 0
        this.heading = 1
    }

    setDirection(dir) {
        this.dir = dir;
        if (this.dir !== 0) {
            this.heading = dir;
        }
        else { // this.dir === 0
            this.distance = 0;
        }
    }

    update(entity, deltaTime) {
        entity.vel.x = this.speed * this.dir
        this.distance += Math.abs(entity.vel.x) * deltaTime;
    }
}