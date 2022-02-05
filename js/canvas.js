import { Field, Cell } from "./counter.js";

class Canvas {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  initGrid(cellSize) {
    this.cellSize = cellSize;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.ctx.beginPath();
    for (let i = this.cellSize; i < this.width; i += this.cellSize) {
      this.ctx.moveTo(i, 0);
      this.ctx.lineTo(i, this.height);
    }
    for (let j = this.cellSize; j < this.height; j += this.cellSize) {
      this.ctx.moveTo(0, j);
      this.ctx.lineTo(this.width, j);
    }
    this.ctx.stroke();
  }

  genCheck(generationType) {
    this.initGrid(this.cellSize);
    this.cellTemplate = [];
    switch (generationType) {
      case 'input': {
        const canvasPosition = this.canvas.getBoundingClientRect();
        this.canvas.addEventListener('click', event => {
          const x = Math.floor(Math.round(event.clientX - canvasPosition.left) / this.cellSize) * this.cellSize;
          const y = Math.floor(Math.round(event.clientY - canvasPosition.top) / this.cellSize) * this.cellSize;

          this.drawCell(x, y);
          this.cellTemplate.push(new Cell(x, y, true));
        })
        break;
      };
      case 'random': {
        for (let i = 0; i < this.width; i += this.cellSize) {
          for (let j = 0; j < this.height; j += this.cellSize) {
            const isLive = Math.random() > 0.5;
            if (isLive) {
              this.drawCell(i, j);
              this.cellTemplate.push(new Cell(i, j, true));    
            }
          }
        }
        break;
      }
    }
  }

  connectButtons(clear, start, stop) {
    clear.addEventListener('click', () => this.initGrid(this.cellSize));
    start.addEventListener('click', this.startGame.bind(this));
    stop.addEventListener('click', this.stopGame.bind(this));
  }

  drawCell(x, y) {
    const countX = Math.floor(x / this.cellSize);
    const countY = Math.floor(y / this.cellSize);

    this.ctx.beginPath();
    this.ctx.fillRect(countX*this.cellSize, countY*this.cellSize, this.cellSize, this.cellSize);
  }

  clearCell(x, y) {
    const countX = Math.floor(x / this.cellSize);
    const countY = Math.floor(y / this.cellSize);

    this.ctx.beginPath();
    this.ctx.clearRect(countX*this.cellSize, countY*this.cellSize, this.cellSize-1, this.cellSize-1);
  }

  drawField(field) {
    for (let i = 0; i < field.length; i++) {
      for (let j = 0; j < field[i].length; j++) {
        if (field[i][j].isLive) {
          this.drawCell(field[i][j].x, field[i][j].y);
        }
        else {
          this.clearCell(field[i][j].x, field[i][j].y)
        }
      }
    }

  }
  start(template, updateTime) {
    this.initialField.initField(template);
    let startField = this.initialField.writeNeighbours().field;

    let timer = setInterval(() => {
      let fieldToFill = this.initialField.initField();
      console.log(startField)
      for (let i = 0; i < fieldToFill.field.length; i++) {
        for (let j = 0; j < fieldToFill.field[i].length; j++) {
          fieldToFill.field[i][j].isLive = startField[i][j].isLive ? true : false;
        }
      }
      startField = fieldToFill.writeNeighbours().checkLive();
      this.drawField(startField);
    }, updateTime)

    return timer;
  }

  startGame() {
    this.initialField = new Field(this.width, this.height, this.cellSize);
    this.timer = this.start(this.cellTemplate, 1000);
  }

  stopGame() {
    clearInterval(this.timer);
  }
}

export { Canvas }