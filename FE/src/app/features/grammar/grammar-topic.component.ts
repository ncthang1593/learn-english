import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StorageService } from '../../core/services/storage.service';
import { TtsService } from '../../core/services/tts.service';
import { GRAMMAR_CATEGORIES } from '../../data/grammar.data';
import { GrammarTopic, GrammarExercise, GrammarExample } from '../../core/models/grammar.model';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-grammar-topic',
  standalone: true,
  imports: [RouterLink, ProgressBarModule],
  template: `
    @if (topic()) {
    <div class="page-enter max-w-3xl mx-auto pb-20 md:pb-6 space-y-6">

      <!-- Header -->
      <div class="flex items-center gap-3">
        <a routerLink="/grammar" class="w-9 h-9 rounded-xl border border-subtle flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">←</a>
        <div class="flex-1">
          <p class="text-xs text-slate-400 mb-0.5">{{ categoryName() }}</p>
          <h1 class="font-display font-bold text-xl text-slate-800 dark:text-white">
            {{ topic()!.emoji }} {{ topic()!.titleVietnamese }}
          </h1>
          <p class="text-xs text-slate-400">{{ topic()!.title }}</p>
        </div>
        <span class="text-xs px-2.5 py-1 rounded-full font-semibold" [class]="difficultyClass(topic()!.difficulty)">
          {{ difficultyLabel(topic()!.difficulty) }}
        </span>
      </div>

      <p class="text-sm text-slate-600 dark:text-slate-300">{{ topic()!.description }}</p>

      <!-- ═══ SECTION 1: KHI NÀO DÙNG ═══ -->
      <section class="card p-5 space-y-3">
        <h2 class="font-display font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <span class="text-lg">📖</span> Khi Nào Dùng?
        </h2>
        <div class="space-y-2">
          @for (usage of topic()!.whenToUse; track usage.description) {
            <div class="flex gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-subtle">
              <span class="text-primary-500 mt-0.5 shrink-0">▸</span>
              <div>
                <p class="text-sm font-medium text-slate-700 dark:text-slate-300">{{ usage.description }}</p>
                @if (usage.example) {
                  <p class="text-xs text-primary-600 dark:text-primary-400 mt-1 italic">"{{ usage.example }}"</p>
                }
              </div>
            </div>
          }
        </div>
      </section>

      <!-- ═══ SECTION 2: CÔNG THỨC ═══ -->
      <section class="space-y-3">
        <h2 class="font-display font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <span class="text-lg">📝</span> Công Thức
        </h2>
        <div class="space-y-2">
          @for (f of topic()!.formulas; track f.label) {
            <div class="p-4 rounded-xl border-2 transition-all"
                 [class]="formulaClass(f.type)">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-base">{{ formulaIcon(f.type) }}</span>
                <span class="font-semibold text-sm">{{ f.label }}</span>
              </div>
              <p class="font-mono text-sm font-bold tracking-wide pl-6">{{ f.formula }}</p>
              @if (f.note) {
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1.5 pl-6">💡 {{ f.note }}</p>
              }
            </div>
          }
        </div>
      </section>

      <!-- ═══ SECTION 3: DẤU HIỆU NHẬN BIẾT ═══ -->
      @if (topic()!.signalWords.length > 0) {
        <section class="card p-5 space-y-3">
          <h2 class="font-display font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <span class="text-lg">🔍</span> Dấu Hiệu Nhận Biết
          </h2>
          <div class="flex flex-wrap gap-2">
            @for (word of topic()!.signalWords; track word) {
              <span class="px-3 py-1.5 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800/50 text-primary-700 dark:text-primary-400 rounded-full text-sm font-medium">
                {{ word }}
              </span>
            }
          </div>
        </section>
      }

      <!-- ═══ SECTION 4: VÍ DỤ MINH HỌA ═══ -->
      <section class="space-y-3">
        <h2 class="font-display font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <span class="text-lg">💡</span> Ví Dụ Minh Họa
        </h2>

        @for (typeGroup of exampleGroups(); track typeGroup.type) {
          <div class="space-y-2">
            <p class="text-xs font-bold uppercase tracking-wider" [class]="exampleTypeColor(typeGroup.type)">
              {{ exampleTypeLabel(typeGroup.type) }}
            </p>
            @for (ex of typeGroup.examples; track ex.english) {
              <div class="flex gap-3 p-3 rounded-xl border transition-all hover:shadow-sm"
                   [class]="exampleBorderClass(ex.type)">
                <div class="flex-1">
                  <p class="text-sm font-medium" [class]="exampleTextColor(ex.type)">
                    {{ ex.english }}
                  </p>
                  <p class="text-xs text-slate-400 mt-0.5">{{ ex.vietnamese }}</p>
                </div>
                <button (click)="tts.speak(ex.english)" title="Nghe phát âm"
                        class="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all shrink-0 hover:scale-110">
                  🔊
                </button>
              </div>
            }
          </div>
        }
      </section>

      <!-- ═══ SECTION 5: LỖI SAI THƯỜNG GẶP ═══ -->
      @if (topic()!.commonMistakes.length > 0) {
        <section class="card p-5 space-y-3">
          <h2 class="font-display font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <span class="text-lg">⚠️</span> Lỗi Sai Thường Gặp
          </h2>
          <div class="space-y-3">
            @for (m of topic()!.commonMistakes; track m.wrong) {
              <div class="rounded-xl border border-subtle overflow-hidden">
                <div class="grid grid-cols-2 divide-x divide-subtle">
                  <div class="p-3 bg-red-50 dark:bg-red-900/10">
                    <p class="text-xs font-bold text-red-500 mb-1">❌ Sai</p>
                    <p class="text-sm text-red-700 dark:text-red-400 line-through">{{ m.wrong }}</p>
                  </div>
                  <div class="p-3 bg-emerald-50 dark:bg-emerald-900/10">
                    <p class="text-xs font-bold text-emerald-500 mb-1">✅ Đúng</p>
                    <p class="text-sm text-emerald-700 dark:text-emerald-400 font-medium">{{ m.correct }}</p>
                  </div>
                </div>
                <div class="px-3 py-2 bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-600 dark:text-slate-400">
                  💡 {{ m.explanation }}
                </div>
              </div>
            }
          </div>
        </section>
      }

      <!-- ═══ SECTION 6: BẢNG SO SÁNH ═══ -->
      @if (topic()!.comparison) {
        <section class="card p-5 space-y-3">
          <h2 class="font-display font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <span class="text-lg">📊</span> {{ topic()!.comparison!.title }}
          </h2>
          <div class="overflow-x-auto rounded-xl border border-subtle">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-slate-50 dark:bg-slate-800">
                  <th class="text-left p-3 font-semibold text-slate-700 dark:text-slate-300 border-b border-subtle">{{ topic()!.comparison!.headers[0] }}</th>
                  <th class="text-left p-3 font-semibold text-slate-700 dark:text-slate-300 border-b border-subtle">{{ topic()!.comparison!.headers[1] }}</th>
                </tr>
              </thead>
              <tbody>
                @for (row of topic()!.comparison!.rows; track row.left) {
                  <tr class="border-b border-subtle last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td class="p-3 text-slate-700 dark:text-slate-300">{{ row.left }}</td>
                    <td class="p-3 text-slate-700 dark:text-slate-300">{{ row.right }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </section>
      }

      <!-- ═══ SECTION 7: MẸO NHỚ ═══ -->
      @if (topic()!.tips.length > 0) {
        <section class="card p-5 space-y-2 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50">
          <h2 class="font-display font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
            <span class="text-lg">💡</span> Mẹo Ghi Nhớ
          </h2>
          @for (tip of topic()!.tips; track tip) {
            <p class="text-sm text-amber-800 dark:text-amber-300">{{ tip }}</p>
          }
        </section>
      }

      <!-- ═══ SECTION 8: BÀI TẬP NHANH ═══ -->
      @if (topic()!.exercises.length > 0) {
        <section class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="font-display font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <span class="text-lg">✏️</span> Bài Tập Nhanh
            </h2>
            <span class="text-sm text-slate-400">{{ exerciseIndex() + 1 }}/{{ topic()!.exercises.length }}</span>
          </div>

          <p-progressbar [value]="exerciseProgressPercent()" styleClass="h-2 rounded-full" />

          @if (!exercisesDone()) {
            @if (currentExercise(); as ex) {
              <div class="card p-5 space-y-4">
                @if (ex.type === 'mcq') {
                  <p class="font-semibold text-slate-800 dark:text-white">{{ ex.question }}</p>
                  <div class="space-y-2">
                    @for (opt of ex.options; track $index; let i = $index) {
                      <button (click)="selectMCQ(i)"
                              [disabled]="exAnswered()"
                              class="w-full text-left p-3.5 rounded-xl border-2 transition-all duration-200 font-medium text-sm"
                              [class]="getMCQClass(i, ex)">
                        <span class="mr-2 font-bold text-slate-400">{{ ['A','B','C','D'][i] }}.</span>
                        {{ opt }}
                      </button>
                    }
                  </div>
                }

                @if (ex.type === 'fill-blank') {
                  <p class="font-semibold text-slate-800 dark:text-white">Điền vào chỗ trống:</p>
                  <p class="text-lg text-slate-600 dark:text-slate-300 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-subtle">
                    {{ ex.sentence }}
                  </p>
                  @if (ex.hint && !exAnswered()) {
                    <p class="text-xs text-amber-600 dark:text-amber-400">💡 Gợi ý: {{ ex.hint }}</p>
                  }
                  <input #fillInput type="text"
                         [value]="fillValue()"
                         (input)="fillValue.set(fillInput.value)"
                         [disabled]="exAnswered()"
                         placeholder="Nhập câu trả lời..."
                         class="w-full p-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:border-primary-400 transition-colors"
                         (keyup.enter)="checkFill(ex)" />
                  @if (!exAnswered()) {
                    <button (click)="checkFill(ex)" class="btn-primary w-full">Kiểm tra</button>
                  }
                }

                <!-- Feedback -->
                @if (exAnswered()) {
                  <div class="p-3 rounded-xl" [class]="exCorrect() ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50'">
                    <p class="font-bold text-sm" [class]="exCorrect() ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'">
                      {{ exCorrect() ? '✅ Chính xác!' : '❌ Chưa đúng!' }}
                    </p>
                    <p class="text-sm text-slate-600 dark:text-slate-300 mt-1">{{ currentExercise()!.explanation }}</p>
                    @if (!exCorrect() && currentExercise()!.type === 'fill-blank') {
                      <p class="text-sm font-semibold text-emerald-600 mt-1">Đáp án: {{ getFillAnswer() }}</p>
                    }
                  </div>
                  <button (click)="nextExercise()" class="btn-primary w-full">
                    {{ exerciseIndex() < topic()!.exercises.length - 1 ? 'Câu tiếp →' : '🏆 Hoàn thành' }}
                  </button>
                }
              </div>
            }
          } @else {
            <div class="card p-6 text-center">
              <div class="text-4xl mb-3">{{ exerciseScore() >= 80 ? '🏆' : exerciseScore() >= 60 ? '🎉' : '💪' }}</div>
              <p class="font-display text-xl font-bold text-slate-800 dark:text-white mb-1">
                {{ exerciseScore() >= 80 ? 'Xuất sắc!' : exerciseScore() >= 60 ? 'Tốt lắm!' : 'Cần ôn thêm!' }}
              </p>
              <p class="text-3xl font-bold text-primary-600 my-2">{{ exerciseScore() }}%</p>
              <p class="text-sm text-slate-400">{{ correctCount() }}/{{ topic()!.exercises.length }} câu đúng</p>
              <button (click)="restartExercises()" class="btn-outline mt-4">🔄 Làm lại</button>
            </div>
          }
        </section>
      }

      <!-- ═══ MARK AS READ + NAVIGATION ═══ -->
      <div class="space-y-3 pt-4 border-t border-subtle">
        @if (!isRead()) {
          <button (click)="markAsRead()" class="btn-primary w-full flex items-center justify-center gap-2">
            ✅ Đánh dấu đã đọc
          </button>
        } @else {
          <div class="text-center text-emerald-600 dark:text-emerald-400 font-semibold text-sm py-2">
            ✅ Bạn đã đọc chủ đề này
          </div>
        }

        <div class="flex gap-3">
          @if (prevTopic()) {
            <a [routerLink]="['/grammar', prevTopic()!.id]" class="flex-1 btn-ghost border border-subtle text-center text-sm">
              ← {{ prevTopic()!.titleVietnamese }}
            </a>
          } @else {
            <div class="flex-1"></div>
          }
          @if (nextTopic()) {
            <a [routerLink]="['/grammar', nextTopic()!.id]" class="flex-1 btn-primary text-center text-sm">
              {{ nextTopic()!.titleVietnamese }} →
            </a>
          }
        </div>
      </div>

    </div>
    } @else {
      <div class="text-center py-20 text-slate-400">
        <p class="text-4xl mb-4">😕</p>
        <p>Không tìm thấy chủ đề ngữ pháp này.</p>
        <a routerLink="/grammar" class="btn-primary mt-4 inline-block">← Về Ngữ Pháp</a>
      </div>
    }
  `,
})
export class GrammarTopicComponent implements OnInit {
  route = inject(ActivatedRoute);
  storage = inject(StorageService);
  tts = inject(TtsService);

