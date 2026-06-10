import { Injectable, signal, computed } from '@angular/core';
import { UserProgress, LessonProgress, DailyActivity, LevelProgress, FlashcardState } from '../models/progress.model';
import { LevelId } from '../models/lesson.model';

const STORAGE_KEY = 'englishup_progress';
const FLASHCARD_KEY = 'englishup_flashcards';

function defaultProgress(): UserProgress {
  const now = new Date().toISOString();
  return {
    userId: 'local_user',
    totalXP: 0,
    level: 1,
    streak: 0,
    longestStreak: 0,
    lastStudiedDate: null,
    totalLessonsCompleted: 0,
    totalWordsLearned: 0,
    totalMinutesStudied: 0,
    dailyGoalMinutes: 10,
    lessonProgress: {},
    levelProgress: {
      foundation: { levelId: 'foundation', unlocked: true, completed: false, completedLessons: 0, totalLessons: 0, percentComplete: 0 },
      building: { levelId: 'building', unlocked: false, completed: false, completedLessons: 0, totalLessons: 0, percentComplete: 0 },
      developing: { levelId: 'developing', unlocked: false, completed: false, completedLessons: 0, totalLessons: 0, percentComplete: 0 },
      advancing: { levelId: 'advancing', unlocked: false, completed: false, completedLessons: 0, totalLessons: 0, percentComplete: 0 },
    },
    dailyActivity: [],
    achievementsUnlocked: [],
    grammarRead: [],
    createdAt: now,
    updatedAt: now,
  };
}

@Injectable({ providedIn: 'root' })
export class StorageService {
  private _progress = signal<UserProgress>(this.load());
  private _flashcards = signal<FlashcardState>(this.loadFlashcards());

  readonly progress = this._progress.asReadonly();
  readonly flashcards = this._flashcards.asReadonly();

  // ===== Computed values =====
  readonly xpLevel = computed(() => this.calculateLevel(this._progress().totalXP));
  readonly xpToNextLevel = computed(() => this.xpForLevel(this.xpLevel() + 1) - this._progress().totalXP);
  readonly xpProgressPercent = computed(() => {
    const current = this._progress().totalXP - this.xpForLevel(this.xpLevel());
    const needed = this.xpForLevel(this.xpLevel() + 1) - this.xpForLevel(this.xpLevel());
    return Math.min(100, Math.round((current / needed) * 100));
  });

