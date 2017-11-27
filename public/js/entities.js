import Entity from './Entity.js'
import Jump from './traits/Jump.js'
import Go from './traits/Go.js'
import { loadSpriteSheet } from './loaders.js'

function createAnim(frames, frameDuration) {
    return function resolveFrame(distance) {
        return frames[Math.floor(distance / frameDuration % frames.length)];
    }
}

// eslint-disable-next-line
export function createMario() {
    return loadSpriteSheet("mario")
        .then(sprite => {
            const mario = new Entity()
            mario.size.set(14, 16)

            mario.addTrait(new Jump())
            mario.addTrait(new Go())

            const runAnim = createAnim(['run-1', 'run-2', 'run-3'], 10);

            function routeFrame(mario) {
                if (mario.isMovingRight() || mario.isMovingLeft()) {
                    return runAnim(mario.go.distance);
                }

                return 'idle';
            }

            mario.draw = function drawMario(context) {
                sprite.draw(routeFrame(this), context, 0, 0)
            }

            return mario
        });
}