import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IsString, IsInt, Min, Max, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LessonCompleteDto {
  @ApiProperty()
  @IsString()
  levelId: string;

  @ApiProperty({ minimum: 0, maximum: 100 })
  @IsInt()
  @Min(0)
  @Max(100)
  score: number;

  @ApiProperty({ minimum: 0, maximum: 3 })
  @IsInt()
  @Min(0)
  @Max(3)
  stars: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  xpEarned: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  minutesStudied: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  wordsLearned: number;
}

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  async completeLeson(userId: string, lessonId: string, dto: LessonCompleteDto) {
    const existing = await this.prisma.lessonProgress.findUnique({
      where: { userId_lessonId: { userId, lessonId } },
    });

    const isFirstCompletion = !existing?.completed;

    const lessonProgress = await this.prisma.lessonProgress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      create: {
        userId, lessonId,
        levelId: dto.levelId,
        completed: dto.score >= 50,
        stars: dto.stars,
        score: dto.score,
        bestScore: dto.score,
        attempts: 1,
        completedAt: dto.score >= 50 ? new Date() : null,
      },
      update: {
        completed: dto.score >= 50,
        stars: Math.max(existing?.stars ?? 0, dto.stars),
        score: dto.score,
        bestScore: Math.max(existing?.bestScore ?? 0, dto.score),
        attempts: { increment: 1 },
        completedAt: dto.score >= 50 && !existing?.completed ? new Date() : existing?.completedAt,
      },
    });

    // Update main progress stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await this.prisma.userProgress.upsert({
      where: { userId },
      create: {
        userId,
        totalXP: dto.xpEarned,
        totalLessonsCompleted: isFirstCompletion && dto.score >= 50 ? 1 : 0,
        totalWordsLearned: dto.wordsLearned,
        totalMinutesStudied: dto.minutesStudied,
      },
      update: {
        totalXP: { increment: dto.xpEarned },
        totalLessonsCompleted: isFirstCompletion && dto.score >= 50 ? { increment: 1 } : undefined,
        totalWordsLearned: { increment: dto.wordsLearned },
        totalMinutesStudied: { increment: dto.minutesStudied },
      },
    });

    // Update daily activity
    await this.prisma.dailyActivity.upsert({
      where: { userId_date: { userId, date: today } },
      create: {
        userId, date: today,
        xpEarned: dto.xpEarned,
        lessonsCompleted: isFirstCompletion && dto.score >= 50 ? 1 : 0,
        wordsLearned: dto.wordsLearned,
        minutesStudied: dto.minutesStudied,
      },
      update: {
        xpEarned: { increment: dto.xpEarned },
        lessonsCompleted: isFirstCompletion && dto.score >= 50 ? { increment: 1 } : undefined,
        wordsLearned: { increment: dto.wordsLearned },
        minutesStudied: { increment: dto.minutesStudied },
      },
    });

    return lessonProgress;
  }

  async getLessonProgress(userId: string, lessonId?: string) {
    if (lessonId) {
      return this.prisma.lessonProgress.findUnique({
        where: { userId_lessonId: { userId, lessonId } },
      });
    }
    const all = await this.prisma.lessonProgress.findMany({ where: { userId } });
    return Object.fromEntries(all.map((lp) => [lp.lessonId, lp]));
  }
}
