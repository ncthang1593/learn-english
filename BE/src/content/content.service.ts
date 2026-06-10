import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ACHIEVEMENTS } from '../gamification/achievements.data';

// Import static data from FE (will be seeded to DB, but serve static as fallback)
const STATIC_LEVELS_PATH = '../../../FE/src/app/data/levels.data';
const STATIC_GRAMMAR_PATH = '../../../FE/src/app/data/grammar.data';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  async getLevels() {
    // Try DB first (admin-managed), fallback to static
    const dbLessons = await this.prisma.lessonContent.findMany({
      where: { published: true },
      orderBy: [{ levelId: 'asc' }, { order: 'asc' }],
    });

    if (dbLessons.length > 0) {
      // Group by level
      const levels: Record<string, any[]> = {};
      for (const lesson of dbLessons) {
        if (!levels[lesson.levelId]) levels[lesson.levelId] = [];
        levels[lesson.levelId].push(lesson);
      }
      return levels;
    }

    // Fallback: static data (served directly from FE data files via import)
    return { source: 'static', message: 'Use FE static data' };
  }

  async getGrammar() {
    const dbTopics = await this.prisma.grammarContent.findMany({
      where: { published: true },
      orderBy: [{ categoryId: 'asc' }, { order: 'asc' }],
    });

    if (dbTopics.length > 0) return dbTopics;
    return { source: 'static', message: 'Use FE static data' };
  }

  async getGrammarTopic(topicId: string) {
    return this.prisma.grammarContent.findUnique({ where: { topicId } });
  }

  async getAchievements() {
    return ACHIEVEMENTS;
  }
}
