import { loadImage, loadLevel } from "./loaders.js";
import SpriteSheet from "./SpriteSheet.js";

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

function drawBackground(background, context, sprites) {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
        for (let x = x1; x < x2; ++x) {
            for (let y = y1; y < y2; ++y) {
                sprites.drawTile(background.tile, context, x, y);
            }
        }
    })
}

Promise.all([
    loadImage('/sprites/tiles.png'),
    loadLevel("1-1"),
])
.then(([image, levelSpec]) => {
    const sprites = new SpriteSheet(image);

     sprites.define('ground', 0, 0);
     sprites.define('sky', 3, 23);

    levelSpec.backgrounds.forEach(background =>
        drawBackground(background, context, sprites)
    )
});