
const config = require('config');
let initialize = require('./src/initialize')
let game = require('./src/game')
let render = require('./src/render/render-text')


const rows = config.get('rows')
const cols = config.get('cols')
let { grid, nextGrid } = initialize.initializeGrids()

// initial render
render(grid, rows, cols)

// create next gen every 0.7 sec
setInterval(play, 700)

function play() {
    nextGrid = game.computeNextGen(grid, nextGrid)
    render(nextGrid, rows, cols);
    // clear nextGrid to grid and clear it
    ({ grid, nextGrid } = game.copyAndResetGrid(grid, nextGrid))
}
