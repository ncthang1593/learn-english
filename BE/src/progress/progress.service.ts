import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProgressService {
  constructor(private prisma: PrismaService) {}

  async getFullProgress(userId: string) {
    const [progress, lessonProgress, dailyActivity, achievements, grammarRead, flashcards] =
      await Promise.all([
        this.prisma.userProgress.findUnique({ where: { userId } }),
        this.prisma.lessonProgress.findMany({ where: { userId } }),
        this.prisma.dailyActivity.findMany({
          where: { userId },
          orderBy: { date: 'desc' },
          take: 90,
        }),
        this.prisma.achievementUnlock.findMany({ where: { userId } }),
        this.prisma.grammarRead.findMany({ where: { userId } }),
        this.prisma.flashcardReview.findMany({ where: { userId } }),
      ]);

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { dailyGoalMinutes: true },
    });

    return {
      userId,
      totalXP: progress?.totalXP ?? 0,
      level: progress?.level ?? 1,
      streak: progress?.streak ?? 0,
      longestStreak: progress?.longestStreak ?? 0,
      lastStudiedDate: progress?.lastStudiedDate ?? null,
      totalLessonsCompleted: progress?.totalLessonsCompleted ?? 0,
      totalWordsLearned: progress?.totalWordsLearned ?? 0,
      totalMinutesStudied: progress?.totalMinutesStudied ?? 0,
      dailyGoalMinutes: user?.dailyGoalMinutes ?? 10,
      lessonProgress: Object.fromEntries(
        lessonProgress.map((lp) => [lp.lessonId, lp]),
      ),
      dailyActivity: dailyActivity.map((d) => ({
        date: d.date.toISOString().slice(0, 10),
        minutesStudied: d.minutesStudied,
        xpEarned: d.xpEarned,
        lessonsCompleted: d.lessonsCompleted,
        wordsLearned: d.wordsLearned,
      })),
      achievementsUnlocked: achievements.map((a) => a.achievementId),
      grammarRead: grammarRead.map((g) => g.topicId),
      flashcardReviews: Object.fromEntries(
        flashcards.map((f) => [
          f.wordId,
          {
            wordId: f.wordId,
            lessonId: f.lessonId,
            nextReviewDate: f.nextReviewDate.toISOString(),
            interval: f.intervalDays,
            easeFactor: f.easeFactor,
            repetitions: f.repetitions,
            lastGrade: f.lastGrade,
          },
        ]),
      ),
    };
  }

  async getDashboard(userId: string) {
    const progress = await this.prisma.userProgress.findUnique({ where: { userId } });
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayActivity = await this.prisma.dailyActivity.findFirst({
      where: { userId, date: { gte: today } },
    });
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { displayName: true, avatarUrl: true, dailyGoalMinutes: true },
    });

    return {
      user,
      totalXP: progress?.totalXP ?? 0,
      level: progress?.level ?? 1,
      streak: progress?.streak ?? 0,
      totalLessonsCompleted: progress?.totalLessonsCompleted ?? 0,
      totalWordsLearned: progress?.totalWordsLearned ?? 0,
      todayMinutes: todayActivity?.minutesStudied ?? 0,
      todayXP: todayActivity?.xpEarned ?? 0,
      dailyGoalMinutes: user?.dailyGoalMinutes ?? 10,
    };
  }

  async bulkSync(userId: string, localData: any) {
    // Sync all local data to server
    const {
      totalXP, level, streak, longestStreak, lastStudiedDate,
      totalLessonsCompleted, totalWordsLearned, totalMinutesStudied,
      lessonProgress, dailyActivity, achievementsUnlocked, grammarRead,
    } = localData;

    // Upsert main progress
    await this.prisma.userProgress.upsert({
      where: { userId },
      create: {
        userId, totalXP: totalXP ?? 0, level: level ?? 1,
        streak: streak ?? 0, longestStreak: longestStreak ?? 0,
        lastStudiedDate: lastStudiedDate ? new Date(lastStudiedDate) : null,
        totalLessonsCompleted: totalLessonsCompleted ?? 0,
        totalWordsLearned: totalWordsLearned ?? 0,
        totalMinutesStudied: totalMinutesStudied ?? 0,
      },
      update: {
        totalXP: totalXP ?? 0, level: level ?? 1,
        streak: streak ?? 0, longestStreak: longestStreak ?? 0,
        lastStudiedDate: lastStudiedDate ? new Date(lastStudiedDate) : null,
        totalLessonsCompleted: totalLessonsCompleted ?? 0,
        totalWordsLearned: totalWordsLearned ?? 0,
        totalMinutesStudied: totalMinutesStudied ?? 0,
      },
    });

    // Sync lesson progress
    if (lessonProgress) {
      for (const [lessonId, lp] of Object.entries<any>(lessonProgress)) {
        await this.prisma.lessonProgress.upsert({
          where: { userId_lessonId: { userId, lessonId } },
          create: {
            userId, lessonId, levelId: lp.levelId ?? '',
            completed: lp.completed ?? false, stars: lp.stars ?? 0,
            score: lp.score ?? 0, bestScore: lp.bestScore ?? 0,
            attempts: lp.attempts ?? 0,
            completedAt: lp.completedAt ? new Date(lp.completedAt) : null,
          },
          update: {
            completed: lp.completed ?? false, stars: lp.stars ?? 0,
            score: lp.score ?? 0,
            bestScore: lp.bestScore ?? 0,
            attempts: lp.attempts ?? 0,
            completedAt: lp.completedAt ? new Date(lp.completedAt) : null,
          },
        });
      }
    }

    // Sync daily activity
    if (dailyActivity && Array.isArray(dailyActivity)) {
      for (const day of dailyActivity) {
        const date = new Date(day.date);
        await this.prisma.dailyActivity.upsert({
          where: { userId_date: { userId, date } },
          create: {
            userId, date,
            minutesStudied: day.minutesStudied ?? 0,
            xpEarned: day.xpEarned ?? 0,
            lessonsCompleted: day.lessonsCompleted ?? 0,
            wordsLearned: day.wordsLearned ?? 0,
          },
          update: {
            minutesStudied: day.minutesStudied ?? 0,
            xpEarned: day.xpEarned ?? 0,
            lessonsCompleted: day.lessonsCompleted ?? 0,
            wordsLearned: day.wordsLearned ?? 0,
          },
        });
      }
    }

    // Sync achievements
    if (achievementsUnlocked && Array.isArray(achievementsUnlocked)) {
      for (const achievementId of achievementsUnlocked) {
        await this.prisma.achievementUnlock.upsert({
          where: { userId_achievementId: { userId, achievementId } },
          create: { userId, achievementId },
          update: {},
        });
      }
    }

    // Sync grammar read
    if (grammarRead && Array.isArray(grammarRead)) {
      for (const topicId of grammarRead) {
        await this.prisma.grammarRead.upsert({
          where: { userId_topicId: { userId, topicId } },
          create: { userId, topicId },
          update: {},
        });
      }
    }

    return { message: 'Đồng bộ dữ liệu thành công' };
  }

  async exportData(userId: string) {
    return this.getFullProgress(userId);
  }

  async resetProgress(userId: string) {
    await Promise.all([
      this.prisma.userProgress.update({
        where: { userId },
        data: {
          totalXP: 0, level: 1, streak: 0, longestStreak: 0,
          lastStudiedDate: null, totalLessonsCompleted: 0,
          totalWordsLearned: 0, totalMinutesStudied: 0,
        },
      }),
      this.prisma.lessonProgress.deleteMany({ where: { userId } }),
      this.prisma.dailyActivity.deleteMany({ where: { userId } }),
      this.prisma.achievementUnlock.deleteMany({ where: { userId } }),
      this.prisma.grammarRead.deleteMany({ where: { userId } }),
      this.prisma.flashcardReview.deleteMany({ where: { userId } }),
    ]);
    return { message: 'Đã reset toàn bộ tiến trình' };
  }
}
