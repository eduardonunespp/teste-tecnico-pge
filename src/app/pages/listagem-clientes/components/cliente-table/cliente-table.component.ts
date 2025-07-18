import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ICliente } from '../../../../shared';

@Component({
  selector: 'app-cliente-table',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './cliente-table.component.html',
  styleUrl: './cliente-table.component.scss'
})
export class ClienteTableComponent {
  @Input() clientes: ICliente[] = []
}
