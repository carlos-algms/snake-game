/* eslint-disable no-shadow */
export enum Direction {
  Up,
  Right,
  Down,
  Left,
}

export enum OffsetDirection {
  Up = -1,
  Right = 1,
  Down = 1,
  Left = -1,
  Still = 0,
}

export function eventCodeToDirection(code: string): Direction | null {
  switch (code) {
    case 'ArrowLeft':
      return Direction.Left;
    case 'ArrowUp':
      return Direction.Up;
    case 'ArrowRight':
      return Direction.Right;
    case 'ArrowDown':
      return Direction.Down;
    default:
      return null;
  }
}
