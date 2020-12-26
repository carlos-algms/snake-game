export default class ScoreUi {
  scoreEl: HTMLDivElement;

  bestScoreEl: HTMLDivElement;

  constructor() {
    this.scoreEl = document.getElementById('score') as HTMLDivElement;
    this.bestScoreEl = document.getElementById('bestScore') as HTMLDivElement;
  }

  onScoreUpdate(score: number): void {
    this.scoreEl.textContent = score.toString();
  }

  onBestScoreUpdate(score: number): void {
    this.bestScoreEl.textContent = score.toString();
  }
}
