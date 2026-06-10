import { Component, inject, signal } from '@angular/core';
import { StorageService } from '../../core/services/storage.service';
import { ThemeService } from '../../core/services/theme.service';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [SliderModule, FormsModule],
  template: `
    <div class="page-enter space-y-6 pb-20 md:pb-6 max-w-2xl mx-auto">
      <div>
        <h1 class="font-display text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-1">⚙️ Cài Đặt</h1>
        <p class="text-slate-500 dark:text-slate-400">Tuỳ chỉnh trải nghiệm học tập của bạn</p>
      </div>

      <!-- Appearance -->
      <div class="card p-5 space-y-4">
        <h2 class="font-display font-semibold text-slate-800 dark:text-white">🎨 Giao Diện</h2>

        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-sm text-slate-700 dark:text-slate-300">Chế độ tối</p>
            <p class="text-xs text-slate-400">Giảm mỏi mắt khi học buổi tối</p>
          </div>
          <button (click)="theme.toggle()"
                  class="relative w-12 h-6 rounded-full transition-colors duration-200"
                  [class]="theme.isDark() ? 'bg-primary-600' : 'bg-slate-300'">
            <div class="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200"
                 [class]="theme.isDark() ? 'translate-x-6' : 'translate-x-0.5'">
            </div>
          </button>
        </div>
      </div>

      <!-- Daily Goal -->
      <div class="card p-5 space-y-4">
        <h2 class="font-display font-semibold text-slate-800 dark:text-white">🎯 Mục Tiêu Hàng Ngày</h2>
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <p class="font-medium text-sm text-slate-700 dark:text-slate-300">Thời gian học mỗi ngày</p>
            <span class="font-bold text-primary-600">{{ dailyGoal() }} phút</span>
          </div>
          <div class="grid grid-cols-4 gap-2">
            @for (goal of goalOptions; track goal) {
              <button (click)="setGoal(goal)"
                      class="py-2 rounded-xl text-sm font-semibold transition-all"
                      [class]="dailyGoal() === goal ? 'bg-primary-600 text-white shadow-glow-primary' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-primary-900/20'">
                {{ goal }}p
              </button>
            }
          </div>
        </div>
      </div>

      <!-- Data Management -->
      <div class="card p-5 space-y-4">
        <h2 class="font-display font-semibold text-slate-800 dark:text-white">💾 Dữ Liệu</h2>

        <!-- Export -->
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-sm text-slate-700 dark:text-slate-300">Xuất dữ liệu</p>
            <p class="text-xs text-slate-400">Lưu tiến trình ra file JSON</p>
          </div>
          <button (click)="exportData()" class="px-4 py-2 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 border border-primary-200 dark:border-primary-800/50 text-sm font-medium hover:bg-primary-100 transition-all">
            📥 Xuất
          </button>
        </div>

        <!-- Import -->
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-sm text-slate-700 dark:text-slate-300">Nhập dữ liệu</p>
            <p class="text-xs text-slate-400">Khôi phục từ file JSON</p>
          </div>
          <label class="px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 text-sm font-medium hover:bg-emerald-100 transition-all cursor-pointer">
            📤 Nhập
            <input type="file" accept=".json" (change)="importData($event)" class="hidden" />
          </label>
        </div>

        @if (importMsg()) {
          <div class="p-3 rounded-xl text-sm" [class]="importSuccess() ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'">
            {{ importMsg() }}
          </div>
        }
      </div>

      <!-- Stats summary -->
      <div class="card p-5 space-y-3">
        <h2 class="font-display font-semibold text-slate-800 dark:text-white">📊 Tóm Tắt</h2>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-slate-500 dark:text-slate-400">Tổng XP tích lũy</span>
            <span class="font-semibold text-primary-600">{{ storage.progress().totalXP }} XP</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500 dark:text-slate-400">Cấp hiện tại</span>
            <span class="font-semibold text-slate-800 dark:text-white">Cấp {{ storage.xpLevel() }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500 dark:text-slate-400">Streak dài nhất</span>
            <span class="font-semibold text-amber-500">{{ storage.progress().longestStreak }} ngày 🔥</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500 dark:text-slate-400">Bắt đầu học</span>
            <span class="font-semibold text-slate-800 dark:text-white">{{ formatDate(storage.progress().createdAt) }}</span>
          </div>
        </div>
      </div>

      <!-- Reset -->
      <div class="card p-5 border border-red-200 dark:border-red-900/50">
        <h2 class="font-display font-semibold text-red-600 dark:text-red-400 mb-2">⚠️ Nguy Hiểm</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 mb-3">Xoá tất cả tiến trình học. Hành động này không thể hoàn tác!</p>
        @if (!confirmReset()) {
          <button (click)="confirmReset.set(true)" class="px-4 py-2 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/50 text-sm font-medium hover:bg-red-100 transition-all">
            🗑️ Đặt lại tiến trình
          </button>
        } @else {
          <div class="flex gap-3">
            <button (click)="confirmReset.set(false)" class="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
              Huỷ
            </button>
            <button (click)="resetProgress()" class="flex-1 py-2 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition-all">
              Xác nhận xoá!
            </button>
          </div>
        }
      </div>
    </div>
  `,
})
export class SettingsComponent {
  storage = inject(StorageService);
  theme = inject(ThemeService);

  goalOptions = [5, 10, 15, 20];
  dailyGoal = () => this.storage.progress().dailyGoalMinutes;
  confirmReset = signal(false);
  importMsg = signal('');
  importSuccess = signal(false);

  setGoal(minutes: number) {
    this.storage.setDailyGoal(minutes);
  }

  exportData() {
    const json = this.storage.exportData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `englishup-backup-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  importData(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const json = e.target?.result as string;
      const success = this.storage.importData(json);
      this.importSuccess.set(success);
      this.importMsg.set(success ? '✅ Nhập dữ liệu thành công!' : '❌ File không hợp lệ!');
      setTimeout(() => this.importMsg.set(''), 4000);
    };
    reader.readAsText(file);
  }

  resetProgress() {
    this.storage.resetProgress();
    this.confirmReset.set(false);
    window.location.reload();
  }

  formatDate(iso: string) {
    if (!iso) return 'N/A';
    return new Date(iso).toLocaleDateString('vi-VN');
  }
}
