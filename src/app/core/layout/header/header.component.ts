import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Listagem de Clientes',
        icon: 'pi pi-list',
        command: () => this.router.navigate(['/']),
      },
      {
        label: 'Cadastro de Clientes',
        icon: 'pi pi-user-plus',
        command: () => this.router.navigate(['/cadastro-cliente']),
      },
    ];
  }
  @Output() toggle: EventEmitter<void> = new EventEmitter();
  items: MenuItem[] | undefined;
}
