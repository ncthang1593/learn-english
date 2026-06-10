import { Component, inject, computed } from '@angular/core';
import { StorageService } from '../../core/services/storage.service';
import { GamificationService } from '../../core/services/gamification.service';
import { ACHIEVEMENTS } from '../../core/models/achievement.model';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [],
  template: `
    <div class="page-enter space-y-6 pb-20 md:pb-6">
      <div>
        <h1 class="font-display text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-1">📊 Tiến Trình Học</h1>
        <p class="text-slate-500 dark:text-slate-400">Theo dõi hành trình học tiếng Anh của bạn</p>
      </div>

      <!-- Overview stats -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
        @for (stat of overviewStats(); track stat.label) {
          <div class="card p-4 text-center">
            <div class="text-3xl mb-2">{{ stat.icon }}</div>
            <div class="text-2xl font-display font-bold" [class]="stat.colorClass">{{ stat.value }}</div>
            <div class="text-xs text-slate-400 mt-1">{{ stat.label }}</div>
          </div>
        }
      </div>

      <!-- Level progress -->
      <div class="card p-5">
        <div class="flex items-center gap-2 mb-4">
          <span class="text-xl">⚡</span>
          <h2 class="font-display font-bold text-slate-800 dark:text-white">Cấp Độ Hiện Tại</h2>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold shadow-glow-primary">
            {{ storage.xpLevel() }}
          </div>
          <div class="flex-1">
            <p class="font-semibold text-slate-800 dark:text-white">{{ gamify.getLevelName(storage.xpLevel()) }}</p>
            <p class="text-xs text-slate-400 mb-2">{{ storage.progress().totalXP }} XP · Cần thêm {{ storage.xpToNextLevel() }} XP để lên cấp</p>
            <div class="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div class="h-full xp-bar rounded-full transition-all duration-500"
                   [style.width.%]="storage.xpProgressPercent()">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Activity calendar (last 30 days) -->
      <div class="card p-5">
        <h2 class="font-display font-bold text-slate-800 dark:text-white mb-4">📅 Lịch Sử Học Tập (30 ngày)</h2>
        <div class="grid gap-1" style="grid-template-columns: repeat(7, 1fr)">
          @for (day of calendarDays(); track day.date) {
            <div class="aspect-square rounded-md flex items-center justify-center text-xs font-medium transition-all cursor-default"
                 [title]="day.date + ' - ' + day.xp + ' XP'"
                 [class]="day.xp > 0 ? (day.xp > 100 ? 'bg-primary-600 text-white' : day.xp > 50 ? 'bg-primary-400 text-white' : 'bg-primary-200 text-primary-700') : 'bg-slate-100 dark:bg-slate-800 text-slate-400'">
              {{ day.dayNum }}
            </div>
          }
        </div>
        <div class="flex items-center gap-3 mt-3 justify-end">
          <span class="text-xs text-slate-400">Ít</span>
          <div class="flex gap-1">
            @for (c of heatmapLegend; track c) {
              <div class="w-3 h-3 rounded-sm" [class]="c"></div>
            }
          </div>
          <span class="text-xs text-slate-400">Nhiều</span>
        </div>
      </div>

      <!-- Weekly stats -->
      <div class="card p-5">
        <h2 class="font-display font-bold text-slate-800 dark:text-white mb-4">📈 Tuần Này</h2>
        <div class="flex items-end gap-2 h-24">
          @for (day of weeklyData(); track day.label) {
            <div class="flex-1 flex flex-col items-center gap-1">
              <div class="w-full rounded-t-md transition-all duration-500 min-h-1"
                   [style.height.%]="day.percent"
                   [class]="day.xp > 0 ? 'bg-primary-400' : 'bg-slate-200 dark:bg-slate-700'">
              </div>
              <span class="text-xs text-slate-400">{{ day.label }}</span>
            </div>
          }
        </div>
      </div>

      <!-- Achievements -->
      <div class="card p-5">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-display font-bold text-slate-800 dark:text-white">🏆 Thành Tích</h2>
          <span class="text-sm text-slate-400">{{ unlockedCount() }}/{{ totalAchievements }}</span>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
          @for (a of achievements(); track a.id) {
            <div class="p-3 rounded-xl border transition-all"
                 [class]="a.unlocked ? 'border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-900/10' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 opacity-50'">
              <div class="text-2xl mb-1 text-center" [class.achievement-unlock]="a.unlocked">{{ a.emoji }}</div>
              <p class="text-xs font-semibold text-center text-slate-700 dark:text-slate-300 truncate">{{ a.title }}</p>
              <p class="text-xs text-center text-slate-400 mt-0.5 truncate">{{ a.description }}</p>
              <div class="text-center mt-1">
                <span class="text-xs px-1.5 py-0.5 rounded-full font-medium"
                      [class]="rarityClass(a.rarity)">
                  {{ rarityLabel(a.rarity) }}
                </span>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class ProgressComponent {
  storage = inject(StorageService);
  gamify = inject(GamificationService);

  totalAchievements = ACHIEVEMENTS.length;

  heatmapLegend = [
    'bg-slate-200 dark:bg-slate-700',
    'bg-primary-200',
    'bg-primary-400',
    'bg-primary-600',
  ];

  overviewStats = computed(() => {
    const p = this.storage.progress();
    return [
      { icon: '🔥', value: p.streak, label: 'Streak hiện tại', colorClass: 'text-amber-500' },
      { icon: '💎', value: p.longestStreak, label: 'Streak dài nhất', colorClass: 'text-violet-500' },
      { icon: '⏱️', value: p.totalMinutesStudied + 'p', label: 'Thời gian học', colorClass: 'text-blue-500' },
      { icon: '🔤', value: p.totalWordsLearned, label: 'Từ đã học', colorClass: 'text-emerald-500' },
    ];
  });

  calendarDays = computed(() => {
    const activity = this.storage.progress().dailyActivity;
    const days = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      const dayActivity = activity.find(a => a.date === dateStr);
      days.push({ date: dateStr, xp: dayActivity?.xpEarned ?? 0, dayNum: d.getDate() });
    }
    return days;
  });

  weeklyData = computed(() => {
    const labels = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
    const today = new Date();
    const activity = this.storage.progress().dailyActivity;
    const maxXP = Math.max(...activity.map(a => a.xpEarned), 1);
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      const dayActivity = activity.find(a => a.date === dateStr);
      const xp = dayActivity?.xpEarned ?? 0;
      days.push({ label: labels[d.getDay() === 0 ? 6 : d.getDay() - 1], xp, percent: Math.round((xp / maxXP) * 100) });
    }
    return days;
  });

  unlockedCount = computed(() => this.storage.progress().achievementsUnlocked.length);

  achievements = computed(() => {
    const unlocked = this.storage.progress().achievementsUnlocked;
    return ACHIEVEMENTS.map(a => ({ ...a, unlocked: unlocked.includes(a.id) }))
      .sort((a, b) => (b.unlocked ? 1 : 0) - (a.unlocked ? 1 : 0));
  });

  rarityLabel(r: string) {
    return { common: 'Thường', rare: 'Hiếm', epic: 'Sử Thi', legendary: 'Huyền Thoại' }[r] ?? r;
  }

  rarityClass(r: string) {
    return {
      common: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400',
      rare: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      epic: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
      legendary: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    }[r] ?? '';
  }
}
