import ScoreUi from './ScoreUi';

export default class Score {
  private currentScore = 0;

  private bestScore = 0;

  private readonly scoreUi: ScoreUi;

  constructor() {
    this.scoreUi = new ScoreUi();
  }

  getCurrentScore(): number {
    return this.currentScore;
  }

  getBestScore(): number {
    return this.bestScore;
  }

  incrementCurrentScore(): void {
    this.currentScore += 1;
    this.scoreUi.onScoreUpdate(this.currentScore);
  }

  resetCurrentScore(): void {
    this.currentScore = 0;
    this.scoreUi.onScoreUpdate(this.currentScore);
  }

  updateBestScore(): void {
    if (this.currentScore > this.bestScore) {
      this.bestScore = this.currentScore;
      this.scoreUi.onBestScoreUpdate(this.bestScore);
    }
  }
}
