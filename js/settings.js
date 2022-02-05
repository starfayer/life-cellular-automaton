class Settings {
  constructor(width, height, cellSize, generationType) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.generationType = generationType;
  }

  initSettings(canvasElement) {
    canvasElement.width = this.width.value;
    canvasElement.height = this.height.value;
  }

  events(canvasElement, canvasObject) {
    [this.width, this.height, this.cellSize].forEach(el => {
      el.addEventListener('input', event => {
        if (event.target.value >= 100 || event.target.id === 'size') {
          canvasElement.width = this.width.value;
          canvasElement.height = this.height.value;

          canvasObject.width = canvasElement.width;
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
    })

    this.generationType.addEventListener('change', event => {
      console.log(event.type)
      canvasObject.genCheck(event.target.value);
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