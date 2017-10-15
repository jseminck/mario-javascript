import entityCollisionLayerCheckbox from "./options/EntityCollisionLayerCheckbox.js";
import { Matrix } from "./math.js"

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

export function createCollisionLayer(level) {
    if (!entityCollisionLayerCheckbox.getChecked()) {
        return () => {}; // Return a noop
    }

    const tileResolver = level.tileCollider.tiles;
    const tileSize = tileResolver.tileSize;

    const resolvedTiles = new Matrix()

    // Spy on getByIndex to store the tiles that are matched for collision
    const getByIndexOriginal = tileResolver.getByIndex;
    tileResolver.getByIndex = function getByIndexFake(x, y) {
        resolvedTiles.set(x, y, true);
        return getByIndexOriginal.call(tileResolver, x, y);
    }

    function drawTiles(context) {
        context.strokeStyle = 'blue'

        resolvedTiles.forEach((value, x, y) => {
            context.beginPath();
            context.rect(x * tileSize, y * tileSize, tileSize, tileSize)
            context.stroke()
        })
    }

    function drawCollisionBoxes(context) {
        context.strokeStyle = 'red'

        level.entities.forEach(entity => {
            context.beginPath();
            context.rect(entity.pos.x, entity.pos.y, entity.size.x, entity.size.y)
            context.stroke()
        })
    }

    return function drawCollisions(context) {
        drawTiles(context)
        drawCollisionBoxes(context)
        resolvedTiles.clear()
    }
}