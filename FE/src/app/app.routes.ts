import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    title: 'Trang Chủ – EnglishUp',
  },
  {
    path: 'learning-path',
    loadComponent: () => import('./features/learning-path/learning-path.component').then(m => m.LearningPathComponent),
    title: 'Lộ Trình Học – EnglishUp',
  },
  {
    path: 'lesson/:id',
    loadComponent: () => import('./features/lesson/lesson.component').then(m => m.LessonComponent),
    title: 'Bài Học – EnglishUp',
  },
  {
    path: 'practice',
    loadComponent: () => import('./features/practice/practice.component').then(m => m.PracticeComponent),
    title: 'Luyện Tập – EnglishUp',
  },
  {
    path: 'grammar',
    loadComponent: () => import('./features/grammar/grammar.component').then(m => m.GrammarComponent),
    title: 'Ngữ Pháp – EnglishUp',
  },
  {
    path: 'grammar/:id',
    loadComponent: () => import('./features/grammar/grammar-topic.component').then(m => m.GrammarTopicComponent),
    title: 'Ngữ Pháp Chi Tiết – EnglishUp',
  },
  {
    path: 'progress',
    loadComponent: () => import('./features/progress/progress.component').then(m => m.ProgressComponent),
    title: 'Tiến Trình – EnglishUp',
  },
  {
    path: 'settings',
    loadComponent: () => import('./features/settings/settings.component').then(m => m.SettingsComponent),
    title: 'Cài Đặt – EnglishUp',
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
