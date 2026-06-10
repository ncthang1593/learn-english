// ===== Achievement Model =====

export type AchievementCategory = 'streak' | 'lessons' | 'vocabulary' | 'practice' | 'level' | 'time';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  category: AchievementCategory;
  condition: AchievementCondition;
  xpReward: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface AchievementCondition {
  type: 'streak' | 'lessons_completed' | 'words_learned' | 'xp_total' | 'level_completed' | 'minutes_studied' | 'perfect_score';
  value: number;
  extra?: string; // e.g., levelId for level_completed
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_lesson',
    title: 'Bước Đầu Tiên',
    description: 'Hoàn thành bài học đầu tiên',
    emoji: '🎯',
    category: 'lessons',
    condition: { type: 'lessons_completed', value: 1 },
    xpReward: 50,
    rarity: 'common',
  },
  {
    id: 'streak_3',
    title: 'Đang Nóng!',
    description: 'Học 3 ngày liên tiếp',
    emoji: '🔥',
    category: 'streak',
    condition: { type: 'streak', value: 3 },
    xpReward: 100,
    rarity: 'common',
  },
  {
    id: 'streak_7',
    title: 'Tuần Bứt Phá',
    description: 'Học 7 ngày liên tiếp',
    emoji: '⚡',
    category: 'streak',
    condition: { type: 'streak', value: 7 },
    xpReward: 200,
    rarity: 'rare',
  },
  {
    id: 'streak_30',
    title: 'Tháng Kiên Trì',
    description: 'Học 30 ngày liên tiếp',
    emoji: '💎',
    category: 'streak',
    condition: { type: 'streak', value: 30 },
    xpReward: 1000,
    rarity: 'legendary',
  },
  {
    id: 'words_10',
    title: 'Mầm Từ Vựng',
    description: 'Học 10 từ vựng đầu tiên',
    emoji: '🌱',
    category: 'vocabulary',
    condition: { type: 'words_learned', value: 10 },
    xpReward: 50,
    rarity: 'common',
  },
  {
    id: 'words_50',
    title: 'Nhà Sưu Tập Từ',
    description: 'Học được 50 từ vựng',
    emoji: '📚',
    category: 'vocabulary',
    condition: { type: 'words_learned', value: 50 },
    xpReward: 150,
    rarity: 'rare',
  },
  {
    id: 'words_200',
    title: 'Từ Điển Sống',
    description: 'Học được 200 từ vựng',
    emoji: '🧠',
    category: 'vocabulary',
    condition: { type: 'words_learned', value: 200 },
    xpReward: 500,
    rarity: 'epic',
  },
  {
    id: 'lessons_10',
    title: 'Học Trò Chăm Chỉ',
    description: 'Hoàn thành 10 bài học',
    emoji: '✏️',
    category: 'lessons',
    condition: { type: 'lessons_completed', value: 10 },
    xpReward: 200,
    rarity: 'rare',
  },
  {
    id: 'perfect_score',
    title: 'Hoàn Hảo!',
    description: 'Đạt 100% trong một bài tập',
    emoji: '⭐',
    category: 'lessons',
    condition: { type: 'perfect_score', value: 1 },
    xpReward: 100,
    rarity: 'rare',
  },
  {
    id: 'level1_complete',
    title: 'Nền Tảng Vững Chắc',
    description: 'Hoàn thành cấp Nền Tảng',
    emoji: '🏆',
    category: 'level',
    condition: { type: 'level_completed', value: 1, extra: 'foundation' },
    xpReward: 500,
    rarity: 'epic',
  },
  {
    id: 'level2_complete',
    title: 'Đang Xây Dựng',
    description: 'Hoàn thành cấp Xây Dựng',
    emoji: '🏗️',
    category: 'level',
    condition: { type: 'level_completed', value: 1, extra: 'building' },
    xpReward: 750,
    rarity: 'epic',
  },
  {
    id: 'xp_1000',
    title: 'Ngàn Điểm Kinh Nghiệm',
    description: 'Tích lũy 1000 XP',
    emoji: '💫',
    category: 'lessons',
    condition: { type: 'xp_total', value: 1000 },
    xpReward: 100,
    rarity: 'rare',
  },
  {
    id: 'study_60min',
    title: 'Giờ Học Đầu Tiên',
    description: 'Học tổng cộng 60 phút',
    emoji: '⏰',
    category: 'time',
    condition: { type: 'minutes_studied', value: 60 },
    xpReward: 150,
    rarity: 'common',
  },
];
