import { Direction, OffsetDirection } from './Direction';

export class Player {
  static readonly INITIAL_TAIL_SIZE = 5;

  readonly position: XYPosition = {
    x: 10,
    y: 10,
  };

  private facingDirection: Direction | null = null;

  private justMovedDirection = false;

  /**
   * Holds in which direction the player is facing
   */
  readonly offset: { x: OffsetDirection; y: OffsetDirection } = {
    x: OffsetDirection.Still,
    y: OffsetDirection.Still,
  };

  tailSize = Player.INITIAL_TAIL_SIZE;

  trail: XYPosition[] = [];

  changeFacingDirection = (direction: Direction | null, gridSize: number): boolean => {
    if (direction === null || direction === this.facingDirection) {
      return false;
    }

    if (!this.isDirectionChangePossible(direction)) {
      return false;
    }

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

    this.facingDirection = direction;
    this.justMovedDirection = true;
    this.move(gridSize);

    return true;
  };

  private isDirectionChangePossible = (direction: Direction) => {
    const { facingDirection } = this;

    if (facingDirection === null) {
      return true;
    }

    if (direction === Direction.Up || direction === Direction.Down) {
      return facingDirection === Direction.Left || facingDirection === Direction.Right;
    }

    return facingDirection === Direction.Up || facingDirection === Direction.Down;
  };

  moveOffset = (gridSize: number): XYPosition => {
    if (this.justMovedDirection) {
      this.justMovedDirection = false;
      return this.position;
    }

    return this.move(gridSize);
  };

  private move(gridSize: number) {
    const { position, offset } = this;

    this.maintainTrail();

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
  }

  private maintainTrail(): void {
    const { trail, tailSize, position } = this;

    trail.push({ ...position });

    while (trail.length > tailSize) {
      trail.shift();
    }
  }
}
