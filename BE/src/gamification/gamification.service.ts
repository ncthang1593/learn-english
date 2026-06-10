import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ACHIEVEMENTS } from './achievements.data';

@Injectable()
export class GamificationService {
  constructor(private prisma: PrismaService) {}

  async getStats(userId: string) {
    const progress = await this.prisma.userProgress.findUnique({ where: { userId } });
    const achievementsUnlocked = await this.prisma.achievementUnlock.findMany({ where: { userId } });
    const unlockedIds = achievementsUnlocked.map((a) => a.achievementId);

    return {
      totalXP: progress?.totalXP ?? 0,
      level: progress?.level ?? 1,
      levelName: this.getLevelName(progress?.level ?? 1),
      streak: progress?.streak ?? 0,
      longestStreak: progress?.longestStreak ?? 0,
      xpToNextLevel: this.xpToNextLevel(progress?.totalXP ?? 0),
      xpProgressPercent: this.xpProgressPercent(progress?.totalXP ?? 0),
      achievementsUnlocked: unlockedIds,
      totalAchievements: ACHIEVEMENTS.length,
    };
  }

  async dailyCheckin(userId: string) {
    const today = new Date().toISOString().slice(0, 10);
    const progress = await this.prisma.userProgress.findUnique({ where: { userId } });

    const lastDate = progress?.lastStudiedDate
      ? progress.lastStudiedDate.toISOString().slice(0, 10)
      : null;

    if (lastDate === today) {
      return { streak: progress?.streak ?? 0, message: 'Đã điểm danh hôm nay' };
    }

    let newStreak = 1;
    if (lastDate) {
      const diff = Math.round(
        (new Date(today).getTime() - new Date(lastDate).getTime()) / 86400000,
      );
      newStreak = diff === 1 ? (progress?.streak ?? 0) + 1 : 1;
    }

    const newLongest = Math.max(progress?.longestStreak ?? 0, newStreak);
    const streakXP = newStreak > 1 ? 15 : 0;

    await this.prisma.userProgress.upsert({
      where: { userId },
      create: {
        userId, streak: newStreak, longestStreak: newLongest,
        lastStudiedDate: new Date(today), totalXP: streakXP,
      },
      update: {
        streak: newStreak, longestStreak: newLongest,
        lastStudiedDate: new Date(today),
        totalXP: { increment: streakXP },
      },
    });

    // Check streak achievements
    const newAchievements = await this.checkStreakAchievements(userId, newStreak);

    return {
      streak: newStreak,
      longestStreak: newLongest,
      streakXP,
      newAchievements,
      message: newStreak > 1 ? `🔥 ${newStreak} ngày liên tiếp!` : 'Bắt đầu streak mới!',
    };
  }

  async getAchievements(userId: string) {
    const unlocked = await this.prisma.achievementUnlock.findMany({
      where: { userId },
      select: { achievementId: true, unlockedAt: true },
    });
    const unlockedMap = Object.fromEntries(unlocked.map((a) => [a.achievementId, a.unlockedAt]));

    return ACHIEVEMENTS.map((a) => ({
      ...a,
      unlocked: !!unlockedMap[a.id],
      unlockedAt: unlockedMap[a.id] || null,
    }));
  }

  private async checkStreakAchievements(userId: string, streak: number) {
    const streakMilestones = [3, 7, 30, 100];
    const newAchievements: string[] = [];

    for (const milestone of streakMilestones) {
      if (streak >= milestone) {
        const id = `streak_${milestone}`;
        const existing = await this.prisma.achievementUnlock.findUnique({
          where: { userId_achievementId: { userId, achievementId: id } },
        });
        if (!existing) {
          await this.prisma.achievementUnlock.create({ data: { userId, achievementId: id } });
          newAchievements.push(id);
        }
      }
    }

    return newAchievements;
  }

  private getLevelName(level: number): string {
    const names = [
      '', 'Người Mới Bắt Đầu', 'Tập Sự', 'Học Sinh', 'Học Sinh Giỏi',
      'Sinh Viên', 'Thạc Sĩ Nhỏ', 'Chuyên Gia', 'Cao Thủ', 'Thiên Tài', 'Huyền Thoại',
    ];
    return names[Math.min(level, names.length - 1)] || `Cấp ${level}`;
  }

  private xpForLevel(level: number): number {
    if (level <= 1) return 0;
    return Math.floor(100 * Math.pow(level - 1, 1.5));
  }

  private calculateLevel(xp: number): number {
    let level = 1;
    while (this.xpForLevel(level + 1) <= xp) level++;
    return level;
  }

  private xpToNextLevel(totalXP: number): number {
    const level = this.calculateLevel(totalXP);
    return this.xpForLevel(level + 1) - totalXP;
  }

  private xpProgressPercent(totalXP: number): number {
    const level = this.calculateLevel(totalXP);
    const current = totalXP - this.xpForLevel(level);
    const needed = this.xpForLevel(level + 1) - this.xpForLevel(level);
    return Math.min(100, Math.round((current / needed) * 100));
  }
}
