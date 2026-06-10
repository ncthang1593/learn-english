import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private _isDark = signal<boolean>(this.loadTheme());

  readonly isDark = this._isDark.asReadonly();

  private loadTheme(): boolean {
    const saved = localStorage.getItem('englishup_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  toggle(): void {
    const newValue = !this._isDark();
    this._isDark.set(newValue);
    localStorage.setItem('englishup_theme', newValue ? 'dark' : 'light');
    this.applyTheme(newValue);
  }

  setDark(dark: boolean): void {
    this._isDark.set(dark);
    localStorage.setItem('englishup_theme', dark ? 'dark' : 'light');
    this.applyTheme(dark);
  }

  applyTheme(dark: boolean): void {
    if (dark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }

  init(): void {
    this.applyTheme(this._isDark());
  }
}
