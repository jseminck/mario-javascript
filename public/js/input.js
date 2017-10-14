import KeyboardState from './KeyboardState.js'

const SPACE = 32
const RIGHT_ARROW = 39
const LEFT_ARROW = 37

// eslint-disable-next-line
export function setupInput(mario) {
    const keyboardState = new KeyboardState()

    keyboardState.addMapping(SPACE, state => {
        if (state)
            mario.jump.start()
        else
            mario.jump.abort()
    })

    keyboardState.addMapping(RIGHT_ARROW, state => {
        mario.go.dir = state;
    })


    keyboardState.addMapping(LEFT_ARROW, state => {
        mario.go.dir = -state;
    })

    return keyboardState
}