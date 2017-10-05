import { createBackgroundLayer, createSpriteLayer } from './layers.js'
import Compositor from './Compositor.js'
import { createMario } from './entities.js'
import { loadBackgroundSprites } from './sprites.js'
import { loadLevel } from './loaders.js'
import Timer from './Timer.js'

const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')

Promise.all([
    loadBackgroundSprites(),
    loadLevel('1-1'),
    createMario(),
])
    .then(([ backgroundSprites, levelSpec, mario ]) => {
        const comp = new Compositor()
        comp.addLayer(createBackgroundLayer(levelSpec.backgrounds, backgroundSprites))
        comp.addLayer(createSpriteLayer(mario))

        const timer = new Timer()

        timer.update = function update(deltaTime) {
            comp.draw(context)

            mario.update(deltaTime)
            mario.vel.y += 30 // Gravity
        }

        timer.start()
    })