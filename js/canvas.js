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

    this.genCheck();
  }

  genCheck() {
    // TODO: check 1st generation type and init it before start
  }
}

export { Canvas }