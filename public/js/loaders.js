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
        background.ranges.forEach(([x1, x2, y1, y2]) => {
            for (let x = x1; x < x2; x++) {
                for (let y = y1; y < y2; y++) {
                    level.tiles.set(x, y, {
                        name: background.tile
                    })
                }
            }
        })
    })
}