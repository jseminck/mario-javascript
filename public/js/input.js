import KeyboardState from './KeyboardState.js'

// eslint-disable-next-line
export function setupInput(mario) {
    const keyboardState = new KeyboardState()

    keyboardState.addMapping('Space', state => {
        if (state)
            mario.jump.start()
        else
            mario.jump.abort()
    })

    keyboardState.addMapping('ArrowRight', state => {
        mario.go.dir = state;
    })


    keyboardState.addMapping('ArrowLeft', state => {
        mario.go.dir = -state;
    })

    return keyboardState
}