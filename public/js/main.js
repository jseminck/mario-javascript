import Timer from './Timer.js'
import { createMario } from './entities.js'
import { loadLevel } from './loaders.js'
import { setupInput } from './input.js'
import { setupMouseHandler } from "./debug.js"
import { createCollisionLayer } from "./layers.js"
import Options from "./options/index.js"

const options = new Options(run);

const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')


function run() {

    Promise.all([
        loadLevel('1-1'),
        createMario(),
    ])
        .then(([ level, mario ]) => {
            setupInput(mario).listenTo(window)

            const timer = new Timer()
            level.entities.add(mario)

            // Debug
            setupMouseHandler(canvas, mario);
            level.comp.layers.push(createCollisionLayer(level))

            timer.update = function update(deltaTime) {
                level.update(deltaTime)
                level.comp.draw(context)
            }

            timer.start()
        })
}

run();