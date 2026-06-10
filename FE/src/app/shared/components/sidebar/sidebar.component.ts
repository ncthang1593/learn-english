import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { StorageService } from '../../../core/services/storage.service';
import { GamificationService } from '../../../core/services/gamification.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar flex flex-col border-r border-subtle bg-white dark:bg-slate-900 h-screen sticky top-0 overflow-y-auto">
      <!-- Logo area (matches navbar height) -->
      <div class="h-[57px] flex items-center px-4 border-b border-subtle shrink-0">
        <div class="w-8 h-8 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-bold text-sm shadow-glow-primary">
          E
        </div>
        <span class="ml-2 font-display font-bold text-lg text-gradient">EnglishUp</span>
      </div>

      <!-- Nav items -->
      <nav class="flex-1 p-3 space-y-1">
        @for (item of navItems; track item.path) {
          <a [routerLink]="item.path"
             routerLinkActive="bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 border-l-2 border-primary-500"
             [routerLinkActiveOptions]="{exact: item.exact ?? false}"
             class="sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-150 group font-medium text-sm">
            <span class="text-xl group-hover:scale-110 transition-transform duration-150">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </a>
        }
      </nav>

      <!-- User stats at bottom -->
      <div class="p-4 border-t border-subtle space-y-3 shrink-0">
        <!-- Level badge -->
        <div class="flex items-center gap-2 px-3 py-2 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
          <div class="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xs font-bold">
            {{ storage.xpLevel() }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-semibold text-primary-700 dark:text-primary-400 truncate">{{ levelName() }}</p>
            <div class="w-full h-1.5 bg-primary-100 dark:bg-primary-900 rounded-full mt-1">
              <div class="h-full bg-gradient-primary rounded-full transition-all duration-500"
                   [style.width.%]="storage.xpProgressPercent()">
              </div>
            </div>
          </div>
        </div>

        <!-- Stats row -->
        <div class="grid grid-cols-3 gap-2 text-center">
          <div class="bg-slate-50 dark:bg-slate-800 rounded-lg p-2">
            <p class="text-xs font-bold text-amber-500">🔥 {{ storage.progress().streak }}</p>
            <p class="text-xs text-slate-400 mt-0.5">Streak</p>
          </div>
          <div class="bg-slate-50 dark:bg-slate-800 rounded-lg p-2">
            <p class="text-xs font-bold text-primary-500">⚡ {{ storage.progress().totalXP }}</p>
            <p class="text-xs text-slate-400 mt-0.5">XP</p>
          </div>
          <div class="bg-slate-50 dark:bg-slate-800 rounded-lg p-2">
            <p class="text-xs font-bold text-emerald-500">📚 {{ storage.progress().totalLessonsCompleted }}</p>
            <p class="text-xs text-slate-400 mt-0.5">Bài</p>
          </div>
        </div>
      </div>
    </aside>
  `,
  styles: [`
    :host { display: flex; }
    .sidebar { width: 220px; }
  `]
})
export class SidebarComponent {
  storage = inject(StorageService);
  gamify = inject(GamificationService);

  navItems = [
    { path: '/dashboard', icon: '🏠', label: 'Trang Chủ', exact: true },
    { path: '/learning-path', icon: '🗺️', label: 'Lộ Trình' },
    { path: '/practice', icon: '📝', label: 'Luyện Tập' },
    { path: '/grammar', icon: '📐', label: 'Ngữ Pháp' },
    { path: '/progress', icon: '📊', label: 'Tiến Trình' },
    { path: '/settings', icon: '⚙️', label: 'Cài Đặt' },
  ];

  levelName() {
    return this.gamify.getLevelName(this.storage.xpLevel());
  }
}
