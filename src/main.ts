import { Game } from './Game';
import Score from './Score';

const intervalMs = 1000 / 10;

export default function main(): void {
  const score = new Score();
  const game = new Game(score);

  // TODO should be possible to increase the game speed by changing the interval value
  setInterval(mainLoop, intervalMs);
  document.addEventListener('keydown', handleGlobalKeyPress);

  function mainLoop() {
    game.tick();
  }

  function handleGlobalKeyPress(evt: KeyboardEvent) {
    game.keyPressed(evt);
  }
}
