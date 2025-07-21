import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ICliente } from '../../../../../shared';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-cliente-table',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule],
  templateUrl: './cliente-table.component.html',
  styleUrl: './cliente-table.component.scss'
})
export class ClienteTableComponent {
  @Input() clientes: ICliente[] = []

  @Output() openModalDelete = new EventEmitter<number>(); // envia o ID

  @Output() openModalEdit = new EventEmitter<number>();
}
