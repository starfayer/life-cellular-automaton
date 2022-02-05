import { Canvas } from "./canvas.js";

class Cell {
  constructor(x, y, isLive) {
    this.x = x;
    this.y = y;
    this.isLive = isLive;
    this.neighbourCount = 0;
  }
}

class Field {
  constructor(width, height, cellSize) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
  }
  
  initField(template) {
    this.field = [];
    let x = 0;
    for (let i = 0; i < Math.floor(this.width / this.cellSize); i++) {
      this.field[i] = [];
      let y = 0;
      for (let j = 0; j < Math.floor(this.height / this.cellSize); j++) {
        const cell = new Cell(x, y, true);
        if (template) {
          if (template.find(el =>
            el.x === cell.x && el.y == cell.y && el.isLive == cell.isLive
          ))
            this.field[i][j] = cell;
          else
            this.field[i][j] = new Cell(x, y, false);
        } else
          this.field[i][j] = new Cell(x, y, false);
        y += this.cellSize;
      }
      x += this.cellSize;
    }
    return this;
  }

  writeNeighbours() {
    for (let i = 0; i < this.field.length; i++) {
      for (let j = 0; j < this.field[i].length; j++) {
        this.field[i][j].neighbourCount = this.countNeighbours(i, j);
      }
    }
    return this;
  }

  countNeighbours(x, y) {
    const preX = x - 1, preY = y - 1;
    let count = 0;

    for (let ix = preX; ix <= x + 1; ix++) {
      const i = ix < 0 ? this.field.length - 1 : ix > this.field.length - 1 ? 0 : ix;
      for (let jy = preY; jy <= y + 1; jy++) {
        const j = jy < 0 ? this.field.length - 1 : jy > this.field.length - 1 ? 0 : jy;

        if (i === x && j === y) continue;

        if (this.field[i][j].isLive) {
          count++;
        }
      }
    }
    return count;
  }

  checkLive() {
    for (let row of this.field)
      for (let el of row)
        el.isLive = el.neighbourCount > 3 || el.neighbourCount < 2 ? false : true;
    
    return this.field;
  }
}

class Game {
  constructor(initialField) {
    this.initialField = initialField;
  }


  draw(fieldToDraw, canvasElement) {

  }
}

// let field = new Field(20, 20);
// const game = new Game(field);
// game.start(1000);

// const canvasElement = document.querySelector('canvas');

// const canvas = new Canvas(canvasElement);
// canvas.initGrid();

export {Cell, Field, Game}