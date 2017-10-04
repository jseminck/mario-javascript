import { loadImage } from "./loaders.js";
import SpriteSheet from "./SpriteSheet.js";

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

loadImage('/sprites/tiles.png').then(image => {
    const sprites = new SpriteSheet(image);
    sprites.define('ground', 0, 0);
    sprites.draw('ground', context, 64, 32)
});