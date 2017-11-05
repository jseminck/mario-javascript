import Level from "./Level.js"
import { loadBackgroundSprites } from './sprites.js';
import { createBackgroundLayer, createSpriteLayer } from './layers.js';

export function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image()
        image.src = url

        image.addEventListener('load', () => resolve(image))
    })
}

export function loadLevel(name) {
    return Promise.all([
        fetch(`/levels/${ name }.json`).then(level => level.json()),
        loadBackgroundSprites(),
    ])
        .then(([levelSpec, backgroundSprites]) => {
            const level = new Level()

            createTiles(level, levelSpec.backgrounds);
            level.comp.addLayer(createBackgroundLayer(level, backgroundSprites))
            level.comp.addLayer(createSpriteLayer(level.entities))

            return level;
        })
}

function createTiles(level, backgrounds) {
    backgrounds.forEach(background => {
        background.ranges.forEach(([xStart, xLen, yStart, yLen]) => {
            const xEnd = xStart + xLen;
            const yEnd = yStart + yLen;

            for (let x = xStart; x < xEnd; x++) {
                for (let y = yStart; y < yEnd; y++) {
                    level.tiles.set(x, y, {
                        name: background.tile
                    })
                }
            }
        })
    })
}