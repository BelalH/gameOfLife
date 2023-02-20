const config = require('config')
const rows = config.get('rows');
const cols = config.get('cols');

function applyRules(row, col, grid) {
    let numNeighbors = countNeighbors(row, col, grid);
    let newValue = 0
    if (grid[row][col] == 1) {
        if (numNeighbors < 2) {
            newValue = 0;
        } else if (numNeighbors == 2 || numNeighbors == 3) {
            newValue = 1;
        } else if (numNeighbors > 3) {
            newValue = 0;
        }
    } else if (grid[row][col] == 0) {
        if (numNeighbors == 3) {
            newValue = 1;
        }
    }
    return newValue
}

function countNeighbors(row, col, grid) {
    let count = 0;
    if (row - 1 >= 0) {
        if (grid[row - 1][col] == 1) count++;
    }
    if (row - 1 >= 0 && col - 1 >= 0) {
        if (grid[row - 1][col - 1] == 1) count++;
    }
    if (row - 1 >= 0 && col + 1 < cols) {
        if (grid[row - 1][col + 1] == 1) count++;
    }
    if (col - 1 >= 0) {
        if (grid[row][col - 1] == 1) count++;
    }
    if (col + 1 < cols) {
        if (grid[row][col + 1] == 1) count++;
    }
    if (row + 1 < rows) {
        if (grid[row + 1][col] == 1) count++;
    }
    if (row + 1 < rows && col - 1 >= 0) {
        if (grid[row + 1][col - 1] == 1) count++;
    }
    if (row + 1 < rows && col + 1 < cols) {
        if (grid[row + 1][col + 1] == 1) count++;
    }
    return count;
}

module.exports.computeNextGen = (grid, nextGrid) => {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            nextGrid[i][j] = applyRules(i, j, grid)
        }
    }
    return nextGrid
}

module.exports.copyAndResetGrid = (grid, nextGrid) => {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = nextGrid[i][j]
            nextGrid[i][j] = 0
        }
    }
    return { grid, nextGrid }
}