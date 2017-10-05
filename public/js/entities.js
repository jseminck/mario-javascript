
import Entity from './Entity.js'
import { loadMarioSprite } from './sprites.js'

// eslint-disable-next-line
export function createMario() {
    return loadMarioSprite()
        .then(sprite => {
            const mario = new Entity()
            mario.pos.set(64, 180)
            mario.vel.set(200, -600)

            mario.draw = function drawMario(context) {
                sprite.draw('idle', context, mario.pos.x, mario.pos.y)
            }
            mario.update = function updateMario(deltaTime) {
                this.pos.x += this.vel.x * deltaTime
                this.pos.y += this.vel.y * deltaTime
            }

            return mario
        })
}