  topic = signal<GrammarTopic | null>(null);
  categoryName = signal('');

  // Exercises state
  exerciseIndex = signal(0);
  exAnswered = signal(false);
  exCorrect = signal(false);
  selectedMCQ = signal<number | null>(null);
  fillValue = signal('');
  correctCount = signal(0);
  exercisesDone = signal(false);

  currentExercise = computed(() => this.topic()?.exercises[this.exerciseIndex()] ?? null);
  exerciseProgressPercent = computed(() => {
    const total = this.topic()?.exercises.length ?? 1;
    return Math.round((this.exerciseIndex() / total) * 100);
  });
  exerciseScore = computed(() => {
    const total = this.topic()?.exercises.length ?? 1;
    return Math.round((this.correctCount() / total) * 100);
  });

  // All topics flat for navigation
  private allTopics = GRAMMAR_CATEGORIES.flatMap(c => c.topics);

  prevTopic = computed(() => {
    const t = this.topic();
    if (!t) return null;
    const idx = this.allTopics.findIndex(x => x.id === t.id);
    return idx > 0 ? this.allTopics[idx - 1] : null;
  });

  nextTopic = computed(() => {
    const t = this.topic();
    if (!t) return null;
    const idx = this.allTopics.findIndex(x => x.id === t.id);
    return idx < this.allTopics.length - 1 ? this.allTopics[idx + 1] : null;
  });

