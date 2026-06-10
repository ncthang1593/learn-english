import { Injectable, signal, computed, inject } from '@angular/core';
import { Level, Lesson, LevelId } from '../models/lesson.model';
import { StorageService } from './storage.service';
import { LEVELS_DATA } from '../../data/levels.data';

@Injectable({ providedIn: 'root' })
export class LessonService {
  private storage = inject(StorageService);

  readonly levels = signal<Level[]>(LEVELS_DATA);

  getLevelById(id: LevelId): Level | undefined {
    return this.levels().find(l => l.id === id);
  }

  getLessonById(lessonId: string): Lesson | undefined {
    for (const level of this.levels()) {
      const lesson = level.lessons.find(l => l.id === lessonId);
      if (lesson) return lesson;
    }
    return undefined;
  }

  isLevelUnlocked(levelId: LevelId): boolean {
    const level = this.getLevelById(levelId);
    if (level && level.order === 1) return true;
    return this.storage.progress().levelProgress[levelId]?.unlocked ?? false;
  }

  isLessonUnlocked(lessonId: string): boolean {
    const progress = this.storage.progress();
    let lesson: Lesson | undefined;
    let levelId: LevelId | undefined;

    for (const level of this.levels()) {
      const l = level.lessons.find(l => l.id === lessonId);
      if (l) { lesson = l; levelId = level.id; break; }
    }

    if (!lesson || !levelId) return false;
    if (!this.isLevelUnlocked(levelId)) return false;

    // First lesson of level is always unlocked if level is unlocked
    if (lesson.order === 1) return true;

    // Previous lesson must be completed
    const level = this.getLevelById(levelId)!;
    const prevLesson = level.lessons.find(l => l.order === lesson!.order - 1);
    if (!prevLesson) return true;
    return progress.lessonProgress[prevLesson.id]?.completed ?? false;
  }

  getLessonProgress(lessonId: string) {
    return this.storage.progress().lessonProgress[lessonId];
  }

  getLevelStats(levelId: LevelId) {
    const level = this.getLevelById(levelId);
    if (!level) return null;

    const progress = this.storage.progress();
    const completed = level.lessons.filter(l => progress.lessonProgress[l.id]?.completed).length;

    return {
      total: level.lessons.length,
      completed,
      percent: level.lessons.length > 0 ? Math.round((completed / level.lessons.length) * 100) : 0,
    };
  }

  getWordOfDay() {
    const allWords = this.levels().flatMap(l => l.lessons.flatMap(lesson => lesson.vocabulary));
    if (!allWords.length) return null;
    const dayIndex = Math.floor(Date.now() / 86400000) % allWords.length;
    return allWords[dayIndex];
  }

  getSuggestedLesson(): Lesson | null {
    for (const level of this.levels()) {
      if (!this.isLevelUnlocked(level.id)) continue;
      for (const lesson of level.lessons) {
        const lp = this.storage.progress().lessonProgress[lesson.id];
        if (!lp?.completed && this.isLessonUnlocked(lesson.id)) {
          return lesson;
        }
      }
    }
    return null;
  }
}
