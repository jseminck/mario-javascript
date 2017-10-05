
import Entity from './Entity.js'
import { loadMarioSprite } from './sprites.js'

// eslint-disable-next-line
export function createMario() {
    return loadMarioSprite()
        .then(marioSprite => {
            const mario = new Entity()
            mario.pos.x = 64
            mario.pos.y = 64
            mario.draw = function drawMario(context) {
                marioSprite.draw('idle', context, mario.pos.x, mario.pos.y)
            }
            mario.update = function updateMario() {
                this.pos.y += this.vel.y
            }

            return mario
        })
}