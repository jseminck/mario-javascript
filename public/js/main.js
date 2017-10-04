import { loadLevel } from './loaders.js'
import { loadBackgroundSprites, loadMarioSprite } from './sprites.js'

const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')

function drawBackground(background, context, sprites) {
    background.ranges.forEach(([ x1, x2, y1, y2 ]) => {
        for (let x = x1; x < x2; ++x)
            for (let y = y1; y < y2; ++y)
                sprites.drawTile(background.tile, context, x, y)


    })
}

Promise.all([
    loadBackgroundSprites(),
    loadLevel('1-1'),
    loadMarioSprite(),
])
    .then(([ sprites, levelSpec, mario ]) => {

        const backgroundBuffer = document.createElement('canvas')
        backgroundBuffer.width = 256
        backgroundBuffer.height = 240

        levelSpec.backgrounds.forEach(background =>
            drawBackground(background, backgroundBuffer.getContext('2d'), sprites)
        )

        const pos = {
            x: 64,
            y: 64,
        }

        function update() {
            context.drawImage(backgroundBuffer, 0, 0)
            mario.draw('idle', context, pos.x, pos.y)
            pos.x += 2
            pos.y += 1
            requestAnimationFrame(update)
        }

        update()
    })