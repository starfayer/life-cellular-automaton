class Cell {
  constructor(x, y, isLive) {
    this.x = x;
    this.y = y;
    this.isLive = isLive;
    this.neighbourCount = 0;
  }
}

class Field {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  
  initField(cb) {
    this.field = []
    for (let i = 0; i < this.width; i++) {
      this.field[i] = []
      for (let j = 0; j < this.height; j++) {
        const cell = new Cell(i, j, cb ? cb() : false);
        this.field[i].push(cell);
      }
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
      const i = ix < 0 ? this.field.length - 1 : ix > this.width - 1 ? 0 : ix;
      for (let jy = preY; jy <= y + 1; jy++) {
        const j = jy < 0 ? this.field.length - 1 : jy > this.height - 1 ? 0 : jy;

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

  start(updateTime) {
    this.initialField.initField(() => Math.random() > 0.5);
    let startField = this.initialField.writeNeighbours().checkLive();

      setInterval(() => {
        let fieldToFill = this.initialField.initField();

        for (let i = 0; i < fieldToFill.field.length; i++) {
          for (let j = 0; j < fieldToFill.field[i].length; j++) {
            fieldToFill.field[i][j].isLive = startField[i][j].isLive ? true : false;
          }
        }
        startField = fieldToFill.writeNeighbours().checkLive();
      }, updateTime)
  }
}

let field = new Field(20, 20);
const game = new Game(field);
game.start(1000);