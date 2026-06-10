import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../core/services/storage.service';
import { GRAMMAR_CATEGORIES } from '../../data/grammar.data';
import { GrammarCategory, GrammarTopic } from '../../core/models/grammar.model';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-grammar',
  standalone: true,
  imports: [RouterLink, FormsModule, ProgressBarModule],
  template: `
    <div class="page-enter space-y-6 pb-20 md:pb-6">

      <!-- Header -->
      <div>
        <h1 class="font-display text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-1">
          📐 Ngữ Pháp Tiếng Anh
        </h1>
        <p class="text-slate-500 dark:text-slate-400">Nắm vững ngữ pháp từ cơ bản đến nâng cao, giải thích chi tiết bằng tiếng Việt</p>
      </div>

      <!-- Search + Stats -->
      <div class="flex flex-col sm:flex-row gap-3">
        <div class="relative flex-1">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          <input type="text"
                 [(ngModel)]="searchQuery"
                 placeholder="Tìm kiếm ngữ pháp..."
                 class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900/30 transition-all text-sm" />
        </div>
        <div class="flex items-center gap-2 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800/50 px-4 py-2.5 rounded-xl shrink-0">
          <span class="text-primary-600 font-bold text-sm">📊 {{ readCount() }}/{{ totalTopics }} đã đọc</span>
        </div>
      </div>

      <!-- Progress bar -->
      <p-progressbar [value]="readPercent()" styleClass="h-2 rounded-full" />

      <!-- Categories -->
      @for (category of filteredCategories(); track category.id) {
        <div class="space-y-3">
          <!-- Category header -->
          <button (click)="toggleCategory(category.id)"
                  class="w-full flex items-center gap-4 p-4 rounded-2xl relative overflow-hidden group cursor-pointer hover:shadow-md transition-all">
            <div class="absolute inset-0 opacity-10" [class]="'bg-gradient-to-r ' + category.bgGradient"></div>
            <div class="relative w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg text-white"
                 [class]="'bg-gradient-to-br ' + category.bgGradient">
              {{ category.emoji }}
            </div>
            <div class="relative flex-1 min-w-0 text-left">
              <h2 class="font-display font-bold text-lg text-slate-800 dark:text-white">{{ category.nameVietnamese }}</h2>
              <p class="text-sm text-slate-500 dark:text-slate-400">{{ category.description }}</p>
            </div>
            <div class="relative flex items-center gap-2">
              <span class="text-xs font-semibold text-slate-400">
                {{ getCategoryReadCount(category) }}/{{ category.topics.length }}
              </span>
              <span class="text-slate-400 transition-transform duration-200"
                    [class.rotate-180]="expandedCategories().includes(category.id)">
                ▼
              </span>
            </div>
          </button>

          <!-- Topics grid -->
          @if (expandedCategories().includes(category.id)) {
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pl-4 border-l-2 ml-6 animate-slide-up"
                 [class]="'border-' + (category.id === 'tenses' ? 'blue' : category.id === 'sentence-structure' ? 'emerald' : 'violet') + '-300 dark:border-' + (category.id === 'tenses' ? 'blue' : category.id === 'sentence-structure' ? 'emerald' : 'violet') + '-700'">
              @for (topic of getFilteredTopics(category); track topic.id) {
                <a [routerLink]="['/grammar', topic.id]"
                   class="card p-4 cursor-pointer group hover:border-primary-300 dark:hover:border-primary-700 border border-transparent transition-all"
                   [class.bg-emerald-50]="isRead(topic.id)"
                   [class.dark:bg-emerald-900/10]="isRead(topic.id)">
                  <div class="flex items-start gap-3">
                    <div class="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                         [class]="isRead(topic.id) ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-primary-50 dark:bg-primary-900/20'">
                      {{ topic.emoji }}
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="font-semibold text-sm text-slate-800 dark:text-white group-hover:text-primary-600 transition-colors">
                        {{ topic.titleVietnamese }}
                      </p>
                      <p class="text-xs text-slate-400 mt-0.5">{{ topic.title }}</p>
                      <div class="flex items-center gap-2 mt-2">
                        <span class="text-xs px-2 py-0.5 rounded-full font-medium"
                              [class]="difficultyClass(topic.difficulty)">
                          {{ difficultyLabel(topic.difficulty) }}
                        </span>
                        <span class="text-xs text-slate-400">{{ topic.exercises.length }} bài tập</span>
                      </div>
                    </div>
                    <div class="shrink-0">
                      @if (isRead(topic.id)) {
                        <span class="text-emerald-500 text-lg">✅</span>
                      } @else {
                        <span class="text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      }
                    </div>
                  </div>
                </a>
              }
            </div>
          }
        </div>
      }

      <!-- Empty search state -->
      @if (filteredCategories().length === 0) {
        <div class="text-center py-12 text-slate-400">
          <p class="text-4xl mb-3">🔍</p>
          <p>Không tìm thấy chủ đề ngữ pháp nào cho "{{ searchQuery }}"</p>
        </div>
      }
    </div>
  `,
})
export class GrammarComponent {
  storage = inject(StorageService);
  categories = GRAMMAR_CATEGORIES;

  searchQuery = '';
  expandedCategories = signal<string[]>(['tenses', 'sentence-structure', 'parts-of-speech']);

  totalTopics = this.categories.reduce((sum, c) => sum + c.topics.length, 0);

  readCount = computed(() => {
    const read = this.storage.progress().grammarRead ?? [];
    return read.length;
  });

  readPercent = computed(() => {
    return this.totalTopics > 0 ? Math.round((this.readCount() / this.totalTopics) * 100) : 0;
  });

  filteredCategories = computed(() => {
    const q = this.searchQuery.toLowerCase().trim();
    if (!q) return this.categories;
    return this.categories
      .map(cat => ({
        ...cat,
        topics: cat.topics.filter(t =>
          t.title.toLowerCase().includes(q) ||
          t.titleVietnamese.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
        ),
      }))
      .filter(cat => cat.topics.length > 0);
  });

  getFilteredTopics(category: GrammarCategory) {
    const q = this.searchQuery.toLowerCase().trim();
    if (!q) return category.topics;
    return category.topics.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.titleVietnamese.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q)
    );
  }

  getCategoryReadCount(category: GrammarCategory): number {
    const read = this.storage.progress().grammarRead ?? [];
    return category.topics.filter(t => read.includes(t.id)).length;
  }

  toggleCategory(id: string) {
    this.expandedCategories.update(expanded =>
      expanded.includes(id) ? expanded.filter(x => x !== id) : [...expanded, id]
    );
  }

  isRead(topicId: string): boolean {
    return this.storage.isGrammarRead(topicId);
  }

  difficultyLabel(d: string) {
    return d === 'easy' ? 'Dễ' : d === 'medium' ? 'Trung bình' : 'Khó';
  }

  difficultyClass(d: string) {
    if (d === 'easy') return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
    if (d === 'medium') return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
    return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
  }
}
