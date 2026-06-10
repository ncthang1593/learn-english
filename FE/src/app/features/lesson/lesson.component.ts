import { Component, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LessonService } from '../../core/services/lesson.service';
import { StorageService } from '../../core/services/storage.service';
import { GamificationService } from '../../core/services/gamification.service';
import { TtsService } from '../../core/services/tts.service';
import { Lesson, Exercise, VocabularyWord } from '../../core/models/lesson.model';
import { MessageService } from 'primeng/api';
import { ProgressBarModule } from 'primeng/progressbar';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

type Phase = 'theory' | 'vocabulary' | 'exercises' | 'result';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [RouterLink, ProgressBarModule, DialogModule, ButtonModule],
  template: `
    @if (lesson()) {
    <div class="page-enter max-w-3xl mx-auto pb-20 md:pb-6">

      <!-- Header -->
      <div class="flex items-center gap-3 mb-6">
        <a routerLink="/learning-path" class="w-9 h-9 rounded-xl border border-subtle flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
          ←
        </a>
        <div class="flex-1">
          <h1 class="font-display font-bold text-lg text-slate-800 dark:text-white">
            {{ lesson()!.emoji }} {{ lesson()!.titleVietnamese }}
          </h1>
          <p class="text-xs text-slate-400">{{ lesson()!.title }}</p>
        </div>
        <div class="flex items-center gap-2 text-xs">
          <span class="text-amber-500 font-bold">⚡ {{ lesson()!.xpReward }} XP</span>
          <span class="text-slate-400">⏱️ {{ lesson()!.estimatedMinutes }}p</span>
        </div>
      </div>

      <!-- Phase progress -->
      <div class="flex gap-2 mb-6">
        @for (p of phases; track p.key) {
          <div class="flex-1 h-2 rounded-full transition-all duration-300"
               [class]="currentPhase() === p.key ? 'bg-primary-500' : isPhaseComplete(p.key) ? 'bg-emerald-400' : 'bg-slate-200 dark:bg-slate-700'">
          </div>
        }
      </div>

      <!-- PHASE: Theory -->
      @if (currentPhase() === 'theory') {
        <div class="space-y-4 animate-fade-in">
          <h2 class="font-display text-xl font-bold text-slate-800 dark:text-white">📖 Lý Thuyết</h2>
          @for (t of lesson()!.theory; track t.title) {
            <div class="card p-5 space-y-4">
              <h3 class="font-semibold text-primary-600">{{ t.title }}</h3>
              <div class="prose prose-sm dark:prose-invert max-w-none text-slate-700 dark:text-slate-300" [innerHTML]="t.content"></div>
              @if (t.tip) {
                <div class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl p-3 text-sm text-amber-800 dark:text-amber-300">
                  {{ t.tip }}
                </div>
              }
              <div class="space-y-2">
                @for (ex of t.examples; track ex.english) {
                  <div class="flex gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-subtle">
                    <div class="flex-1">
                      <p class="font-medium text-sm text-slate-800 dark:text-white">{{ ex.english }}</p>
                      <p class="text-xs text-slate-400 mt-0.5">{{ ex.vietnamese }}</p>
                    </div>
                    <button (click)="tts.speak(ex.english)" class="text-xl hover:scale-110 transition-transform">🔊</button>
                  </div>
                }
              </div>
            </div>
          }
          <button (click)="nextPhase()" class="btn-primary w-full">
            Tiếp theo: Từ vựng →
          </button>
        </div>
      }

      <!-- PHASE: Vocabulary -->
      @if (currentPhase() === 'vocabulary') {
        <div class="space-y-4 animate-fade-in">
          <h2 class="font-display text-xl font-bold text-slate-800 dark:text-white">🎯 Từ Vựng ({{ vocabIndex() + 1 }}/{{ lesson()!.vocabulary.length }})</h2>

          @if (lesson()!.vocabulary[vocabIndex()]; as word) {
            <div class="card p-6 text-center space-y-4">
              <div class="flex justify-center">
                <div class="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center text-4xl text-white shadow-glow-primary animate-float">
                  {{ getWordEmoji(word) }}
                </div>
              </div>
              <div>
                <p class="text-3xl font-display font-bold text-primary-600 mb-1">{{ word.english }}</p>
                @if (word.pronunciation) {
                  <p class="text-slate-400 font-mono text-sm mb-2">{{ word.pronunciation }}</p>
                }
                <p class="text-xl font-semibold text-slate-700 dark:text-slate-300">{{ word.vietnamese }}</p>
              </div>
              <div class="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-subtle text-left">
                <p class="text-sm italic text-slate-700 dark:text-slate-300">"{{ word.example }}"</p>
                <p class="text-xs text-slate-400 mt-1">{{ word.exampleVietnamese }}</p>
              </div>
              <div class="flex gap-3 justify-center">
                <button (click)="tts.speak(word.english)" class="btn-outline flex items-center gap-2">
                  🔊 Phát âm
                </button>
                <button (click)="tts.speakSlow(word.english)" class="btn-ghost flex items-center gap-2 border border-subtle">
                  🐢 Chậm
                </button>
              </div>
            </div>
          }

          <div class="flex gap-3">
            @if (vocabIndex() > 0) {
              <button (click)="prevVocab()" class="btn-ghost flex-1 border border-subtle">← Trước</button>
            }
            @if (vocabIndex() < lesson()!.vocabulary.length - 1) {
              <button (click)="nextVocab()" class="btn-primary flex-1">Tiếp →</button>
            } @else {
              <button (click)="nextPhase()" class="btn-primary flex-1">🎯 Bắt đầu bài tập →</button>
            }
          </div>
        </div>
      }

      <!-- PHASE: Exercises -->
      @if (currentPhase() === 'exercises') {
        <div class="space-y-4 animate-fade-in">
          <div class="flex items-center justify-between">
            <h2 class="font-display text-xl font-bold text-slate-800 dark:text-white">✏️ Bài Tập</h2>
            <span class="text-sm text-slate-400">{{ exerciseIndex() + 1 }}/{{ lesson()!.exercises.length }}</span>
          </div>
          <p-progressbar [value]="exerciseProgress()" styleClass="h-2 rounded-full" />

          @if (currentExercise(); as ex) {
            <div class="card p-6">
              <!-- MCQ -->
              @if (ex.type === 'mcq') {
                <p class="font-semibold text-slate-800 dark:text-white mb-4">{{ ex.question }}</p>
                <div class="space-y-2">
                  @for (opt of ex.options; track $index; let i = $index) {
                    <button (click)="selectAnswer(i)"
                            [disabled]="answered()"
                            class="w-full text-left p-4 rounded-xl border-2 transition-all duration-200 font-medium text-sm"
                            [class]="getOptionClass(i)">
                      <span class="mr-2 font-bold text-slate-400">{{ optionLabel(i) }}.</span>
                      {{ opt }}
                    </button>
                  }
                </div>
              }

              <!-- Fill Blank -->
              @if (ex.type === 'fill-blank') {
                <p class="font-semibold text-slate-800 dark:text-white mb-2">Điền vào chỗ trống:</p>
                <p class="text-lg text-slate-600 dark:text-slate-300 mb-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-subtle">
                  {{ formatBlankSentence(ex.sentence, fillAnswer()) }}
                </p>
                @if (ex.hint && !answered()) {
                  <p class="text-xs text-amber-600 dark:text-amber-400 mb-3">💡 Gợi ý: {{ ex.hint }}</p>
                }
                <input #fillInput
                       type="text"
                       [value]="fillAnswer()"
                       (input)="fillAnswer.set(fillInput.value)"
                       [disabled]="answered()"
                       placeholder="Nhập câu trả lời..."
                       class="w-full p-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:border-primary-400 transition-colors"
                       (keyup.enter)="checkFillBlank(ex)" />
                @if (!answered()) {
                  <button (click)="checkFillBlank(ex)" class="btn-primary w-full mt-3">Kiểm tra</button>
                }
              }

              <!-- Matching -->
              @if (ex.type === 'matching') {
                <p class="font-semibold text-slate-800 dark:text-white mb-4">{{ ex.instruction }}</p>
                <div class="grid grid-cols-2 gap-3">
                  <div class="space-y-2">
                    @for (pair of ex.pairs; track pair.left; let i = $index) {
                      <button (click)="selectLeft(i)"
                              class="w-full p-3 rounded-xl border-2 text-sm font-medium text-left transition-all"
                              [class]="getLeftClass(i)">{{ pair.left }}</button>
                    }
                  </div>
                  <div class="space-y-2">
                    @for (right of shuffledRights(); track right; let i = $index) {
                      <button (click)="selectRight(right)"
                              [disabled]="isRightMatched(right)"
                              class="w-full p-3 rounded-xl border-2 text-sm font-medium text-left transition-all"
                              [class]="getRightClass(right)">{{ right }}</button>
                    }
                  </div>
                </div>
                @if (!answered() && matchingComplete()) {
                  <button (click)="checkMatching(ex)" class="btn-primary w-full mt-3">Kiểm tra</button>
                }
              }

              <!-- Ordering -->
              @if (ex.type === 'ordering') {
                <p class="font-semibold text-slate-800 dark:text-white mb-2">{{ ex.instruction }}</p>
                <p class="text-sm text-slate-400 mb-3">🇻🇳 {{ ex.vietnamese }}</p>

                <!-- Drop zone (arranged words) -->
                <div class="drop-zone mb-4 min-h-12" [class.drag-over]="false">
                  @if (arrangedWords().length === 0) {
                    <span class="text-slate-400 text-sm">Kéo từ bên dưới vào đây...</span>
                  }
                  @for (w of arrangedWords(); track w + $index) {
                    <button (click)="removeFromArranged(w)" class="word-chip bg-primary-100 text-primary-700">
                      {{ w }} ✕
                    </button>
                  }
                </div>

                <!-- Word bank -->
                <div class="flex flex-wrap gap-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-600">
                  @for (w of availableWords(); track w + $index) {
                    <button (click)="addToArranged(w)" class="word-chip">{{ w }}</button>
                  }
                </div>

                @if (!answered() && arrangedWords().length === ex.words.length) {
                  <button (click)="checkOrdering(ex)" class="btn-primary w-full mt-3">Kiểm tra</button>
                }
              }

              <!-- Answer feedback -->
              @if (answered()) {
                <div class="mt-4 p-4 rounded-xl" [class]="isCorrect() ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50'">
                  <p class="font-bold mb-1" [class]="isCorrect() ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'">
                    {{ isCorrect() ? '✅ Chính xác!' : '❌ Chưa đúng!' }}
                  </p>
                  @if (currentExercise()?.type === 'mcq' || currentExercise()?.type === 'fill-blank') {
                    <p class="text-sm text-slate-600 dark:text-slate-300">
                      {{ getExplanation() }}
                    </p>
                  }
                  @if (!isCorrect() && currentExercise()?.type === 'fill-blank') {
                    <p class="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                      Đáp án đúng: {{ getCorrectAnswer() }}
                    </p>
                  }
                  <button (click)="nextExercise()" class="btn-primary w-full mt-3">
                    {{ exerciseIndex() < lesson()!.exercises.length - 1 ? 'Câu tiếp theo →' : '🏆 Xem kết quả' }}
                  </button>
                </div>
              }
            </div>
          }
        </div>
      }

      <!-- PHASE: Result -->
      @if (currentPhase() === 'result') {
        <div class="animate-pop text-center space-y-6">
          <div class="card p-8">
            <div class="text-6xl mb-4 animate-bounce-subtle">
              {{ score() >= 95 ? '🏆' : score() >= 70 ? '🎉' : score() >= 50 ? '👏' : '💪' }}
            </div>
            <h2 class="font-display text-2xl font-bold text-slate-800 dark:text-white mb-2">
              {{ score() >= 95 ? 'Hoàn Hảo!' : score() >= 70 ? 'Tuyệt Vời!' : score() >= 50 ? 'Khá Tốt!' : 'Cần Cố Gắng Thêm!' }}
            </h2>

            <div class="text-5xl font-display font-bold text-primary-600 my-4">{{ score() }}%</div>

            <!-- Stars -->
            <div class="star-rating justify-center mb-4">
              @for (s of [1,2,3]; track s) {
                <span class="star text-4xl" [class.earned]="s <= earnedStars()" [style.animation-delay]="(s-1) * 0.2 + 's'">⭐</span>
              }
            </div>

            <!-- XP earned -->
            <div class="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800/50 rounded-xl px-4 py-2 text-primary-700 dark:text-primary-400 font-bold text-lg mb-4">
              ⚡ +{{ earnedXP() }} XP
            </div>

            <p class="text-slate-500 dark:text-slate-400 text-sm">
              {{ correctCount() }}/{{ lesson()!.exercises.length }} câu đúng
            </p>
          </div>

          <div class="flex gap-3">
            <a routerLink="/learning-path" class="btn-outline flex-1 text-center">← Lộ Trình</a>
            <button (click)="restart()" class="btn-ghost flex-1 border border-subtle">🔄 Làm lại</button>
            @if (nextLessonId()) {
              <a [routerLink]="['/lesson', nextLessonId()]" class="btn-primary flex-1 text-center">Bài tiếp →</a>
            }
          </div>
        </div>
      }

    </div>
    } @else {
      <div class="text-center py-20 text-slate-400">
        <p class="text-4xl mb-4">😕</p>
        <p>Không tìm thấy bài học này.</p>
        <a routerLink="/learning-path" class="btn-primary mt-4 inline-block">← Về Lộ Trình</a>
      </div>
    }
  `,
})
export class LessonComponent implements OnInit, OnDestroy {
  route = inject(ActivatedRoute);
  router = inject(Router);
  lessonService = inject(LessonService);
  storage = inject(StorageService);
  gamify = inject(GamificationService);
  tts = inject(TtsService);
  messageService = inject(MessageService);

