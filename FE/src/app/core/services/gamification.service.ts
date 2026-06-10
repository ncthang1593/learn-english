import { Injectable, signal, inject } from '@angular/core';
import { StorageService } from './storage.service';
import { ACHIEVEMENTS, Achievement } from '../models/achievement.model';

export interface GamificationEvent {
  type: 'xp' | 'level_up' | 'streak' | 'achievement' | 'stars';
  value?: number;
  achievement?: Achievement;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class GamificationService {
  private storage = inject(StorageService);
  private _events = signal<GamificationEvent[]>([]);

  readonly events = this._events.asReadonly();

  // XP rewards table
  readonly XP_REWARDS = {
    lesson_complete_easy: 30,
    lesson_complete_medium: 50,
    lesson_complete_hard: 75,
    perfect_score: 25,
    star_bonus: 10, // per extra star
    daily_streak: 15,
    flashcard_correct: 5,
    quiz_complete: 40,
  } as const;

  // Level names
  readonly LEVEL_NAMES = [
    '', 'Người Mới Bắt Đầu', 'Tập Sự', 'Học Sinh', 'Học Sinh Giỏi',
    'Sinh Viên', 'Thạc Sĩ Nhỏ', 'Chuyên Gia', 'Cao Thủ', 'Thiên Tài', 'Huyền Thoại'
  ];

  getLevelName(level: number): string {
    return this.LEVEL_NAMES[Math.min(level, this.LEVEL_NAMES.length - 1)] || `Cấp ${level}`;
  }

  // Called after completing a lesson
  processLessonComplete(score: number, difficulty: 'easy' | 'medium' | 'hard', stars: number): GamificationEvent[] {
    const events: GamificationEvent[] = [];
    const prevLevel = this.storage.progress().level;

    // Base XP
    let xp = this.XP_REWARDS[`lesson_complete_${difficulty}`];

    // Perfect score bonus
    if (score === 100) {
      xp += this.XP_REWARDS.perfect_score;
      events.push({ type: 'xp', value: this.XP_REWARDS.perfect_score, message: '🎯 Hoàn hảo! +' + this.XP_REWARDS.perfect_score + ' XP' });
    }

    // Star bonus
    if (stars === 3) xp += this.XP_REWARDS.star_bonus * 2;
    else if (stars === 2) xp += this.XP_REWARDS.star_bonus;

    this.storage.addXP(xp);
    events.push({ type: 'xp', value: xp, message: '+' + xp + ' XP' });

    // Level up check
    const newLevel = this.storage.progress().level;
    if (newLevel > prevLevel) {
      events.push({ type: 'level_up', value: newLevel, message: `🎊 Lên cấp ${newLevel}! ${this.getLevelName(newLevel)}` });
    }

    // Update streak
    this.storage.updateStreak();
    const streak = this.storage.progress().streak;
    if (streak > 1) {
      this.storage.addXP(this.XP_REWARDS.daily_streak);
      events.push({ type: 'streak', value: streak, message: `🔥 ${streak} ngày liên tiếp!` });
    }

    // Check achievements
    const newAchievements = this.checkAchievements();
    for (const a of newAchievements) {
      events.push({ type: 'achievement', achievement: a, message: `🏆 ${a.title}` });
      this.storage.unlockAchievement(a.id);
      this.storage.addXP(a.xpReward);
    }

    this._events.set(events);
    return events;
  }

  processFlashcardCorrect(): void {
    this.storage.addXP(this.XP_REWARDS.flashcard_correct);
  }

  // Stars calculation: 1-3 based on score
  calculateStars(score: number): number {
    if (score >= 95) return 3;
    if (score >= 70) return 2;
    if (score >= 50) return 1;
    return 0;
  }

  private checkAchievements(): Achievement[] {
    const progress = this.storage.progress();
    const unlocked = progress.achievementsUnlocked;

    return ACHIEVEMENTS.filter(a => {
      if (unlocked.includes(a.id)) return false;
      const { type, value, extra } = a.condition;

      switch (type) {
        case 'streak': return progress.streak >= value;
        case 'lessons_completed': return progress.totalLessonsCompleted >= value;
        case 'words_learned': return progress.totalWordsLearned >= value;
        case 'xp_total': return progress.totalXP >= value;
        case 'minutes_studied': return progress.totalMinutesStudied >= value;
        case 'perfect_score': return Object.values(progress.lessonProgress).some(lp => lp.bestScore === 100);
        case 'level_completed': return extra ? progress.levelProgress[extra as import('../models/lesson.model').LevelId]?.completed : false;
        default: return false;
      }
    });
  }

  clearEvents(): void {
    this._events.set([]);
  }
}
