import { eventCodeToDirection } from './Direction';
import { Item } from './Item';
import { Player } from './Player';
import { Stage } from './Stage';

const intervalMs = 1000 / 9;

export default function game(): void {
  const canvasEl = document.getElementById('gc') as HTMLCanvasElement;

  document.addEventListener('keydown', keyPressed);

  // TODO should be possible to increase the game speed by changing the interval value
  setInterval(gameLoop, intervalMs);

  const stage = new Stage(canvasEl);
  const player = new Player();
  const item = new Item();
  item.moveRandom(stage.gridSize);

  function gameLoop() {
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
    player.moveDirection(direction);
  }
}
