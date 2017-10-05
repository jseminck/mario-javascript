import { createBackgroundLayer, createSpriteLayer } from './layers.js'
import { loadBackgroundSprites, loadMarioSprite } from './sprites.js'
import Compositor from './Compositor.js'
import { loadLevel } from './loaders.js'

const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')

Promise.all([
    loadBackgroundSprites(),
    loadLevel('1-1'),
    loadMarioSprite(),
])
    .then(([ backgroundSprites, levelSpec, mario ]) => {
        const pos = {
            x: 64,
            y: 64,
        }

        const comp = new Compositor()
        comp.addLayer(createBackgroundLayer(levelSpec.backgrounds, backgroundSprites))
        comp.addLayer(createSpriteLayer(mario, pos))

        function update() {
            comp.draw(context)

            mario.draw('idle', context, pos.x, pos.y)
            pos.x += 2
            pos.y += 1
            requestAnimationFrame(update)
        }

        update()
    })