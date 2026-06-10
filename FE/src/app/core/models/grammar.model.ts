export interface GrammarCategory {
  id: string;
  name: string;
  nameVietnamese: string;
  emoji: string;
  description: string;
  colorClass: string;
  bgGradient: string;
  topics: GrammarTopic[];
}

export interface GrammarTopic {
  id: string;
  categoryId: string;
  title: string;
  titleVietnamese: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  emoji: string;
  order: number;

  whenToUse: WhenToUse[];
  formulas: GrammarFormula[];
  signalWords: string[];
  examples: GrammarExample[];
  commonMistakes: CommonMistake[];
  comparison?: GrammarComparison;
  tips: string[];
  exercises: GrammarExercise[];
}

export interface WhenToUse {
  description: string;
  example?: string;
}

export interface GrammarFormula {
  type: 'affirmative' | 'negative' | 'question';
  label: string;
  formula: string;
  note?: string;
}

export interface GrammarExample {
  type: 'affirmative' | 'negative' | 'question';
  english: string;
  vietnamese: string;
  highlight?: string;
}

export interface CommonMistake {
  wrong: string;
  correct: string;
  explanation: string;
}

export interface GrammarComparison {
  title: string;
  headers: [string, string];
  rows: Array<{ left: string; right: string }>;
}

export type GrammarExercise =
  | GrammarMCQ
  | GrammarFillBlank;

export interface GrammarMCQ {
  type: 'mcq';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface GrammarFillBlank {
  type: 'fill-blank';
  sentence: string;
  answer: string;
  hint?: string;
  explanation: string;
}
