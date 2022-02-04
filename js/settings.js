class Settings {
  constructor(width, height, cellSize) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
  }

  initSettings(canvasElement) {
    canvasElement.width = this.width.value;
    canvasElement.height = this.height.value;
  }

  events(canvasElement, canvasObject) {
    this.width.addEventListener('input', () => {
      if ((this.width.value) >= 100) {
        canvasElement.width = this.width.value;
        canvasObject.width = canvasElement.width;
        try {
          if (!this.checkSizeOfCell()) {
            throw new Error('Size of cells on field is undefined');
          }
          this.printError();
          } catch (err) {
            this.printError(err);
          }

        canvasObject.initGrid(parseInt(this.cellSize.value));
      }
    })

    this.height.addEventListener('input', () => {
      if ((this.height.value) >= 100) {
        canvasElement.height = this.height.value;
        canvasObject.height = canvasElement.height;
        try {
          if (!this.checkSizeOfCell()) {
            throw new Error('Size of cells on field is undefined');
          }
          this.printError();
          } catch (err) {
            this.printError(err);
          }

        canvasObject.initGrid(parseInt(this.cellSize.value));
      }
    })

    this.cellSize.addEventListener('input', () => {
      try {
        if (!this.checkSizeOfCell()) {
          throw new Error('Size of cells on field is undefined');
        }
        this.printError();
        } catch (err) {
          this.printError(err);
        }
        
      canvasObject.initGrid(parseInt(this.cellSize.value));
    })
  }

  printError(err) {
    const block = document.querySelector('.settings__error');
    block.textContent = err;
  }

  checkSizeOfCell() {
    if (!this.cellSize.value) {
      return false;
    }
    return true;
  }
}

export { Settings }