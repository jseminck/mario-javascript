import SpriteSheet from './SpriteSheet.js'
import { loadImage } from './loaders.js'

export function loadMarioSprite() { // eslint-disable-line
    return loadImage('/sprites/characters.gif')
        .then(image => {
            const mario = new SpriteSheet(image, 16, 16)

            mario.define('idle', 276, 44, 16, 16)
            return mario
        })
}