  private load(): UserProgress {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return { ...defaultProgress(), ...JSON.parse(raw) };
    } catch {}
    return defaultProgress();
  }

  private loadFlashcards(): FlashcardState {
    try {
      const raw = localStorage.getItem(FLASHCARD_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return { reviews: {} };
  }

  private save(progress: UserProgress): void {
    progress.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    this._progress.set({ ...progress });
  }

  private saveFlashcards(state: FlashcardState): void {
    localStorage.setItem(FLASHCARD_KEY, JSON.stringify(state));
    this._flashcards.set({ ...state });
  }

  // ===== XP & Level =====
  private xpForLevel(level: number): number {
    if (level <= 1) return 0;
    return Math.floor(100 * Math.pow(level - 1, 1.5));
  }

  private calculateLevel(xp: number): number {
    let level = 1;
    while (this.xpForLevel(level + 1) <= xp) level++;
    return level;
  }

  addXP(amount: number): void {
    const p = { ...this._progress() };
    p.totalXP += amount;
    p.level = this.calculateLevel(p.totalXP);
    this.updateDailyActivity(p, { xpEarned: amount });
    this.save(p);
  }

  // ===== Streak =====
  updateStreak(): void {
    const p = { ...this._progress() };
    const today = new Date().toISOString().slice(0, 10);
    const last = p.lastStudiedDate;

    if (last === today) return;

    if (last) {
      const lastDate = new Date(last);
      const todayDate = new Date(today);
      const diffDays = Math.round((todayDate.getTime() - lastDate.getTime()) / 86400000);
      if (diffDays === 1) {
        p.streak += 1;
      } else if (diffDays > 1) {
        p.streak = 1;
      }
    } else {
      p.streak = 1;
    }

    p.longestStreak = Math.max(p.longestStreak, p.streak);
    p.lastStudiedDate = today;
    this.save(p);
  }

  // ===== Lesson Progress =====
  saveLessonProgress(progress: LessonProgress): void {
    const p = { ...this._progress() };
    const existing = p.lessonProgress[progress.lessonId];

    p.lessonProgress[progress.lessonId] = {
      ...progress,
      bestScore: existing ? Math.max(existing.bestScore, progress.score) : progress.score,
      attempts: existing ? existing.attempts + 1 : 1,
    };

    if (progress.completed && !existing?.completed) {
      p.totalLessonsCompleted += 1;
      this.updateDailyActivity(p, { lessonsCompleted: 1 });
    }

    this.save(p);
  }

  // ===== Words Learned =====
  addWordsLearned(count: number): void {
    const p = { ...this._progress() };
    p.totalWordsLearned += count;
    this.updateDailyActivity(p, { wordsLearned: count });
    this.save(p);
  }

  // ===== Level Progress =====
  updateLevelProgress(levelId: LevelId, completedLessons: number, totalLessons: number): void {
    const p = { ...this._progress() };
    if (!p.levelProgress[levelId]) {
      p.levelProgress[levelId] = { levelId, unlocked: true, completed: false, completedLessons: 0, totalLessons: 0, percentComplete: 0 };
    }
    const levelProg = p.levelProgress[levelId];
    const wasCompleted = levelProg.completed;

    levelProg.completedLessons = completedLessons;
    levelProg.totalLessons = totalLessons;
    levelProg.percentComplete = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    levelProg.completed = completedLessons >= totalLessons && totalLessons > 0;

    // Unlock next level
    if (!wasCompleted && levelProg.completed) {
      const nextMap: Record<LevelId, LevelId | null> = {
        foundation: 'building',
        building: 'developing',
        developing: 'advancing',
        advancing: null,
      };
      const next = nextMap[levelId];
      if (next) p.levelProgress[next].unlocked = true;
    }

    this.save(p);
  }

  // ===== Study Time =====
  addStudyTime(minutes: number): void {
    const p = { ...this._progress() };
    p.totalMinutesStudied += minutes;
    this.updateDailyActivity(p, { minutesStudied: minutes });
    this.save(p);
  }

  // ===== Daily Activity =====
  private updateDailyActivity(p: UserProgress, update: Partial<DailyActivity>): void {
    const today = new Date().toISOString().slice(0, 10);
    let day = p.dailyActivity.find(d => d.date === today);
    if (!day) {
      day = { date: today, minutesStudied: 0, xpEarned: 0, lessonsCompleted: 0, wordsLearned: 0 };
      p.dailyActivity.push(day);
    }
    if (update.minutesStudied) day.minutesStudied += update.minutesStudied;
    if (update.xpEarned) day.xpEarned += update.xpEarned;
    if (update.lessonsCompleted) day.lessonsCompleted += update.lessonsCompleted;
    if (update.wordsLearned) day.wordsLearned += update.wordsLearned;
    // Keep only last 90 days
    if (p.dailyActivity.length > 90) p.dailyActivity = p.dailyActivity.slice(-90);
  }

  // ===== Achievements =====
  unlockAchievement(achievementId: string): void {
    const p = { ...this._progress() };
    if (!p.achievementsUnlocked.includes(achievementId)) {
      p.achievementsUnlocked.push(achievementId);
      this.save(p);
    }
  }

  // ===== Grammar Read Tracking =====
  markGrammarRead(topicId: string): void {
    const p = { ...this._progress() };
    if (!p.grammarRead) p.grammarRead = [];
    if (!p.grammarRead.includes(topicId)) {
      p.grammarRead.push(topicId);
      this.save(p);
    }
  }

  isGrammarRead(topicId: string): boolean {
    return this._progress().grammarRead?.includes(topicId) ?? false;
  }

  // ===== Flashcards =====
  updateFlashcardReview(wordId: string, lessonId: string, grade: number): void {
    const state = { ...this._flashcards() };
    const existing = state.reviews[wordId];

    let interval = existing?.interval ?? 1;
    let easeFactor = existing?.easeFactor ?? 2.5;
    let repetitions = existing?.repetitions ?? 0;

    // SM-2 Algorithm
    if (grade >= 3) {
      if (repetitions === 0) interval = 1;
      else if (repetitions === 1) interval = 6;
      else interval = Math.round(interval * easeFactor);
      repetitions += 1;
    } else {
      repetitions = 0;
      interval = 1;
    }

    easeFactor = Math.max(1.3, easeFactor + 0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));

    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + interval);

    state.reviews[wordId] = {
      wordId, lessonId,
      nextReviewDate: nextReview.toISOString(),
      interval, easeFactor, repetitions,
      lastGrade: grade,
    };

    this.saveFlashcards(state);
  }

  getDueFlashcards(): string[] {
    const state = this._flashcards();
    const now = new Date();
    return Object.values(state.reviews)
      .filter(r => new Date(r.nextReviewDate) <= now)
      .map(r => r.wordId);
  }

  // ===== Settings =====
  setDailyGoal(minutes: number): void {
    const p = { ...this._progress() };
    p.dailyGoalMinutes = minutes;
    this.save(p);
  }

  resetProgress(): void {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(FLASHCARD_KEY);
    this._progress.set(defaultProgress());
    this._flashcards.set({ reviews: {} });
  }

  exportData(): string {
    return JSON.stringify({
      progress: this._progress(),
      flashcards: this._flashcards(),
    }, null, 2);
  }

  importData(json: string): boolean {
    try {
      const data = JSON.parse(json);
      if (data.progress) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data.progress));
        this._progress.set(data.progress);
      }
      if (data.flashcards) {
        localStorage.setItem(FLASHCARD_KEY, JSON.stringify(data.flashcards));
        this._flashcards.set(data.flashcards);
      }
      return true;
    } catch {
      return false;
    }
  }
}
