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
      // Group by level and return Level[] format expected by FE
      const levelMap = new Map<string, any>();
      
      for (const lesson of dbLessons) {
        if (!levelMap.has(lesson.levelId)) {
          levelMap.set(lesson.levelId, {
            id: lesson.levelId,
            order: 1, // Giả lập order của level
            title: lesson.levelId === 'basic-1' ? 'Tiếng Anh Giao Tiếp Cơ Bản' : lesson.levelId,
            description: 'Lấy từ Database tự động',
            isPremium: false,
            lessons: []
          });
        }
        levelMap.get(lesson.levelId).lessons.push(lesson);
      }
      
      return Array.from(levelMap.values());
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
