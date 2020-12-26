import { eventCodeToDirection } from './Direction';
import { Item } from './Item';
import { Player } from './Player';
import Score from './Score';
import { StageCanvas } from './Stage/StageCanvas';

export class Game {
  player: Player;

  stage: StageCanvas;

  item: Item;

  isMoving = false;

  constructor(private readonly score: Score) {
    this.stage = new StageCanvas();
    this.player = new Player();
    this.item = new Item();

    this.item.moveRandom(this.stage.gridSize);
    this.stage.drawItem(this.item.position);
    this.stage.drawStep(this.player.position);

    score.resetCurrentScore();
  }

  keyPressed(evt: KeyboardEvent): void {
    const direction = eventCodeToDirection(evt.key ?? evt.code);

    if (this.player.changeFacingDirection(direction, this.stage.gridSize)) {
      this.isMoving = true;
      this.checkForHits();
      this.draw();
    }
  }

  tick(): void {
    if (this.isMoving) {
      this.movePlayer();
      this.checkForHits();
      this.draw();
    }
  }

  private movePlayer() {
    const { stage, player } = this;
    player.moveOffset(stage.gridSize);
  }

  private checkForHits() {
    const { stage, player, item, score } = this;

    player.trail.forEach((step) => {
      if (this.checkHit(step, player.position)) {
        // TODO game over ?
        player.tailSize = Player.INITIAL_TAIL_SIZE;
        score.updateBestScore();
        score.resetCurrentScore();
      }
    });

    if (this.checkHit(player.position, item.position)) {
      player.tailSize++;
      item.moveRandom(stage.gridSize);
      score.incrementCurrentScore();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private checkHit(posA: XYPosition, posB: XYPosition): boolean {
    return posA.x === posB.x && posA.y === posB.y;
  }

  private draw() {
    const { stage, player, item } = this;
    stage.clear();
    player.trail.forEach((step) => stage.drawStep(step));
    stage.drawItem(item.position);
  }
}
