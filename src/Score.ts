/* eslint-disable class-methods-use-this */
import ScoreUi from './ScoreUi';

const BEST_SCORE_KEY = 'BEST_SCORE';

export default class Score {
  private currentScore = 0;

  private bestScore = 0;

  private readonly scoreUi: ScoreUi;

  constructor() {
    this.scoreUi = new ScoreUi();
    this.restoreBestScore();
    this.scoreUi.onBestScoreUpdate(this.bestScore);
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
      localStorage.setItem(BEST_SCORE_KEY, this.bestScore.toString());
    }
  }

  private restoreBestScore() {
    try {
      const storedBestScore = parseInt(localStorage.getItem(BEST_SCORE_KEY) ?? '0', 10);
      this.bestScore = storedBestScore;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}
