export class Stage {
  readonly gridSize = 20;

  canvasSize = 0;

  rectangleSize = 0;

  private get ctx() {
    return this.canvasElement.getContext('2d') as CanvasRenderingContext2D;
  }

  constructor(public readonly canvasElement: HTMLCanvasElement) {
    this.calculateSizes();
    let timeoutId = 0;

    window.addEventListener('resize', () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(this.calculateSizes, 150);
    });
  }

  private calculateSizes = () => {
    const parent = this.canvasElement.parentElement as HTMLDivElement;
    const { clientHeight, clientWidth } = parent;
    let smallerSize = clientHeight < clientWidth ? clientHeight : clientWidth;

    if (smallerSize < 300) {
      smallerSize = 300;
    }

    this.rectangleSize = Math.floor(smallerSize / this.gridSize);

    this.canvasSize = this.rectangleSize * this.gridSize;
    this.canvasElement.width = this.canvasSize;
    this.canvasElement.height = this.canvasSize;
  };

  clear = (): void => {
    const { ctx, canvasSize } = this;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvasSize, canvasSize);
  };

  private drawRectangle = (x: number, y: number) => {
    const { ctx, rectangleSize } = this;
    ctx.fillRect(x * rectangleSize, y * rectangleSize, rectangleSize - 2, rectangleSize - 2);
  };

  drawStep = (x: number, y: number): void => {
    this.ctx.fillStyle = 'lime';
    this.drawRectangle(x, y);
  };

  drawItem = (x: number, y: number): void => {
    this.ctx.fillStyle = 'red';
    this.drawRectangle(x, y);
  };

  playerHitItem = (playerPos: XYPosition, itemPos: XYPosition): boolean => {
    return itemPos.x === playerPos.x && itemPos.y === playerPos.y;
  };
}
