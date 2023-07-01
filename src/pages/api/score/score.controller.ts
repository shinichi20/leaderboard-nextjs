import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { ScoreService } from './score.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { AuthGuard } from './guards/auth.guard';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';

@Controller('scores')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Roles('admin', 'user')
  @UseGuards(RolesGuard)
  async createScore(@Body() createScoreDto: CreateScoreDto) {
    return this.scoreService.createScore(createScoreDto);
  }

  @Get('/leaderboard')
  async getLeaderboard() {
    return this.scoreService.getLeaderboard();
  }
}
