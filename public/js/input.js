import KeyboardState from './KeyboardState.js'

const SPACE = 32

// eslint-disable-next-line
export function setupInput(mario) {
    const keyboardState = new KeyboardState()

    keyboardState.addMapping(SPACE, state => {
        if (state)
            mario.jump.start()
        else
            mario.jump.abort()

    })

    return keyboardState
}