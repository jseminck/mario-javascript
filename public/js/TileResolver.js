export default class TileResolver {
    constructor(matrix, tileSize = 16) {
        this.tileSize = tileSize
        this.matrix = matrix
    }

    toIndex(pos) {
        return Math.floor(pos / this.tileSize)
    }

    toIndexRange(start, end) {
        const pMax = Math.ceil(end / this.tileSize) * this.tileSize
        const range = []

        let pos = start
        do {
            range.push(this.toIndex(pos))
            pos += this.tileSize
        } while(pos < pMax)

        return range
    }

    getByIndex(x, y) {
        const tile = this.matrix.get(x, y)
        const x1 = x * this.tileSize;
        const x2 = x1 + this.tileSize
        const y1 = y * this.tileSize;
        const y2 = y1 + this.tileSize;
        if (tile) {
            return {tile, x1, x2, y1, y2}
        }
    }

    searchByPosition(x, y) {
        return this.getByIndex(this.toIndex(x), this.toIndex(y));
    }

    searchByRange(x1, x2, y1, y2) {
        const matches = []

        this.toIndexRange(x1, x2).forEach(x => {
            this.toIndexRange(y1, y2).forEach(y => {
                const match = this.getByIndex(x, y)
                if (match) matches.push(match)
            })
        })

        return matches
    }
}