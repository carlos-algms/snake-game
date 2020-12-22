import { eventCodeToDirection } from './Direction';
import { Item } from './Item';
import { Player } from './Player';
import { StageCanvas } from './Stage/StageCanvas';

export class Game {
  player: Player;

  stage: StageCanvas;

  item: Item;

  constructor() {
    this.player = new Player();
    this.item = new Item();
    this.stage = new StageCanvas();

    this.item.moveRandom(this.stage.gridSize);
    this.stage.drawItem(this.item.position);
    this.stage.drawStep(this.player.position);
  }

  tick = (): void => {
    const { stage, player, item } = this;

    stage.clear();
    player.moveOffset(stage.gridSize);

    player.trail.forEach((step) => {
      stage.drawStep(step);

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

    stage.drawItem(item.position);
  };

  keyPressed = (evt: KeyboardEvent): void => {
    const direction = eventCodeToDirection(evt.key ?? evt.code);
    this.player.changeFacingDirection(direction);
  };
}
