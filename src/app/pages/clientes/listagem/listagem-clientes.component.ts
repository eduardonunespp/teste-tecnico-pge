import { Component, Input, OnInit } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { ClienteTableComponent } from './components/cliente-table/cliente-table.component';
import { ICliente } from '../../../shared';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { SidebarModule } from 'primeng/sidebar';
import { Router } from '@angular/router';
import { DescriptionHeaderPageComponent } from '../../../shared/components/description-header-page/description-header-page.component';
import { BehaviorSubject } from 'rxjs';

import { CommonModule } from '@angular/common';
import * as Cache from '../../../core/adapters/cache';
import { FloatLabel, FloatLabelModule } from 'primeng/floatlabel';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { PopupComponent } from '../../../shared/components/popup/popup.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ClienteService } from '../services/cliente.service';
import { ClienteFormComponent } from '../cadastro/components/cliente-form/cliente-form.component';

@Component({
  selector: 'app-listagem-clientes',
  standalone: true,
  imports: [
    SidebarModule,
    PopupComponent,
    DescriptionHeaderPageComponent,
    ButtonModule,
    ClienteTableComponent,
    CommonModule,
    FloatLabelModule,
    InputTextModule,
    CommonModule,
    FloatLabel,
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    ModalComponent,
    ClienteFormComponent,
    ToastModule,
  ],
  providers: [provideNgxMask(), ConfirmationService, MessageService],
  templateUrl: './listagem-clientes.component.html',
  styleUrl: './listagem-clientes.component.scss',
})
export class ListagemClientesComponent implements OnInit {
  form!: FormGroup;
  clientes: ICliente[] = [];
  clientesSubject = new BehaviorSubject<ICliente[]>([]);
  visibleModal: boolean = false;
  idCliente: number | undefined;

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getFromCache();

    this.form = this.fb.group({
      nome: [''],
      cpf: [''],
    });

    const filtrosSalvos = localStorage.getItem('filtrosClientes');

    if (filtrosSalvos) {
      const valores = JSON.parse(filtrosSalvos);
      this.form.patchValue(valores);

      const filtrados = this.filtrarClientes(this.clientes, valores);
      this.clientesSubject.next(filtrados);
    } else {
      this.clientesSubject.next(this.clientes);
    }
  }

  getFromCache(): void {
    this.clientes = this.clienteService.listarDoCache();

    const filtro = this.form?.value || {}; // Pega filtros atuais (ou vazio)
    const filtrados = this.filtrarClientes(this.clientes, filtro);
    this.clientesSubject.next(filtrados);
  }

  buscarFiltro(): void {
    const filtro = this.form.value;

    Cache.set({ key: 'filtrosClientes', value: filtro });

    const filtrados = this.filtrarClientes(this.clientes, filtro);
    this.clientesSubject.next(filtrados);
  }

  private filtrarClientes(clientes: ICliente[], filtro: any): ICliente[] {
    const nome = filtro.nome?.toLowerCase() || '';
    const cpf = filtro.cpf?.toLowerCase() || '';

    return clientes.filter(
      (c) =>
        c.nome.toLowerCase().includes(nome) && c.cpf.toLowerCase().includes(cpf)
    );
  }

  limparFiltro(): any {
    var form = this.form;
    form.reset();
    Cache.remove({ key: 'filtrosClientes' });
    return this.buscarFiltro();
  }

  onEditSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Cliente atualizado com sucesso!',
    });
  }

  deletarCliente(id: number) {
    this.clienteService.deletar(id).subscribe(() => {
      const novaLista = this.clienteService.listarDoCache();
      const filtros = this.form.value;
      const filtrados = this.filtrarClientes(novaLista, filtros);
      this.clientesSubject.next(filtrados);
    });
  }

  cancelou() {
    console.log('Cancelado');
  }

  showModal: boolean = false;

  visibleSidebar: boolean = false;

  openModalEdit(idCliente: number) {
    console.log('Abrindo modal de edição para o cliente com ID:');

    this.visibleModal = true;
    this.idCliente = idCliente;

    console.log('ID do cliente a ser editado:', idCliente);
  }

  redirectTo() {
    this.router.navigate(['/cadastro-cliente']);
    this.visibleSidebar = false;
  }
}
