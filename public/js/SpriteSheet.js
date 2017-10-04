export default class SpriteSheet {
    constructor(image) {
        this.image = image;
        this.width = 16;
        this.height = 16;

        this.tiles = new Map();
    }

    define(name, x, y) {
        const buffer = document.createElement('canvas');
        buffer.height = this.height;
        buffer.width = this.width;

        buffer
            .getContext('2d')
            .drawImage(
                this.image,
                this.width * x,
                this.height * y,
                this.width,
                this.height,
                0,
                0,
                this.width,
                this.height,
            )

        this.tiles.set(name, buffer);
    }

    draw(name, context, x, y) {
        context.drawImage(this.tiles.get(name), x, y);
    }
}