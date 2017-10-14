import { Vec2 } from './math.js'

export default class Entity {
    constructor() {
        this.pos = new Vec2(0, 0)
        this.vel = new Vec2(0, 0)
        this.size = new Vec2(0, 0)

        this.traits = []
    }

    addTrait(trait) {
        this.traits.push(trait)
        this[trait.NAME] = trait
    }

    update(deltaTime) {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime)
        })
    }

    isMovingRight() {
        return this.vel.x > 0
    }

    isMovingLeft() {
        return this.vel.x < 0
    }

    isMovingUp() {
        return this.vel.y < 0
    }

    isMovingDown() {
        return this.vel.y > 0
    }
}