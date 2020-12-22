import { eventCodeToDirection } from './Direction';
import { Item } from './Item';
import { Player } from './Player';
import { Stage } from './Stage';

const intervalMs = 1000 / 9;

export default function main(): void {
  const canvasEl = document.getElementById('app-canvas') as HTMLCanvasElement;
  const stage = new Stage(canvasEl);
  const player = new Player();
  const item = new Item();

  item.moveRandom(stage.gridSize);

  // TODO should be possible to increase the game speed by changing the interval value
  setInterval(mainLoop, intervalMs);
  document.addEventListener('keydown', keyPressed);

  function mainLoop() {
    stage.clear();
    player.moveOffset(stage.gridSize);

    player.trail.forEach((step) => {
      stage.drawStep(step.x, step.y);

      if (player.hitsItself(step)) {
        // TODO game over ?
        player.tailSize = Player.INITIAL_TAIL_SIZE;
      }
    });

    player.trail.push({ x: player.position.x, y: player.position.y });

    while (player.trail.length > player.tailSize) {
      player.trail.shift();
    }

    if (stage.playerHitItem(player.position, item.position)) {
      player.tailSize++;
      item.moveRandom(stage.gridSize);
    }

    stage.drawItem(item.position.x, item.position.y);
  }

  function keyPressed(evt: KeyboardEvent) {
    const direction = eventCodeToDirection(evt.key ?? evt.code);
    player.changeFacingDirection(direction);
  }
}