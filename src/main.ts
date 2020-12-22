import { Game } from './Game';

const intervalMs = 1000 / 9;

export default function main(): void {
  const game = new Game();

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
