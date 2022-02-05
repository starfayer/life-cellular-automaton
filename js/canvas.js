import { Field, Cell } from "./counter.js";

class Canvas {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.cellTemplate = new Set();
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
    this.initGrid(this.cellSize)
    switch (generationType) {
      case 'input': {
        const canvasPosition = this.canvas.getBoundingClientRect();
        this.canvas.addEventListener('click', event => {
          const x = event.clientX - canvasPosition.left;
          const y = event.clientY - canvasPosition.top;

          this.drawCell(x, y);
          this.cellTemplate.add(new Cell(x, y, true));
        })
        break;
      };
      case 'random': {
        for (let i = 0; i < this.width; i += this.cellSize) {
          for (let j = 0; j < this.height; j += this.cellSize) {
            const isLive = Math.random() > 0.5;
            if (isLive) {
              this.drawCell(i, j);
              this.cellTemplate.add(new Cell(i, j, true));    
            }
          }
        }
        break;
      }
    }
  }

  connectButtons(clear, start) {
    clear.addEventListener('click', () => this.initGrid(this.cellSize));
  }

  drawCell(x, y) {
    const countX = Math.floor(x / this.cellSize);
    const countY = Math.floor(y / this.cellSize);

    this.ctx.beginPath();
    this.ctx.fillRect(countX*this.cellSize, countY*this.cellSize, this.cellSize, this.cellSize);
  }

  clearCanvas() {
    for (let i = 0; i < this.width; i += this.cellSize) {
      for (let j = 0; j < this.height; j += this.cellSize) {
        this.ctx.clearRect(i, j, this.width, this.height);      
      }  
    }
  }
}

export { Canvas }