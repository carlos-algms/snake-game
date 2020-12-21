export class Stage {
  readonly gridSize = 20;

  readonly ctx: CanvasRenderingContext2D;

  readonly width: number;

  readonly height: number;

  constructor(public readonly canvasElement: HTMLCanvasElement) {
    this.ctx = canvasElement.getContext('2d') as CanvasRenderingContext2D;
    this.width = canvasElement.width;
    this.height = canvasElement.height;
  }

  clear = (): void => {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.width, this.height);
  };

  private drawRectangle = (x: number, y: number) => {
    const { ctx, gridSize } = this;
    ctx.fillRect(x * gridSize, y * gridSize, gridSize - 2, gridSize - 2);
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
