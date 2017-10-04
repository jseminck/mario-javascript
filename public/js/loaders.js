export function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.src = url;

        image.addEventListener('load', () => resolve(image));
    })
}

export function loadLevel(name) {
    return fetch(`/levels/${name}.json`).then(level => level.json());
}