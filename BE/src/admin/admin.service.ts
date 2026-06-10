import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const [totalUsers, totalLessons, totalGrammar, recentActivity] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.lessonProgress.count({ where: { completed: true } }),
      this.prisma.grammarRead.count(),
      this.prisma.dailyActivity.findMany({
        orderBy: { date: 'desc' },
        take: 7,
        select: { date: true, xpEarned: true, lessonsCompleted: true, wordsLearned: true },
      }),
    ]);

    return { totalUsers, totalLessons, totalGrammar, recentActivity };
  }

  // ===== Lessons CRUD =====
  async getLessons(levelId?: string) {
    return this.prisma.lessonContent.findMany({
      where: levelId ? { levelId } : undefined,
      orderBy: [{ levelId: 'asc' }, { order: 'asc' }],
    });
  }

  async createLesson(data: any) {
    return this.prisma.lessonContent.create({ data });
  }

  async updateLesson(id: string, data: any) {
    return this.prisma.lessonContent.update({ where: { id }, data });
  }

  async deleteLesson(id: string) {
    await this.prisma.lessonContent.delete({ where: { id } });
    return { message: 'Đã xóa bài học' };
  }

  // ===== Grammar CRUD =====
  async getGrammarTopics(categoryId?: string) {
    return this.prisma.grammarContent.findMany({
      where: categoryId ? { categoryId } : undefined,
      orderBy: [{ categoryId: 'asc' }, { order: 'asc' }],
    });
  }

  async createGrammarTopic(data: any) {
    return this.prisma.grammarContent.create({ data });
  }

  async updateGrammarTopic(id: string, data: any) {
    return this.prisma.grammarContent.update({ where: { id }, data });
  }

  async deleteGrammarTopic(id: string) {
    await this.prisma.grammarContent.delete({ where: { id } });
    return { message: 'Đã xóa chủ đề ngữ pháp' };
  }
}
