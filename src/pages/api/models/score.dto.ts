import { IsString, IsInt } from 'class-validator';

export class ScoreDto {
  @IsString()
  name: string;

  @IsInt()
  score: number;
}
