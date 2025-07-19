import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { HeaderComponent } from './core/layout/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet,
    ButtonModule,
    InputTextModule,
    SidebarModule,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'teste-tecnico-pge';

  constructor(private router: Router) {}

  visibleSidebar: boolean = false;

  toPage(page: string): void {
    this.router.navigate([page]);
    this.visibleSidebar = false;
  }
}
