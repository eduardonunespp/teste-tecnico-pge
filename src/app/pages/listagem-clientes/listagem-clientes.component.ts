import { Component, OnInit } from '@angular/core';
import { ClienteFormComponent } from '../cadastro-cliente-page/components/cliente-form/cliente-form.component';
import { ButtonModule } from 'primeng/button';
import { ClienteTableComponent } from './components/cliente-table/cliente-table.component';
import { ICliente } from '../../shared';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { SidebarModule } from 'primeng/sidebar';
import { Router } from '@angular/router';
import { DescriptionHeaderPageComponent } from '../../shared/components/description-header-page/description-header-page.component';
import { Observable } from 'rxjs';
import { ClienteService } from '../../core/services/cliente.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listagem-clientes',
  standalone: true,
  imports: [
    SidebarModule,
    DescriptionHeaderPageComponent,
    ButtonModule,
    ClienteTableComponent,
    DescriptionHeaderPageComponent,
    CommonModule
  ],
  templateUrl: './listagem-clientes.component.html',
  styleUrl: './listagem-clientes.component.scss',
})
export class ListagemClientesComponent implements OnInit {

  clientes$!: Observable<ICliente[]>;
  clientes: ICliente[] = [];

  constructor(private router: Router, private clienteService: ClienteService) {}

  ngOnInit(): void {
  this.clientes$ = this.clienteService.listar();
  this.clientes$.subscribe(data => {
    this.clientes = data || [];
  });
}

  showModal: boolean = false;

  visibleSidebar: boolean = false;

  redirectTo() {
    this.router.navigate(['/cadastro-cliente']);
    this.visibleSidebar = false;
  }
}
