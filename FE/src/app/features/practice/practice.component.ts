import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LessonService } from '../../core/services/lesson.service';
import { StorageService } from '../../core/services/storage.service';
import { GamificationService } from '../../core/services/gamification.service';
import { TtsService } from '../../core/services/tts.service';
import { VocabularyWord } from '../../core/models/lesson.model';

type PracticeMode = 'menu' | 'flashcard' | 'quiz';

@Component({
  selector: 'app-practice',
  standalone: true,
  imports: [],
  template: `
    <div class="page-enter pb-20 md:pb-6">

      <!-- Menu -->
      @if (mode() === 'menu') {
        <div class="space-y-6">
          <div>
            <h1 class="font-display text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-1">📝 Luyện Tập</h1>
            <p class="text-slate-500 dark:text-slate-400">Ôn luyện từ vựng và kiến thức đã học</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Flashcard -->
            <button (click)="startFlashcard()"
                    class="card p-6 text-left group hover:border-primary-300 dark:hover:border-primary-700 border border-transparent transition-all">
              <div class="text-4xl mb-3 group-hover:animate-float">🃏</div>
              <h2 class="font-display font-bold text-lg text-slate-800 dark:text-white mb-1">Flashcard</h2>
              <p class="text-sm text-slate-500 dark:text-slate-400 mb-3">Học từ vựng bằng thẻ ghi nhớ với phương pháp Spaced Repetition</p>
              <div class="flex items-center gap-2">
                <span class="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 px-2 py-1 rounded-full font-medium">
                  {{ allWords().length }} từ
                </span>
                <span class="text-xs text-slate-400">Lật thẻ để xem nghĩa</span>
              </div>
            </button>

            <!-- Quick Quiz -->
            <button (click)="startQuiz()"
                    class="card p-6 text-left group hover:border-secondary-300 dark:hover:border-secondary-700 border border-transparent transition-all">
              <div class="text-4xl mb-3 group-hover:animate-float">🎯</div>
              <h2 class="font-display font-bold text-lg text-slate-800 dark:text-white mb-1">Quiz Nhanh</h2>
              <p class="text-sm text-slate-500 dark:text-slate-400 mb-3">Kiểm tra từ vựng ngẫu nhiên, chọn nghĩa đúng</p>
              <div class="flex items-center gap-2">
                <span class="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-1 rounded-full font-medium">
                  10 câu hỏi
                </span>
                <span class="text-xs text-slate-400">Trắc nghiệm 4 đáp án</span>
              </div>
            </button>
          </div>

          <!-- Stats -->
          <div class="card p-5">
            <h2 class="font-display font-bold text-slate-800 dark:text-white mb-3">📊 Thống Kê Luyện Tập</h2>
            <div class="grid grid-cols-3 gap-3 text-center">
              <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
                <p class="text-xl font-bold text-primary-600">{{ storage.progress().totalWordsLearned }}</p>
                <p class="text-xs text-slate-400 mt-1">Từ đã học</p>
              </div>
              <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
                <p class="text-xl font-bold text-emerald-600">{{ storage.progress().totalLessonsCompleted }}</p>
                <p class="text-xs text-slate-400 mt-1">Bài hoàn thành</p>
              </div>
              <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
                <p class="text-xl font-bold text-amber-500">{{ storage.progress().streak }}</p>
                <p class="text-xs text-slate-400 mt-1">Streak 🔥</p>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- FLASHCARD MODE -->
      @if (mode() === 'flashcard' && allWords().length > 0) {
        <div class="space-y-6">
          <div class="flex items-center gap-3">
            <button (click)="mode.set('menu')" class="w-9 h-9 rounded-xl border border-subtle flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">←</button>
            <h2 class="font-display font-bold text-xl text-slate-800 dark:text-white">🃏 Flashcard</h2>
            <span class="ml-auto text-sm text-slate-400">{{ flashcardIndex() + 1 }}/{{ allWords().length }}</span>
          </div>

          <!-- Card -->
          <div class="flashcard-scene h-56 cursor-pointer" (click)="flipCard()">
            <div class="flashcard-card" [class.is-flipped]="isFlipped()">
              <!-- Front -->
              <div class="flashcard-face bg-gradient-to-br from-primary-500 to-primary-700 flex flex-col items-center justify-center p-6 text-white">
                <p class="text-4xl font-display font-bold mb-2">{{ currentWord()?.english }}</p>
                @if (currentWord()?.pronunciation) {
                  <p class="text-primary-200 font-mono text-sm">{{ currentWord()?.pronunciation }}</p>
                }
                <p class="text-primary-300 text-sm mt-4">Nhấn để xem nghĩa</p>
              </div>
              <!-- Back -->
              <div class="flashcard-face flashcard-back bg-gradient-to-br from-emerald-500 to-teal-600 flex flex-col items-center justify-center p-6 text-white">
                <p class="text-3xl font-bold mb-2">{{ currentWord()?.vietnamese }}</p>
                <p class="text-emerald-100 text-sm italic text-center">"{{ currentWord()?.example }}"</p>
                <p class="text-emerald-200 text-xs mt-1 text-center">{{ currentWord()?.exampleVietnamese }}</p>
              </div>
            </div>
          </div>

          <!-- Controls -->
          <div class="flex gap-3">
            <button (click)="prevCard()" [disabled]="flashcardIndex() === 0"
                    class="flex-1 py-3 rounded-xl border border-subtle text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all disabled:opacity-40 disabled:cursor-not-allowed font-medium">
              ← Trước
            </button>
            <button (click)="tts.speak(currentWord()?.english ?? '')"
                    class="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 flex items-center justify-center hover:scale-110 transition-all">
              🔊
            </button>
            @if (flashcardIndex() < allWords().length - 1) {
              <button (click)="nextCard()" class="flex-1 btn-primary">Tiếp →</button>
            } @else {
              <button (click)="mode.set('menu')" class="flex-1 btn-secondary">✅ Xong!</button>
            }
          </div>

          <!-- Grade buttons (after flip) -->
          @if (isFlipped()) {
            <div class="grid grid-cols-3 gap-2">
              <button (click)="gradeCard(1)" class="py-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-100 transition-all">😰 Khó</button>
              <button (click)="gradeCard(3)" class="py-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 text-amber-600 dark:text-amber-400 text-sm font-medium hover:bg-amber-100 transition-all">🤔 Tạm</button>
              <button (click)="gradeCard(5)" class="py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 text-emerald-600 dark:text-emerald-400 text-sm font-medium hover:bg-emerald-100 transition-all">😊 Dễ</button>
            </div>
          }
        </div>
      }

      <!-- QUIZ MODE -->
      @if (mode() === 'quiz') {
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <button (click)="mode.set('menu')" class="w-9 h-9 rounded-xl border border-subtle flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">←</button>
            <h2 class="font-display font-bold text-xl text-slate-800 dark:text-white">🎯 Quiz Nhanh</h2>
            @if (!quizDone()) {
              <span class="ml-auto text-sm text-slate-400">{{ quizIndex() + 1 }}/{{ quizQuestions().length }}</span>
            }
          </div>

          @if (!quizDone()) {
            @if (quizQuestions()[quizIndex()]; as q) {
              <div class="card p-6 space-y-4">
                <p class="font-semibold text-slate-800 dark:text-white text-lg">
                  "{{ q.english }}" nghĩa là gì?
                </p>
                <div class="space-y-2">
                  @for (opt of q.options; track $index; let i = $index) {
                    <button (click)="selectQuizAnswer(i, q)"
                            [disabled]="quizAnswered()"
                            class="w-full text-left p-4 rounded-xl border-2 transition-all duration-200 font-medium text-sm"
                            [class]="getQuizOptionClass(i, q)">
                      <span class="mr-2 font-bold text-slate-400">{{ ['A','B','C','D'][i] }}.</span>
                      {{ opt }}
                    </button>
                  }
                </div>
                @if (quizAnswered()) {
                  <div class="p-3 rounded-xl" [class]="quizCorrect() ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'">
                    <p class="font-bold">{{ quizCorrect() ? '✅ Chính xác!' : '❌ Sai rồi! Đáp án: ' + q.correctAnswer }}</p>
                  </div>
                  <button (click)="nextQuiz()" class="btn-primary w-full">
                    {{ quizIndex() < quizQuestions().length - 1 ? 'Câu tiếp →' : '🏆 Kết quả' }}
                  </button>
                }
              </div>
            }
          } @else {
            <div class="card p-8 text-center">
              <div class="text-5xl mb-4">{{ quizScore() >= 80 ? '🏆' : quizScore() >= 60 ? '🎉' : '💪' }}</div>
              <h3 class="font-display text-2xl font-bold text-slate-800 dark:text-white mb-2">Kết Quả Quiz</h3>
              <p class="text-4xl font-bold text-primary-600 my-3">{{ quizScore() }}%</p>
              <p class="text-slate-500 mb-6">{{ quizCorrectCount() }}/{{ quizQuestions().length }} câu đúng</p>
              <div class="flex gap-3">
                <button (click)="startQuiz()" class="flex-1 btn-outline">🔄 Làm lại</button>
                <button (click)="mode.set('menu')" class="flex-1 btn-primary">← Về menu</button>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class PracticeComponent implements OnInit {
  lessonService = inject(LessonService);
  storage = inject(StorageService);
  gamify = inject(GamificationService);
  tts = inject(TtsService);

  mode = signal<PracticeMode>('menu');

  // Flashcard
  flashcardIndex = signal(0);
  isFlipped = signal(false);
  allWords = signal<VocabularyWord[]>([]);

  currentWord = computed(() => this.allWords()[this.flashcardIndex()]);

  // Quiz
  quizQuestions = signal<any[]>([]);
  quizIndex = signal(0);
  quizAnswered = signal(false);
  quizCorrect = signal(false);
  quizSelectedIndex = signal<number | null>(null);
  quizCorrectCount = signal(0);
  quizDone = signal(false);
  quizScore = computed(() => {
    const total = this.quizQuestions().length;
    return total ? Math.round((this.quizCorrectCount() / total) * 100) : 0;
  });

  constructor() {
    import('@angular/core').then(({ effect }) => {
      effect(() => {
        const levels = this.lessonService.levels();
        if (levels && levels.length > 0) {
          const words = levels.flatMap(l => l.lessons.flatMap(lesson => lesson.vocabulary));
          this.allWords.set(words.sort(() => Math.random() - 0.5));
        }
      }, { allowSignalWrites: true });
    });
  }

  ngOnInit() {
  }

  // --- Flashcard ---
  flipCard() { this.isFlipped.update(v => !v); }
  nextCard() { this.flashcardIndex.update(v => v + 1); this.isFlipped.set(false); }
  prevCard() { this.flashcardIndex.update(v => Math.max(0, v - 1)); this.isFlipped.set(false); }

  gradeCard(grade: number) {
    const word = this.currentWord();
    if (word) {
      this.storage.updateFlashcardReview(word.id, word.id.split('-')[0], grade);
      if (grade >= 4) this.gamify.processFlashcardCorrect();
    }
    this.nextCard();
  }

  startFlashcard() {
    this.flashcardIndex.set(0);
    this.isFlipped.set(false);
    this.mode.set('flashcard');
  }

  // --- Quiz ---
  startQuiz() {
    const words = [...this.allWords()].sort(() => Math.random() - 0.5).slice(0, 10);
    const questions = words.map(w => {
      const wrong = this.allWords().filter(x => x.id !== w.id).sort(() => Math.random() - 0.5).slice(0, 3);
      const options = [...wrong.map(x => x.vietnamese), w.vietnamese].sort(() => Math.random() - 0.5);
      return { english: w.english, options, correctAnswer: w.vietnamese, correctIndex: options.indexOf(w.vietnamese) };
    });
    this.quizQuestions.set(questions);
    this.quizIndex.set(0);
    this.quizAnswered.set(false);
    this.quizCorrect.set(false);
    this.quizSelectedIndex.set(null);
    this.quizCorrectCount.set(0);
    this.quizDone.set(false);
    this.mode.set('quiz');
  }

  selectQuizAnswer(i: number, q: any) {
    if (this.quizAnswered()) return;
    this.quizSelectedIndex.set(i);
    const correct = i === q.correctIndex;
    this.quizCorrect.set(correct);
    if (correct) this.quizCorrectCount.update(v => v + 1);
    this.quizAnswered.set(true);
  }

  getQuizOptionClass(i: number, q: any): string {
    if (!this.quizAnswered()) return 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary-400 hover:bg-primary-50';
    if (i === q.correctIndex) return 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400';
    if (i === this.quizSelectedIndex() && !this.quizCorrect()) return 'border-red-400 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400';
    return 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400 opacity-60';
  }

  nextQuiz() {
    if (this.quizIndex() < this.quizQuestions().length - 1) {
      this.quizIndex.update(v => v + 1);
      this.quizAnswered.set(false);
      this.quizCorrect.set(false);
      this.quizSelectedIndex.set(null);
    } else {
      this.quizDone.set(true);
    }
  }
}
