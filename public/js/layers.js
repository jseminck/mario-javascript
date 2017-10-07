function drawBackground(background, context, sprites) {
    background.ranges.forEach(([ x1, x2, y1, y2 ]) => {
        for (let x = x1; x < x2; ++x)
            for (let y = y1; y < y2; ++y)
                sprites.drawTile(background.tile, context, x, y)
    })
}

export function createBackgroundLayer(level, sprites) {
    const backgroundBuffer = document.createElement('canvas')
    backgroundBuffer.width = 1024
    backgroundBuffer.height = 960

    const context = backgroundBuffer.getContext('2d');
    level.tiles.forEach((tile, x, y) => {
        sprites.drawTile(tile.name, context, x, y);
    })

    return function drawBackgroundLayer(context) {
        context.drawImage(backgroundBuffer, 0, 0)
    }
}

export function createSpriteLayer(entities) {
    return function drawSpriteLayer(context) {
        entities.forEach(entity => entity.draw(context))
    }
}