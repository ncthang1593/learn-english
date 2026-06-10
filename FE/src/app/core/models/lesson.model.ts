// ===== Lesson Models =====

export type LevelId = 'foundation' | 'building' | 'developing' | 'advancing';
export type ExerciseType = 'mcq' | 'fill-blank' | 'matching' | 'ordering';
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface VocabularyWord {
  id: string;
  english: string;
  vietnamese: string;
  pronunciation?: string; // IPA
  example: string;
  exampleVietnamese: string;
  imageUrl?: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'phrase';
}

export interface TheorySection {
  title: string;
  content: string; // HTML content
  tip?: string;
  examples: Array<{ english: string; vietnamese: string }>;
}

export interface ExerciseMCQ {
  type: 'mcq';
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ExerciseFillBlank {
  type: 'fill-blank';
  id: string;
  sentence: string; // Use ___ for blank
  answer: string;
  hint?: string;
  explanation: string;
}

export interface ExerciseMatching {
  type: 'matching';
  id: string;
  instruction: string;
  pairs: Array<{ left: string; right: string }>;
}

export interface ExerciseOrdering {
  type: 'ordering';
  id: string;
  instruction: string;
  words: string[];
  correctOrder: string[];
  vietnamese: string;
}

export type Exercise = ExerciseMCQ | ExerciseFillBlank | ExerciseMatching | ExerciseOrdering;

export interface Lesson {
  id: string;
  levelId: LevelId;
  order: number;
  title: string;
  titleVietnamese: string;
  description: string;
  emoji: string;
  estimatedMinutes: number;
  xpReward: number;
  difficulty: DifficultyLevel;
  theory: TheorySection[];
  vocabulary: VocabularyWord[];
  exercises: Exercise[];
  tags: string[];
}

export interface Level {
  id: LevelId;
  name: string;
  nameVietnamese: string;
  description: string;
  emoji: string;
  colorClass: string;
  bgGradient: string;
  order: number;
  lessons: Lesson[];
  unlockRequirement?: string; // levelId that must be completed first
}
