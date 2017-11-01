import Entity from './Entity.js'
import Velocity from './traits/Velocity.js'
import Jump from './traits/Jump.js'
import Go from './traits/Go.js'
import { loadMarioSprite } from './sprites.js'

// eslint-disable-next-line
export function createMario() {
    return loadMarioSprite()
        .then(sprite => {
            const mario = new Entity()
            mario.pos.set(64, 180)
            mario.vel.set(0, 0)
            mario.size.set(14, 16)

            mario.addTrait(new Jump())
            mario.addTrait(new Velocity())
            mario.addTrait(new Go())

            mario.draw = function drawMario(context) {
                sprite.draw('idle', context, 0, 0)
            }

            return mario
        })
}