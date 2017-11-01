// eslint-disable-next-line
export function setupDebugMouseHandler(canvas, camera, entity) {
    ['mousedown', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
            if (event.buttons === 1) {
                entity.vel.set(0, 0);
                entity.pos.set(
                    event.offsetX + camera.pos.x,
                    event.offsetY + camera.pos.y
                );
            }
        });
    });
}