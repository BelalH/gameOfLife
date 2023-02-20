module.exports = function render(grid, width, height) {

  let str = drawField(grid, width, height, function (cell) {
    return cell ? " █ " : "   ";
  });
  return str;
}


function drawField(grid, width, height, render) {
  function verticalRowConnect(left, middle, right, fieldWidth = 3) {
    let parts = [];
    for (let i = 0; i < width; i++) {
      parts.push("─".repeat(fieldWidth));
    }
    return left + parts.join(middle) + right;
  }

  let fieldWidth = 3;

  let rows = [];
  for (let y = 0; y < height; y++) {
    let row = [];
    for (let x = 0; x < width; x++) {
      row.push(render(grid[y][x]));
    }
    row = "│" + row.join("│") + "│";
    rows.push(row);
  }
  rows = rows.join("\n" + verticalRowConnect("├", "┼", "┤", fieldWidth) + "\n");
  rows = ("\n" + verticalRowConnect("┌", "┬", "┐", fieldWidth) + "\n") + rows + ("\n" + verticalRowConnect("└", "┴", "┘", fieldWidth) + "\n");
  printString(rows)
}

String.prototype.repeat = function (count) {
  let str = "";
  for (let i = 0; i < count; i++) {
    str += this;
  }
  return str;
};


function printString(str) {
  process.stdout.write(str);
  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);
  process.stdout.write("\n");
}