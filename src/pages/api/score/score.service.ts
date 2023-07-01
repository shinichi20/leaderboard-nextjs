import { Injectable } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';

@Injectable()
export class ScoreService {
  private leaderboard: { name: string; score: number }[] = [];

  createScore(createScoreDto: CreateScoreDto) {
    const { name, score } = createScoreDto;
    this.leaderboard.push({ name, score });
    this.leaderboard.sort((a, b) => b.score - a.score);
  }

  getLeaderboard() {
    return this.leaderboard.slice(0, 10);
  }
}
