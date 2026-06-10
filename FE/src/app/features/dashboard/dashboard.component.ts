import { Component, inject, computed, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StorageService } from '../../core/services/storage.service';
import { LessonService } from '../../core/services/lesson.service';
import { GamificationService } from '../../core/services/gamification.service';
import { TtsService } from '../../core/services/tts.service';
import { ProgressBarModule } from 'primeng/progressbar';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, ProgressBarModule, CardModule],
  template: `
    <div class="page-enter space-y-6 pb-20 md:pb-6">

      <!-- Hero greeting -->
      <section class="relative overflow-hidden rounded-2xl bg-gradient-primary p-6 md:p-8 text-white shadow-glow-primary">
        <div class="relative z-10">
          <p class="text-sm font-medium text-primary-200 mb-1">{{ greeting() }}, người học 👋</p>
          <h1 class="font-display text-2xl md:text-3xl font-bold mb-2">
            Tiếp tục hành trình của bạn!
          </h1>
          <p class="text-primary-200 text-sm mb-4">
            Mỗi ngày một chút, tiếng Anh sẽ không còn là nỗi sợ. 💪
          </p>
          @if (suggestedLesson()) {
            <a [routerLink]="['/lesson', suggestedLesson()!.id]"
               class="inline-flex items-center gap-2 bg-white text-primary-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-primary-50 transition-all hover:shadow-lg hover:-translate-y-0.5">
              {{ suggestedLesson()!.emoji }} Học ngay: {{ suggestedLesson()!.titleVietnamese }}
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </a>
          } @else {
            <a routerLink="/learning-path"
               class="inline-flex items-center gap-2 bg-white text-primary-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-primary-50 transition-all">
              🗺️ Xem Lộ Trình
            </a>
          }
        </div>
        <!-- Decorative circles -->
        <div class="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10"></div>
        <div class="absolute -right-4 top-12 w-24 h-24 rounded-full bg-white/10"></div>
      </section>

      <!-- Stats grid -->
      <section>
        <h2 class="text-lg font-display font-bold text-slate-800 dark:text-slate-200 mb-3">📊 Thống Kê Của Bạn</h2>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
          @for (stat of stats(); track stat.label) {
            <div class="card p-4 flex flex-col gap-2">
              <div class="text-2xl">{{ stat.icon }}</div>
              <div class="text-2xl font-display font-bold text-slate-800 dark:text-white">{{ stat.value }}</div>
              <div class="text-xs text-slate-500 dark:text-slate-400 font-medium">{{ stat.label }}</div>
            </div>
          }
        </div>
      </section>

      <!-- Daily goal progress -->
      <section class="card p-5">
        <div class="flex items-center justify-between mb-3">
          <h2 class="font-display font-bold text-slate-800 dark:text-white">🎯 Mục Tiêu Hôm Nay</h2>
          <span class="text-sm font-semibold text-primary-600">{{ todayMinutes() }}/{{ storage.progress().dailyGoalMinutes }} phút</span>
        </div>
        <p-progressbar [value]="dailyGoalPercent()" styleClass="h-3 rounded-full" />
        <p class="text-xs text-slate-400 dark:text-slate-500 mt-2">
          @if (dailyGoalPercent() >= 100) {
            🎉 Tuyệt vời! Bạn đã hoàn thành mục tiêu hôm nay!
          } @else {
            Còn {{ storage.progress().dailyGoalMinutes - todayMinutes() }} phút nữa để đạt mục tiêu!
          }
        </p>
      </section>

      <!-- Word of the day -->
      @if (wordOfDay()) {
        <section class="card p-5">
          <div class="flex items-center gap-2 mb-4">
            <span class="text-xl">📖</span>
            <h2 class="font-display font-bold text-slate-800 dark:text-white">Từ Vựng Hôm Nay</h2>
          </div>
          <div class="flex items-start justify-between gap-4">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="text-2xl font-display font-bold text-primary-600">{{ wordOfDay()!.english }}</span>
                <span class="text-sm text-slate-400 font-mono">{{ wordOfDay()!.pronunciation }}</span>
              </div>
              <p class="text-slate-600 dark:text-slate-300 font-medium mb-2">{{ wordOfDay()!.vietnamese }}</p>
              <div class="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 border border-subtle">
                <p class="text-sm text-slate-700 dark:text-slate-300 italic">
                  "{{ wordOfDay()!.example }}"
                </p>
                <p class="text-xs text-slate-400 mt-1">{{ wordOfDay()!.exampleVietnamese }}</p>
              </div>
            </div>
            <button (click)="speakWord()" title="Nghe phát âm"
                    class="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 flex items-center justify-center text-xl hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-all shrink-0 hover:scale-110">
              🔊
            </button>
          </div>
        </section>
      }

      <!-- Level progress overview -->
      <section>
        <div class="flex items-center justify-between mb-3">
          <h2 class="font-display font-bold text-slate-800 dark:text-white">🏆 Cấp Độ Học</h2>
          <a routerLink="/learning-path" class="text-sm text-primary-600 font-semibold hover:underline">Xem tất cả →</a>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          @for (level of levels(); track level.levelId) {
            <div class="card p-4 cursor-pointer" [class.opacity-50]="!level.unlocked">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-xl"
                     [class]="level.bgClass">
                  {{ level.emoji }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-slate-800 dark:text-white text-sm truncate">{{ level.name }}</p>
                  <p class="text-xs text-slate-400">{{ level.completed }}/{{ level.total }} bài</p>
                </div>
                @if (!level.unlocked) {
                  <span class="text-slate-400">🔒</span>
                }
                @if (level.completed === level.total && level.total > 0) {
                  <span class="text-lg">✅</span>
                }
              </div>
              <p-progressbar [value]="level.percent" styleClass="h-2 rounded-full" />
            </div>
          }
        </div>
      </section>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  storage = inject(StorageService);
  lessonService = inject(LessonService);
  gamify = inject(GamificationService);
  tts = inject(TtsService);

  wordOfDay = computed(() => this.lessonService.getWordOfDay());
  suggestedLesson = computed(() => this.lessonService.getSuggestedLesson());

  greeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Chào buổi sáng';
    if (hour < 18) return 'Chào buổi chiều';
    return 'Chào buổi tối';
  }

  stats = computed(() => {
    const p = this.storage.progress();
    return [
      { icon: '🔥', value: p.streak, label: 'Ngày liên tiếp' },
      { icon: '⚡', value: p.totalXP, label: 'Tổng XP' },
      { icon: '📚', value: p.totalLessonsCompleted, label: 'Bài đã học' },
      { icon: '🔤', value: p.totalWordsLearned, label: 'Từ đã học' },
    ];
  });

  todayMinutes = computed(() => {
    const today = new Date().toISOString().slice(0, 10);
    return this.storage.progress().dailyActivity.find(d => d.date === today)?.minutesStudied ?? 0;
  });

  dailyGoalPercent = computed(() => {
    const goal = this.storage.progress().dailyGoalMinutes;
    if (goal === 0) return 0;
    return Math.min(100, Math.round((this.todayMinutes() / goal) * 100));
  });

  levels = computed(() => {
    return this.lessonService.levels().map(level => {
      const stats = this.lessonService.getLevelStats(level.id);
      const progress = this.storage.progress().levelProgress[level.id];
      return {
        levelId: level.id,
        name: level.nameVietnamese,
        emoji: level.emoji,
        bgClass: `bg-gradient-to-br ${level.bgGradient} text-white`,
        unlocked: progress.unlocked,
        completed: stats?.completed ?? 0,
        total: stats?.total ?? 0,
        percent: stats?.percent ?? 0,
      };
    });
  });

  speakWord() {
    const word = this.wordOfDay();
    if (word) this.tts.speak(word.english);
  }

  constructor() {
    import('@angular/core').then(({ effect }) => {
      effect(() => {
        const levels = this.lessonService.levels();
        if (levels && levels.length > 0) {
          levels.forEach(level => {
            const stats = this.lessonService.getLevelStats(level.id);
            if (stats) {
              this.storage.updateLevelProgress(level.id, stats.completed, stats.total);
            }
          });
        }
      });
    });
  }

  ngOnInit() {
  }
}
