const config = require('config')
const rows = config.get('rows')
const cols = config.get('cols')

let grid = new Array(rows)
let nextGrid = new Array(rows)

module.exports.initializeGrids = () => {
    for (let i = 0; i < rows; i++) {
        grid[i] = new Array(cols).fill(0)
        nextGrid[i] = new Array(cols).fill(0)
    }
    generateGlider()
    return { grid, nextGrid }
}

function generateGlider() {
    grid[4][3] = 1
    grid[5][4] = 1
    grid[6][2] = 1
    grid[6][3] = 1
    grid[6][4] = 1
}