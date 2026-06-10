import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProgressModule } from './progress/progress.module';
import { LessonsModule } from './lessons/lessons.module';
import { GamificationModule } from './gamification/gamification.module';
import { GrammarModule } from './grammar/grammar.module';
import { FlashcardsModule } from './flashcards/flashcards.module';
import { ContentModule } from './content/content.module';
import { AdminModule } from './admin/admin.module';
import { DictionaryModule } from './dictionary/dictionary.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    ProgressModule,
    LessonsModule,
    GamificationModule,
    GrammarModule,
    FlashcardsModule,
    ContentModule,
    AdminModule,
    DictionaryModule,
  ],
})
export class AppModule {}
