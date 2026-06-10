import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IsString, IsInt, Min, Max, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReviewFlashcardDto {
  @ApiProperty()
  @IsString()
  wordId: string;

  @ApiProperty()
  @IsString()
  lessonId: string;

  @ApiProperty({ minimum: 0, maximum: 5, description: 'SM-2 grade: 0=blackout, 5=perfect' })
  @IsInt()
  @Min(0)
  @Max(5)
  grade: number;
}

@Injectable()
export class FlashcardsService {
  constructor(private prisma: PrismaService) {}

  async review(userId: string, dto: ReviewFlashcardDto) {
    const existing = await this.prisma.flashcardReview.findUnique({
      where: { userId_wordId: { userId, wordId: dto.wordId } },
    });

    let interval = existing?.intervalDays ?? 1;
    let easeFactor = existing?.easeFactor ?? 2.5;
    let repetitions = existing?.repetitions ?? 0;

    // SM-2 Algorithm
    if (dto.grade >= 3) {
      if (repetitions === 0) interval = 1;
      else if (repetitions === 1) interval = 6;
      else interval = Math.round(interval * easeFactor);
      repetitions += 1;
    } else {
      repetitions = 0;
      interval = 1;
    }

    easeFactor = Math.max(
      1.3,
      easeFactor + 0.1 - (5 - dto.grade) * (0.08 + (5 - dto.grade) * 0.02),
    );

    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + interval);

    const review = await this.prisma.flashcardReview.upsert({
      where: { userId_wordId: { userId, wordId: dto.wordId } },
      create: {
        userId, wordId: dto.wordId, lessonId: dto.lessonId,
        nextReviewDate, intervalDays: interval, easeFactor, repetitions,
        lastGrade: dto.grade,
      },
      update: {
        nextReviewDate, intervalDays: interval, easeFactor, repetitions,
        lastGrade: dto.grade,
      },
    });

    return review;
  }

  async getDueCards(userId: string) {
    const now = new Date();
    const due = await this.prisma.flashcardReview.findMany({
      where: { userId, nextReviewDate: { lte: now } },
      select: { wordId: true, lessonId: true, lastGrade: true, repetitions: true },
    });
    return { due, count: due.length };
  }

  async getStats(userId: string) {
    const all = await this.prisma.flashcardReview.findMany({ where: { userId } });
    const now = new Date();
    const due = all.filter((r) => r.nextReviewDate <= now).length;
    return {
      total: all.length,
      due,
      mastered: all.filter((r) => r.repetitions >= 3).length,
    };
  }
}
