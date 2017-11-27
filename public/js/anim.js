export function createAnim(frames, frameDuration) {
    return function resolveFrame(distance) {
        return frames[Math.floor(distance / frameDuration % frames.length)];
    }
}