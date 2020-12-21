import { Direction, OffsetDirection } from './Direction';

export class Player {
  static INITIAL_TAIL_SIZE = 5;

  readonly position: XYPosition = {
    x: 10,
    y: 10,
  };

  private currentDirection: Direction | null = null;

  /**
   * Holds in which direction the player is facing
   */
  readonly offset: { x: OffsetDirection; y: OffsetDirection } = {
    x: OffsetDirection.Still,
    y: OffsetDirection.Still,
  };

  tailSize = Player.INITIAL_TAIL_SIZE;

  trail: XYPosition[] = [];

  moveDirection = (direction: Direction | null): void => {
    if (direction === null || direction === this.currentDirection) {
      return;
    }

    this.currentDirection = direction;

    // TODO check if it is possible to change to the desired direction
    switch (direction) {
      case Direction.Up:
        this.offset.x = OffsetDirection.Still;
        this.offset.y = OffsetDirection.Up;
        break;
      case Direction.Right:
        this.offset.x = OffsetDirection.Right;
        this.offset.y = OffsetDirection.Still;
        break;
      case Direction.Down:
        this.offset.x = OffsetDirection.Still;
        this.offset.y = OffsetDirection.Down;
        break;
      case Direction.Left:
        this.offset.x = OffsetDirection.Left;
        this.offset.y = OffsetDirection.Still;
        break;
      default:
        break;
    }
  };

  moveOffset = (gridSize: number): XYPosition => {
    const { position, offset } = this;

    if (offset.x || offset.y) {
      position.x += offset.x;
      position.y += offset.y;

      if (position.x < 0) {
        position.x = gridSize - 1;
      }

      if (position.x > gridSize - 1) {
        position.x = 0;
      }

      if (position.y < 0) {
        position.y = gridSize - 1;
      }

      if (position.y > gridSize - 1) {
        position.y = 0;
      }
    }

    // TODO maybe a good place for check for hits

    return position;
  };

  hitsItself = (step: XYPosition): boolean => {
    const { x, y } = this.position;
    return step.x === x && step.y === y;
  };
}
