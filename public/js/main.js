import Timer from './Timer.js'
import { createMario } from './entities.js'
import { loadLevel } from './loaders.js'
import { setupInput } from './input.js'

const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')

const GRAVITY = 2000

Promise.all([
    loadLevel('1-1'),
    createMario(),
])
    .then(([ level, mario ]) => {
        setupInput(mario).listenTo(window)

        const timer = new Timer()
        level.entities.add(mario)

        timer.update = function update(deltaTime) {
            level.update(deltaTime)
            level.comp.draw(context)
            mario.vel.y += GRAVITY * deltaTime
        }

        timer.start()
    })