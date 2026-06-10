import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { BottomNavComponent } from './shared/components/bottom-nav/bottom-nav.component';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidebarComponent, BottomNavComponent, ToastModule],
  template: `
    <p-toast position="top-right" />
    <div class="app-layout" [class.dark]="theme.isDark()">
      <!-- Sidebar (desktop) -->
      <app-sidebar class="hidden md:flex" />

      <!-- Main area -->
      <div class="main-content flex flex-col min-h-screen">
        <!-- Navbar -->
        <app-navbar />

        <!-- Page content -->
        <main class="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <router-outlet />
        </main>
      </div>
    </div>

    <!-- Bottom nav (mobile) -->
    <app-bottom-nav class="md:hidden" />
  `,
  styles: [`
    :host { display: block; }
    .app-layout {
      display: flex;
      min-height: 100dvh;
      background: var(--bg-light);
      transition: background 0.3s ease;
    }
    .app-layout.dark { background: var(--bg-dark); }
    .main-content { flex: 1; min-width: 0; }
  `]
})
export class AppComponent implements OnInit {
  theme = inject(ThemeService);

  ngOnInit(): void {
    this.theme.init();
  }
}
