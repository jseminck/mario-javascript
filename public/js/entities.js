import Entity from './Entity.js'
import Jump from './traits/Jump.js'
import Go from './traits/Go.js'
import { loadSpriteSheet } from './loaders.js'

// eslint-disable-next-line
export function createMario() {
    return loadSpriteSheet("mario")
        .then(sprite => {
            const mario = new Entity()
            mario.size.set(14, 16)

            mario.addTrait(new Jump())
            mario.addTrait(new Go())

            const frames = ['run-1', 'run-2', 'run-3'];

            function routeFrame(mario) {
                if (mario.isMovingRight() || mario.isMovingLeft()) {
                    return frames[Math.floor(mario.go.distance / 10 % frames.length)];
                }

                return 'idle';
            }

            mario.draw = function drawMario(context) {
                sprite.draw(routeFrame(this), context, 0, 0)
            }

            return mario
        });
}