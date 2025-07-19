import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-description-header-page',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './description-header-page.component.html',
  styleUrl: './description-header-page.component.scss',
})
export class DescriptionHeaderPageComponent {
  @Input() title: string = 'Cadastro de Clientes';
  @Input() redirect: string = '';
  @Input() buttonName: string = 'Adicionar Novo Cliente';

  constructor(private router: Router) {}

  redirectTo() {
    this.router.navigate([this.redirect]);
  }
}
