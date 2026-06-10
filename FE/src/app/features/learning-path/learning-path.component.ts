import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LessonService } from '../../core/services/lesson.service';
import { StorageService } from '../../core/services/storage.service';
import { ProgressBarModule } from 'primeng/progressbar';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-learning-path',
  standalone: true,
  imports: [RouterLink, ProgressBarModule, TooltipModule],
  template: `
    <div class="page-enter space-y-8 pb-20 md:pb-6">
      <div>
        <h1 class="font-display text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-1">
          🗺️ Lộ Trình Học
        </h1>
        <p class="text-slate-500 dark:text-slate-400">Học theo thứ tự từ cơ bản đến nâng cao. Hoàn thành cấp trước để mở khoá cấp tiếp theo.</p>
      </div>

      @for (level of levelsWithProgress(); track level.id) {
        <div class="space-y-4">
          <!-- Level header -->
          <div class="flex items-center gap-4 p-5 rounded-2xl relative overflow-hidden"
               [class.opacity-60]="!level.unlocked">
            <div class="absolute inset-0 bg-gradient-to-r opacity-10" [class]="level.bgGradient"></div>
            <div class="relative w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-lg"
                 [class]="'bg-gradient-to-br ' + level.bgGradient">
              {{ level.emoji }}
            </div>
            <div class="relative flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-0.5">
                <h2 class="font-display font-bold text-xl text-slate-800 dark:text-white">{{ level.nameVietnamese }}</h2>
                @if (!level.unlocked) { <span class="text-base">🔒</span> }
                @if (level.completed) { <span class="level-badge bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">✅ Hoàn thành</span> }
              </div>
              <p class="text-sm text-slate-500 dark:text-slate-400 mb-2">{{ level.description }}</p>
              <div class="flex items-center gap-3">
                <p-progressbar [value]="level.percent" styleClass="h-2 rounded-full flex-1" />
                <span class="text-xs font-semibold text-slate-500 shrink-0">{{ level.stats.completed }}/{{ level.stats.total }}</span>
              </div>
            </div>
          </div>

          <!-- Lessons grid -->
          @if (level.unlocked) {
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pl-4 border-l-2 border-slate-200 dark:border-slate-700 ml-7">
              @for (lesson of level.lessons; track lesson.id) {
                @if (isUnlocked(lesson.id)) {
                    <a [routerLink]="['/lesson', lesson.id]"
                       class="card p-4 cursor-pointer group animate-slide-up"
                       [class.bg-emerald-50]="isCompleted(lesson.id) && !isDark()"
                       [class.dark:bg-emerald-900/10]="isCompleted(lesson.id)">
                      <div class="flex items-start gap-3">
                        <div class="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                             [class]="isCompleted(lesson.id) ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-primary-50 dark:bg-primary-900/20'">
                          {{ lesson.emoji }}
                        </div>
                        <div class="flex-1 min-w-0">
                          <p class="font-semibold text-sm text-slate-800 dark:text-white group-hover:text-primary-600 transition-colors truncate">
                            {{ lesson.titleVietnamese }}
                          </p>
                          <p class="text-xs text-slate-400 mt-0.5 truncate">{{ lesson.title }}</p>
                          <div class="flex items-center gap-2 mt-2">
                            <span class="text-xs px-2 py-0.5 rounded-full font-medium"
                                  [class]="difficultyClass(lesson.difficulty)">
                              {{ difficultyLabel(lesson.difficulty) }}
                            </span>
                            <span class="text-xs text-slate-400">⏱️ {{ lesson.estimatedMinutes }}p</span>
                            <span class="text-xs text-amber-500">⚡ {{ lesson.xpReward }}XP</span>
                          </div>
                        </div>
                        <div class="flex flex-col items-center gap-1 shrink-0">
                          @if (isCompleted(lesson.id)) {
                            <div class="star-rating">
                              @for (s of [1,2,3]; track s) {
                                <span class="star" [class.earned]="s <= getStars(lesson.id)">⭐</span>
                              }
                            </div>
                          } @else {
                            <span class="text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                          }
                        </div>
                      </div>
                    </a>
                  } @else {
                    <div class="card p-4 opacity-50 cursor-not-allowed"
                         pTooltip="Hoàn thành bài trước để mở khoá" tooltipPosition="top">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl grayscale">
                          {{ lesson.emoji }}
                        </div>
                        <div>
                          <p class="font-semibold text-sm text-slate-500 truncate">{{ lesson.titleVietnamese }}</p>
                          <p class="text-xs text-slate-400 mt-0.5">🔒 Chưa mở khoá</p>
                        </div>
                      </div>
                    </div>
                  }
              }
            </div>
          } @else {
            <div class="ml-7 p-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-center text-slate-400 text-sm">
              🔒 Hoàn thành cấp trước để mở khoá cấp này
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class LearningPathComponent {
  lessonService = inject(LessonService);
  storage = inject(StorageService);

  levelsWithProgress = computed(() => {
    return this.lessonService.levels().map(level => {
      const stats = this.lessonService.getLevelStats(level.id)!;
      const progress = this.storage.progress().levelProgress[level.id];
      return {
        ...level,
        unlocked: progress.unlocked,
        completed: progress.completed,
        percent: stats.percent,
        stats,
      };
    });
  });

  isUnlocked(lessonId: string) { return this.lessonService.isLessonUnlocked(lessonId); }
  isCompleted(lessonId: string) { return this.storage.progress().lessonProgress[lessonId]?.completed ?? false; }
  getStars(lessonId: string) { return this.storage.progress().lessonProgress[lessonId]?.stars ?? 0; }
  isDark() { return document.body.classList.contains('dark'); }

  difficultyLabel(d: string) {
    return d === 'easy' ? 'Dễ' : d === 'medium' ? 'Trung bình' : 'Khó';
  }

  difficultyClass(d: string) {
    if (d === 'easy') return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
    if (d === 'medium') return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
    return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
  }
}
