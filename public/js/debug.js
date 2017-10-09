// eslint-disable-next-line
export function setupMouseHandler(canvas, entity) {
    ['mousedown', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
            if (event.buttons === 1) {
                entity.vel.set(0, 0);
                entity.pos.set(event.offsetX, event.offsetY);
            }
        });
    });
}