export default class Timer {
    constructor(deltaTime = 1 / 60) {
        this.accumulatedTime = 0
        this.lastTime = 0
        this.deltaTime = deltaTime
    }

    start() {
        this._enqueue()
    }

    _enqueue() {
        requestAnimationFrame(this._updateProxy.bind(this))
    }

    _updateProxy(time) {
        this.accumulatedTime += (time - this.lastTime) / 1000

        while (this.accumulatedTime > this.deltaTime) {
            this.update(this.deltaTime)
            this.accumulatedTime -= this.deltaTime
        }

        this.lastTime = time

        this._enqueue()
    }
}