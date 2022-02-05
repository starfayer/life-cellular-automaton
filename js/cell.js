export default class Cell {
  constructor(x, y, isLive) {
    this.x = x;
    this.y = y;
    this.isLive = isLive;
    this.neighbourCount = 0;
  }
}
