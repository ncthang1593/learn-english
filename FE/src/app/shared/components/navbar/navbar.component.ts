import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';
import { StorageService } from '../../../core/services/storage.service';
import { GamificationService } from '../../../core/services/gamification.service';
import { ProgressBarModule } from 'primeng/progressbar';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ProgressBarModule, BadgeModule, TooltipModule],
  template: `
    <nav class="sticky top-0 z-50 w-full border-b border-subtle glass px-4 py-3">
      <div class="flex items-center justify-between gap-4 max-w-7xl mx-auto">

        <!-- Logo -->
        <a routerLink="/dashboard" class="flex items-center gap-2 shrink-0">
          <div class="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-bold text-lg shadow-glow-primary">
            E
          </div>
          <span class="font-display font-bold text-xl text-gradient hidden sm:block">EnglishUp</span>
        </a>

        <!-- Desktop nav links -->
        <div class="hidden lg:flex items-center gap-1">
          @for (item of navItems; track item.path) {
            <a [routerLink]="item.path" routerLinkActive="bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400"
               class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <span>{{ item.icon }}</span>
              <span>{{ item.label }}</span>
            </a>
          }
        </div>

        <!-- Right side: XP, Streak, Theme -->
        <div class="flex items-center gap-3">

          <!-- XP Bar -->
          <div class="hidden sm:flex flex-col items-end gap-0.5 min-w-28">
            <div class="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span class="font-semibold text-primary-600">{{ storage.progress().totalXP }} XP</span>
              <span>· Cấp {{ storage.xpLevel() }}</span>
            </div>
            <div class="w-28 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div class="h-full xp-bar rounded-full transition-all duration-500"
                   [style.width.%]="storage.xpProgressPercent()">
              </div>
            </div>
          </div>

          <!-- Streak -->
          <div class="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 px-2.5 py-1.5 rounded-xl"
               pTooltip="Streak - Ngày học liên tiếp" tooltipPosition="bottom">
            <span class="streak-fire text-base">🔥</span>
            <span class="font-bold text-amber-600 dark:text-amber-400 text-sm">{{ storage.progress().streak }}</span>
          </div>

          <!-- Theme toggle -->
          <button (click)="theme.toggle()"
                  class="w-9 h-9 rounded-xl border border-subtle flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
            @if (theme.isDark()) {
              <span>☀️</span>
            } @else {
              <span>🌙</span>
            }
          </button>
        </div>
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  theme = inject(ThemeService);
  storage = inject(StorageService);
  gamify = inject(GamificationService);

  navItems = [
    { path: '/dashboard', icon: '🏠', label: 'Trang Chủ' },
    { path: '/learning-path', icon: '🗺️', label: 'Lộ Trình' },
    { path: '/practice', icon: '📝', label: 'Luyện Tập' },
    { path: '/grammar', icon: '📐', label: 'Ngữ Pháp' },
    { path: '/progress', icon: '📊', label: 'Tiến Trình' },
  ];
}