  exampleGroups = computed(() => {
    const t = this.topic();
    if (!t) return [];
    const groups: { type: string; examples: GrammarExample[] }[] = [];
    const types = ['affirmative', 'negative', 'question'];
    for (const type of types) {
      const examples = t.examples.filter(e => e.type === type);
      if (examples.length > 0) groups.push({ type, examples });
    }
    return groups;
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.loadTopic(id);

    // Subscribe to param changes for prev/next nav
    this.route.paramMap.subscribe(params => {
      const newId = params.get('id')!;
      this.loadTopic(newId);
      this.restartExercises();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  private loadTopic(id: string) {
    for (const cat of GRAMMAR_CATEGORIES) {
      const topic = cat.topics.find(t => t.id === id);
      if (topic) {
        this.topic.set(topic);
        this.categoryName.set(cat.nameVietnamese);
        return;
      }
    }
    this.topic.set(null);
  }

  isRead() { return this.storage.isGrammarRead(this.topic()?.id ?? ''); }
  markAsRead() {
    if (this.topic()) {
      this.storage.markGrammarRead(this.topic()!.id);
      this.storage.updateStreak();
    }
  }

  // Exercise logic
  selectMCQ(i: number) {
    if (this.exAnswered()) return;
    this.selectedMCQ.set(i);
    const ex = this.currentExercise();
    if (ex?.type !== 'mcq') return;
    const correct = i === ex.correctIndex;
    this.exCorrect.set(correct);
    if (correct) this.correctCount.update(v => v + 1);
    this.exAnswered.set(true);
  }

  getFillAnswer(): string {
    const ex = this.currentExercise();
    if (ex?.type === 'fill-blank') return (ex as any).answer;
    return '';
  }

  checkFill(ex: any) {
    const correct = this.fillValue().trim().toLowerCase() === ex.answer.toLowerCase();
    this.exCorrect.set(correct);
    if (correct) this.correctCount.update(v => v + 1);
    this.exAnswered.set(true);
  }

  getMCQClass(i: number, ex: any): string {
    if (!this.exAnswered()) return 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary-400 hover:bg-primary-50';
    if (i === ex.correctIndex) return 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400';
    if (i === this.selectedMCQ() && !this.exCorrect()) return 'border-red-400 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400';
    return 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400 opacity-60';
  }

  nextExercise() {
    if (this.exerciseIndex() < (this.topic()?.exercises.length ?? 0) - 1) {
      this.exerciseIndex.update(v => v + 1);
      this.exAnswered.set(false);
      this.exCorrect.set(false);
      this.selectedMCQ.set(null);
      this.fillValue.set('');
    } else {
      this.exercisesDone.set(true);
    }
  }

  restartExercises() {
    this.exerciseIndex.set(0);
    this.exAnswered.set(false);
    this.exCorrect.set(false);
    this.selectedMCQ.set(null);
    this.fillValue.set('');
    this.correctCount.set(0);
    this.exercisesDone.set(false);
  }

  // Style helpers
  formulaIcon(type: string) { return type === 'affirmative' ? '✅' : type === 'negative' ? '❌' : '❓'; }
  formulaClass(type: string) {
    if (type === 'affirmative') return 'border-emerald-300 dark:border-emerald-800/50 bg-emerald-50 dark:bg-emerald-900/10';
    if (type === 'negative') return 'border-red-300 dark:border-red-800/50 bg-red-50 dark:bg-red-900/10';
    return 'border-blue-300 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-900/10';
  }

  exampleTypeLabel(type: string) { return type === 'affirmative' ? '✅ Khẳng định' : type === 'negative' ? '❌ Phủ định' : '❓ Nghi vấn'; }
  exampleTypeColor(type: string) {
    if (type === 'affirmative') return 'text-emerald-600 dark:text-emerald-400';
    if (type === 'negative') return 'text-red-600 dark:text-red-400';
    return 'text-blue-600 dark:text-blue-400';
  }
  exampleTextColor(type: string) {
    if (type === 'affirmative') return 'text-emerald-700 dark:text-emerald-400';
    if (type === 'negative') return 'text-red-700 dark:text-red-400';
    return 'text-blue-700 dark:text-blue-400';
  }
  exampleBorderClass(type: string) {
    if (type === 'affirmative') return 'border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/50 dark:bg-emerald-900/5';
    if (type === 'negative') return 'border-red-200 dark:border-red-800/50 bg-red-50/50 dark:bg-red-900/5';
    return 'border-blue-200 dark:border-blue-800/50 bg-blue-50/50 dark:bg-blue-900/5';
  }

  difficultyLabel(d: string) { return d === 'easy' ? 'Dễ' : d === 'medium' ? 'Trung bình' : 'Khó'; }
  difficultyClass(d: string) {
    if (d === 'easy') return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
    if (d === 'medium') return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
    return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
  }
}