  lesson = signal<Lesson | null>(null);
  currentPhase = signal<Phase>('theory');
  vocabIndex = signal(0);
  exerciseIndex = signal(0);
  answered = signal(false);
  isCorrect = signal(false);
  selectedAnswer = signal<number | null>(null);
  fillAnswer = signal('');
  matchedPairs = signal<Record<number, string>>({});
  selectedLeft = signal<number | null>(null);
  arrangedWords = signal<string[]>([]);
  correctCount = signal(0);
  score = signal(0);
  earnedStars = signal(0);
  earnedXP = signal(0);
  shuffledRights = signal<string[]>([]);
  private startTime = Date.now();

  phases = [
    { key: 'theory' as Phase },
    { key: 'vocabulary' as Phase },
    { key: 'exercises' as Phase },
    { key: 'result' as Phase },
  ];

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.lesson.set(this.lessonService.getLessonById(id) ?? null);
    this.initShuffledRights();
  }

  ngOnDestroy() {
    this.tts.stop();
  }

  isPhaseComplete(phase: Phase): boolean {
    const order: Phase[] = ['theory', 'vocabulary', 'exercises', 'result'];
    return order.indexOf(this.currentPhase()) > order.indexOf(phase);
  }

  nextPhase() {
    const order: Phase[] = ['theory', 'vocabulary', 'exercises', 'result'];
    const idx = order.indexOf(this.currentPhase());
    if (idx < order.length - 1) {
      this.currentPhase.set(order[idx + 1]);
      if (order[idx + 1] === 'result') this.finalizeLesson();
    }
  }

  // --- Vocabulary ---
  nextVocab() { this.vocabIndex.update(v => Math.min(v + 1, (this.lesson()?.vocabulary.length ?? 1) - 1)); }
  prevVocab() { this.vocabIndex.update(v => Math.max(v - 1, 0)); }

  getWordEmoji(word: VocabularyWord): string {
    if (!word.partOfSpeech) return '📖';
    const map: Record<string, string> = { noun: '📦', verb: '🏃', adjective: '🎨', adverb: '⚡', preposition: '📍', phrase: '💬' };
    return map[word.partOfSpeech] ?? '📖';
  }

  // --- Exercises ---
  currentExercise = computed(() => this.lesson()?.exercises[this.exerciseIndex()] ?? null);
  exerciseProgress = computed(() => {
    const total = this.lesson()?.exercises.length ?? 1;
    return Math.round((this.exerciseIndex() / total) * 100);
  });

  optionLabel(i: number) { return ['A', 'B', 'C', 'D'][i]; }

  getOptionClass(i: number): string {
    const base = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary-400 hover:bg-primary-50';
    if (!this.answered()) return base;
    const ex = this.currentExercise();
    if (ex?.type !== 'mcq') return base;
    if (i === ex.correctIndex) return 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 answer-correct';
    if (i === this.selectedAnswer() && !this.isCorrect()) return 'border-red-400 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 answer-wrong';
    return 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400 opacity-60';
  }

  selectAnswer(i: number) {
    if (this.answered()) return;
    const ex = this.currentExercise();
    if (ex?.type !== 'mcq') return;
    this.selectedAnswer.set(i);
    const correct = i === ex.correctIndex;
    this.isCorrect.set(correct);
    if (correct) this.correctCount.update(v => v + 1);
    this.answered.set(true);
  }

  formatBlankSentence(sentence: string, answer: string): string {
    return sentence.replace('___', answer ? `[${answer}]` : '___');
  }

  checkFillBlank(ex: any) {
    const correct = this.fillAnswer().trim().toLowerCase() === ex.answer.toLowerCase();
    this.isCorrect.set(correct);
    if (correct) this.correctCount.update(v => v + 1);
    this.answered.set(true);
  }

  // Matching
  initShuffledRights() {
    const ex = this.currentExercise();
    if (ex?.type === 'matching') {
      this.shuffledRights.set([...ex.pairs.map((p: any) => p.right)].sort(() => Math.random() - 0.5));
    }
  }

  selectLeft(i: number) {
    if (this.answered() || this.matchedPairs()[i] !== undefined) return;
    this.selectedLeft.set(i);
  }

  selectRight(right: string) {
    const left = this.selectedLeft();
    if (left === null || this.answered()) return;
    this.matchedPairs.update(m => ({ ...m, [left]: right }));
    this.selectedLeft.set(null);
  }

  isRightMatched(right: string) {
    return Object.values(this.matchedPairs()).includes(right);
  }

  getLeftClass(i: number): string {
    const selected = this.selectedLeft() === i;
    const matched = this.matchedPairs()[i] !== undefined;
    if (selected) return 'border-primary-400 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400';
    if (matched) return 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400';
    return 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary-400';
  }

  getRightClass(right: string): string {
    if (this.isRightMatched(right)) return 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 opacity-60';
    return 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary-400 cursor-pointer';
  }

  matchingComplete = computed(() => {
    const ex = this.currentExercise();
    if (ex?.type !== 'matching') return false;
    return Object.keys(this.matchedPairs()).length === ex.pairs.length;
  });

  checkMatching(ex: any) {
    let allCorrect = true;
    for (let i = 0; i < ex.pairs.length; i++) {
      if (this.matchedPairs()[i] !== ex.pairs[i].right) { allCorrect = false; break; }
    }
    this.isCorrect.set(allCorrect);
    if (allCorrect) this.correctCount.update(v => v + 1);
    this.answered.set(true);
  }

  // Ordering
  availableWords = computed(() => {
    const ex = this.currentExercise();
    if (ex?.type !== 'ordering') return [];
    const arranged = this.arrangedWords();
    const available = [...ex.words];
    for (const w of arranged) {
      const idx = available.indexOf(w);
      if (idx > -1) available.splice(idx, 1);
    }
    return available;
  });

  addToArranged(word: string) { this.arrangedWords.update(a => [...a, word]); }
  removeFromArranged(word: string) {
    this.arrangedWords.update(a => {
      const i = a.lastIndexOf(word);
      if (i > -1) { const n = [...a]; n.splice(i, 1); return n; }
      return a;
    });
  }

  checkOrdering(ex: any) {
    const correct = JSON.stringify(this.arrangedWords()) === JSON.stringify(ex.correctOrder);
    this.isCorrect.set(correct);
    if (correct) this.correctCount.update(v => v + 1);
    this.answered.set(true);
  }

  getExplanation(): string {
    const ex = this.currentExercise();
    if (ex?.type === 'mcq' || ex?.type === 'fill-blank') return ex.explanation;
    return '';
  }

  getCorrectAnswer(): string {
    const ex = this.currentExercise();
    if (ex?.type === 'fill-blank') return ex.answer;
    return '';
  }

  nextExercise() {
    const total = this.lesson()!.exercises.length;
    if (this.exerciseIndex() < total - 1) {
      this.exerciseIndex.update(v => v + 1);
      this.answered.set(false);
      this.isCorrect.set(false);
      this.selectedAnswer.set(null);
      this.fillAnswer.set('');
      this.matchedPairs.set({});
      this.selectedLeft.set(null);
      this.arrangedWords.set([]);
      this.initShuffledRights();
    } else {
      this.nextPhase();
    }
  }

  finalizeLesson() {
    const l = this.lesson()!;
    const total = l.exercises.length;
    const scoreVal = total > 0 ? Math.round((this.correctCount() / total) * 100) : 100;
    this.score.set(scoreVal);
    const stars = this.gamify.calculateStars(scoreVal);
    this.earnedStars.set(stars);

    const events = this.gamify.processLessonComplete(scoreVal, l.difficulty, stars);
    const xp = events.find(e => e.type === 'xp')?.value ?? 0;
    this.earnedXP.set(xp);

    const minutesStudied = Math.round((Date.now() - this.startTime) / 60000);
    this.storage.addStudyTime(minutesStudied || 1);
    this.storage.addWordsLearned(l.vocabulary.length);
    this.storage.saveLessonProgress({
      lessonId: l.id,
      levelId: l.levelId,
      completed: scoreVal >= 50,
      stars,
      score: scoreVal,
      bestScore: scoreVal,
      completedAt: new Date().toISOString(),
      attempts: 1,
    });

    // Update level progress
    const stats = this.lessonService.getLevelStats(l.levelId);
    if (stats) this.storage.updateLevelProgress(l.levelId, stats.completed, stats.total);

    // Show achievement toasts
    for (const event of events) {
      if (event.type === 'achievement' && event.achievement) {
        this.messageService.add({
          severity: 'success',
          summary: '🏆 Thành Tích Mới!',
          detail: `${event.achievement.emoji} ${event.achievement.title}`,
          life: 4000,
        });
      }
      if (event.type === 'level_up') {
        this.messageService.add({
          severity: 'info',
          summary: '🎊 Lên Cấp!',
          detail: event.message,
          life: 5000,
        });
      }
    }
  }

  nextLessonId = computed(() => {
    const l = this.lesson();
    if (!l) return null;
    const level = this.lessonService.getLevelById(l.levelId);
    if (!level) return null;
    const nextLesson = level.lessons.find(ls => ls.order === l.order + 1);
    return nextLesson?.id ?? null;
  });

  restart() {
    this.currentPhase.set('theory');
    this.vocabIndex.set(0);
    this.exerciseIndex.set(0);
    this.answered.set(false);
    this.isCorrect.set(false);
    this.selectedAnswer.set(null);
    this.fillAnswer.set('');
    this.matchedPairs.set({});
    this.arrangedWords.set([]);
    this.correctCount.set(0);
    this.startTime = Date.now();
  }
}
