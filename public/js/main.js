import { createBackgroundLayer, createSpriteLayer } from './layers.js'
import Compositor from './Compositor.js'
import { createMario } from './entities.js'
import { loadBackgroundSprites } from './sprites.js'
import { loadLevel } from './loaders.js'

const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')

Promise.all([
    loadBackgroundSprites(),
    loadLevel('1-1'),
    createMario(),
])
    .then(([ backgroundSprites, levelSpec, mario ]) => {
        const entities = [ mario ]

        const comp = new Compositor()
        comp.addLayer(createBackgroundLayer(levelSpec.backgrounds, backgroundSprites))
        comp.addLayer(createSpriteLayer(entities))

        function update() {
            entities.forEach(entity => {
                entity.update()
                entity.vel.y += 0.5
            })

            comp.draw(context)

            requestAnimationFrame(update)
        }

        update()
    })