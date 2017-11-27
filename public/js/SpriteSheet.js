export default class SpriteSheet {
    constructor(image, width, height) {
        this.image = image
        this.width = width
        this.height = height

        this.tiles = new Map()
    }

    define(name, x, y, width, height) {
        const buffers = [false, true].map(flipped => {
            const buffer = document.createElement('canvas')
            buffer.height = height
            buffer.width = width

            const context = buffer.getContext('2d')

            if (flipped) {
                context.scale(-1, 1);
                context.translate(-width, 0);
            }

            context.drawImage(
                this.image,
                x,
                y,
                width,
                height,
                0,
                0,
                width,
                height,
            )

            return buffer;
        })

        this.tiles.set(name, buffers)
    }

    defineTile(name, x, y) {
        this.define(
            name,
            x * this.width,
            y * this.height,
            this.width,
            this.height,
        )
    }

    draw(name, context, x, y, flipped = false) {
        const index = flipped ? 1 : 0
        const buffer = this.tiles.get(name)[index];
        context.drawImage(buffer, x, y)
    }

    drawTile(name, context, x, y) {
        this.draw(name, context, x * this.width, y * this.height)
    }
}