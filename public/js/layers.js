function drawBackground(background, context, sprites) {
    background.ranges.forEach(([ x1, x2, y1, y2 ]) => {
        for (let x = x1; x < x2; ++x)
            for (let y = y1; y < y2; ++y)
                sprites.drawTile(background.tile, context, x, y)


    })
}

export function createBackgroundLayer(backgrounds, sprites) {
    const backgroundBuffer = document.createElement('canvas')
    backgroundBuffer.width = 256
    backgroundBuffer.height = 240

    backgrounds.forEach(background =>
        drawBackground(background, backgroundBuffer.getContext('2d'), sprites)
    )

    return function drawBackgroundLayer(context) {
        context.drawImage(backgroundBuffer, 0, 0)
    }
}

export function createSpriteLayer(sprite, pos) {
    return function drawSpriteLayer(context) {
        sprite.draw('idle', context, pos.x, pos.y)
    }
}