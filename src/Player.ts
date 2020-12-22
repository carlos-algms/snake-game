import { Direction, OffsetDirection } from './Direction';

export class Player {
  static readonly INITIAL_TAIL_SIZE = 5;

  readonly position: XYPosition = {
    x: 10,
    y: 10,
  };

  private facingDirection: Direction | null = null;

  /**
   * Holds in which direction the player is facing
   */
  readonly offset: { x: OffsetDirection; y: OffsetDirection } = {
    x: OffsetDirection.Still,
    y: OffsetDirection.Still,
  };

  tailSize = Player.INITIAL_TAIL_SIZE;

  trail: XYPosition[] = [];

  changeFacingDirection = (direction: Direction | null): void => {
    if (direction === null || direction === this.facingDirection) {
      return;
    }

    if (!this.isDirectionChangePossible(direction)) {
      return;
    }

    this.facingDirection = direction;

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

  private isDirectionChangePossible = (direction: Direction) => {
    const { facingDirection: currentDirection } = this;

    if (currentDirection === null) {
      return true;
    }

    if (direction === Direction.Up || direction === Direction.Down) {
      return currentDirection === Direction.Left || currentDirection === Direction.Right;
    }

    return currentDirection === Direction.Up || currentDirection === Direction.Down;
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
}
