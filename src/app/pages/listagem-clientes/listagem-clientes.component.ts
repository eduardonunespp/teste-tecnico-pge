import { Component } from '@angular/core';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';
import { ButtonModule } from 'primeng/button';
import { ClienteTableComponent } from './components/cliente-table/cliente-table.component';
import { ICliente } from '../../shared';

@Component({
  selector: 'app-listagem-clientes',
  standalone: true,
  imports: [ClienteFormComponent, ButtonModule, ClienteTableComponent],
  templateUrl: './listagem-clientes.component.html',
  styleUrl: './listagem-clientes.component.scss',
})
export class ListagemClientesComponent {
  clientes: ICliente[] = [
    {
      nome: 'João Silva',
      email: 'joao.silva@email.com',
      cpf: '123.456.789-00',
      dataNascimento: '1990-01-01',
      paisEstado: 'Brasil - SP',
      contato: '(11) 98765-4321',
    },
    {
      nome: 'Maria Souza',
      email: 'maria.souza@email.com',
      cpf: '987.654.321-00',
      dataNascimento: '1985-05-15',
      contato: '(21) 99876-5432',
      paisEstado: 'Brasil - RJ',
    },
    {
      nome: 'Maria Souza',
      email: 'maria.souza@email.com',
      cpf: '987.654.321-00',
      dataNascimento: '1985-05-15',
      contato: '(21) 99876-5432',
      paisEstado: 'Brasil - RJ',
    },
    {
      nome: 'Maria Souza',
      email: 'maria.souza@email.com',
      cpf: '987.654.321-00',
      dataNascimento: '1985-05-15',
      contato: '(21) 99876-5432',
      paisEstado: 'Brasil - RJ',
    },
    {
      nome: 'Maria Souza',
      email: 'maria.souza@email.com',
      cpf: '987.654.321-00',
      dataNascimento: '1985-05-15',
      contato: '(21) 99876-5432',
      paisEstado: 'Brasil - RJ',
    },
    {
      nome: 'Maria Souza',
      email: 'maria.souza@email.com',
      cpf: '987.654.321-00',
      dataNascimento: '1985-05-15',
      contato: '(21) 99876-5432',
      paisEstado: 'Brasil - RJ',
    },
    {
      nome: 'Maria Souza',
      email: 'maria.souza@email.com',
      cpf: '987.654.321-00',
      dataNascimento: '1985-05-15',
      contato: '(21) 99876-5432',
      paisEstado: 'Brasil - RJ',
    },
    {
      nome: 'Maria Souza',
      email: 'maria.souza@email.com',
      cpf: '987.654.321-00',
      dataNascimento: '1985-05-15',
      contato: '(21) 99876-5432',
      paisEstado: 'Brasil - RJ',
    },
    {
      nome: 'Maria Souza',
      email: 'maria.souza@email.com',
      cpf: '987.654.321-00',
      dataNascimento: '1985-05-15',
      contato: '(21) 99876-5432',
      paisEstado: 'Brasil - RJ',
    },
  ];
}
