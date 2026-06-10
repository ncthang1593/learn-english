import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GrammarService {
  constructor(private prisma: PrismaService) {}

  async markRead(userId: string, topicId: string) {
    await this.prisma.grammarRead.upsert({
      where: { userId_topicId: { userId, topicId } },
      create: { userId, topicId },
      update: {},
    });
    return { topicId, read: true };
  }

  async getReadStatus(userId: string) {
    const reads = await this.prisma.grammarRead.findMany({
      where: { userId },
      select: { topicId: true, readAt: true },
    });
    return { grammarRead: reads.map((r) => r.topicId), total: reads.length };
  }
}
