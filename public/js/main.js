import { createBackgroundLayer, createSpriteLayer } from './layers.js'
import Compositor from './Compositor.js'
import Timer from './Timer.js'
import { createMario } from './entities.js'
import { loadBackgroundSprites } from './sprites.js'
import { loadLevel } from './loaders.js'
import { setupInput } from './input.js'

const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')

const GRAVITY = 2000

Promise.all([
    loadBackgroundSprites(),
    loadLevel('1-1'),
    createMario(),
])
    .then(([ backgroundSprites, levelSpec, mario ]) => {
        const comp = new Compositor()
        comp.addLayer(createBackgroundLayer(levelSpec.backgrounds, backgroundSprites))
        comp.addLayer(createSpriteLayer(mario))

        setupInput(mario).listenTo(window)

        const timer = new Timer()

        timer.update = function update(deltaTime) {
            mario.update(deltaTime)
            comp.draw(context)
            mario.vel.y += GRAVITY * deltaTime
        }

        timer.start()
    })