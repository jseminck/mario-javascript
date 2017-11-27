import Trait from "./Trait.js";

export default class Go extends Trait {
    constructor() {
        super("go")
        this.dir = 0
        this.speed = 200
        this.distance = 0
    }

    update(entity, deltaTime) {
        entity.vel.x = this.speed * this.dir

        this.distance += Math.abs(entity.vel.x) * deltaTime;
        if (this.dir === 0) {
            this.distance = 0;
        }
    }
}