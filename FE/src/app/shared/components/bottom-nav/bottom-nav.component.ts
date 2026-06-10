import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="fixed bottom-0 left-0 right-0 z-50 glass border-t border-subtle px-2 pb-safe">
      <div class="flex items-center justify-around h-16">
        @for (item of navItems; track item.path) {
          <a [routerLink]="item.path"
             routerLinkActive="text-primary-600 dark:text-primary-400"
             class="flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-slate-400 dark:text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 transition-all">
            <span class="text-xl leading-none">{{ item.icon }}</span>
            <span class="text-xs font-medium">{{ item.label }}</span>
          </a>
        }
      </div>
    </nav>
  `,
  styles: [`
    :host { display: block; }
    .pb-safe { padding-bottom: env(safe-area-inset-bottom, 0); }
  `]
})
export class BottomNavComponent {
  navItems = [
    { path: '/dashboard', icon: '🏠', label: 'Home' },
    { path: '/learning-path', icon: '🗺️', label: 'Lộ Trình' },
    { path: '/practice', icon: '📝', label: 'Luyện Tập' },
    { path: '/grammar', icon: '📐', label: 'Ngữ Pháp' },
    { path: '/progress', icon: '📊', label: 'Tiến Trình' },
  ];
}
