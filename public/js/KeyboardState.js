const PRESSED = 1
const RELEASED = 0

export default class KeyboardState {
    constructor() {
        // Contains the current state of the key: PRESSED or RELEASED
        this.keyStates = new Map()
        // Contains the corresponding callback to be executed for the key
        this.keyMap = new Map()
    }

    addMapping(code, callback) {
        this.keyMap.set(code, callback)
    }

    handleEvent(event) {
        const { keyCode } = event

        if (!this.keyMap.has(keyCode)) return false

        event.preventDefault()
        const keyState = event.type === 'keydown' ? PRESSED : RELEASED

        if (this.keyStates.get(keyCode) !== keyState) {
            if (this.keyMap.has(keyCode))
                this.keyMap.get(keyCode)(keyState, event)


            this.keyStates.set(keyCode, keyState)
        }

        return true
    }

    listenTo(target) {
        target.addEventListener('keydown', this.handleEvent.bind(this))
        target.addEventListener('keyup', this.handleEvent.bind(this))
    }
}