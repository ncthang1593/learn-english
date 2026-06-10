import { LevelId } from './lesson.model';

// ===== Progress Models =====

export interface LessonProgress {
  lessonId: string;
  levelId: LevelId;
  completed: boolean;
  stars: number; // 0-3
  score: number; // percentage 0-100
  bestScore: number;
  completedAt?: string; // ISO date
  attempts: number;
}

export interface LevelProgress {
  levelId: LevelId;
  unlocked: boolean;
  completed: boolean;
  completedLessons: number;
  totalLessons: number;
  percentComplete: number;
}

export interface DailyActivity {
  date: string; // YYYY-MM-DD
  minutesStudied: number;
  xpEarned: number;
  lessonsCompleted: number;
  wordsLearned: number;
}

export interface UserProgress {
  userId: string;
  totalXP: number;
  level: number;
  streak: number;
  longestStreak: number;
  lastStudiedDate: string | null; // YYYY-MM-DD
  totalLessonsCompleted: number;
  totalWordsLearned: number;
  totalMinutesStudied: number;
  dailyGoalMinutes: number;
  lessonProgress: Record<string, LessonProgress>;
  levelProgress: Record<LevelId, LevelProgress>;
  dailyActivity: DailyActivity[];
  achievementsUnlocked: string[];
  grammarRead: string[]; // IDs of grammar topics marked as read
  createdAt: string;
  updatedAt: string;
}

// ===== Flashcard Spaced Repetition =====

export interface FlashcardReview {
  wordId: string;
  lessonId: string;
  nextReviewDate: string; // ISO date
  interval: number; // days
  easeFactor: number; // 1.3 - 2.5
  repetitions: number;
  lastGrade: number; // 0-5 (SM-2 algorithm)
}

export interface FlashcardState {
  reviews: Record<string, FlashcardReview>;
}
