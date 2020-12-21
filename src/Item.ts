export class Item {
  position: XYPosition = {
    x: 0,
    y: 0,
  };

  moveRandom = (gridSize: number): void => {
    this.position.x = Math.floor(Math.random() * gridSize);
    this.position.y = Math.floor(Math.random() * gridSize);
  };
}
