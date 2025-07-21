import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [ConfirmDialogModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
})
export class PopupComponent {
  @Input() titulo: string = 'Confirmação';
  @Input() mensagem: string = 'Tem certeza que deseja continuar?';

  @Output() confirmar = new EventEmitter<number>();
  @Output() cancelar = new EventEmitter<void>();

  constructor(private confirmationService: ConfirmationService) {}

  exibir(id?: number) {
    this.confirmationService.confirm({
      header: this.titulo,
      message: this.mensagem,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      rejectButtonStyleClass: 'p-button-danger',
      accept: () => this.confirmar.emit(id),
      reject: () => this.cancelar.emit(),
    });
  }
}
