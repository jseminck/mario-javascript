import entityCollisionLayerCheckbox from "./options/EntityCollisionLayerCheckbox.js";

export function createBackgroundLayer(level, sprites) {
    const { tiles } = level;
    const resolver = level.tileCollider.tiles;

    const backgroundBuffer = document.createElement('canvas')
    backgroundBuffer.width = 256 + 16
    backgroundBuffer.height = 960

    const backgroundContext = backgroundBuffer.getContext('2d');

    // Keep track of these two not redraw when the screen does not move.
    let startIndex, endIndex;
    function redraw(drawFrom, drawTo) {
        if (drawFrom === startIndex && drawTo === endIndex) {
            return;
        }

        startIndex = drawFrom;
        endIndex = drawTo;

        for(let x = startIndex; x <= endIndex; x++) {
            const col = tiles.grid[x];
            if (col) {
                col.forEach((tile, y) => { // eslint-disable-line
                    sprites.drawTile(tile.name, backgroundContext, x - startIndex, y);
                })
            }
        }
    }

    return function drawBackgroundLayer(context, camera) {
        const drawWidth = resolver.toIndex(camera.size.x);
        const drawFrom = resolver.toIndex(camera.pos.x);
        const drawTo = drawFrom + drawWidth

        redraw(drawFrom, drawTo);

        context.drawImage(
            backgroundBuffer,
            -camera.pos.x % 16,
            -camera.pos.y
        )
    }
}

export function createSpriteLayer(entities, width = 64, height = 64) {
    const spriteBuffer = document.createElement('canvas');
    spriteBuffer.width = width;
    spriteBuffer.height = height;

    const spriteBufferContext = spriteBuffer.getContext('2d');

    return function drawSpriteLayer(context, camera) {
        entities.forEach(entity => {
            spriteBufferContext.clearRect(0, 0, width, height);

            entity.draw(spriteBufferContext);

            context.drawImage(
                spriteBuffer,
                entity.pos.x - camera.pos.x,
                entity.pos.y - camera.pos.y
            )
        })
    }
}

export function createCameraLayer(cameraToDraw) {
    return function drawCameraRect(context, fromCamera) {
        context.strokeStyle = 'purple';

        context.beginPath();
        context.rect(
            cameraToDraw.pos.x - fromCamera.pos.x,
            cameraToDraw.pos.y - fromCamera.pos.y,
            cameraToDraw.size.x,
            cameraToDraw.size.y
        )
        context.stroke()
    }
}

export function createCollisionLayer(level) {
    if (!entityCollisionLayerCheckbox.getChecked()) {
        return () => {}; // Return a noop
    }

    const tileResolver = level.tileCollider.tiles;
    const tileSize = tileResolver.tileSize;

    const resolvedTiles = [];

    // Spy on getByIndex to store the tiles that are matched for collision
    const getByIndexOriginal = tileResolver.getByIndex;
    tileResolver.getByIndex = function getByIndexFake(x, y) {
        resolvedTiles.push({x, y});
        return getByIndexOriginal.call(tileResolver, x, y);
    }

    function drawTiles(context, camera) {
        context.strokeStyle = 'blue'

        resolvedTiles.forEach((value, x, y) => {
            context.beginPath();
            context.rect(
                x * tileSize - camera.pos.x,
                y * tileSize - camera.pos.y,
                tileSize,
                tileSize
            )
            context.stroke()
        })
    }

    function drawCollisionBoxes(context, camera) {
        context.strokeStyle = 'red'

        level.entities.forEach(entity => {
            context.beginPath();
            context.rect(
                entity.pos.x - camera.pos.x,
                entity.pos.y - camera.pos.y,
                entity.size.x,
                entity.size.y
            )
            context.stroke()
        })
    }

    return function drawCollisions(context, camera) {
        drawTiles(context, camera)
        drawCollisionBoxes(context, camera)
        resolvedTiles.clear()
    }
}