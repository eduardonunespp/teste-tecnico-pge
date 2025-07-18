import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() visible: boolean = false;
  @Input() header: string = '';
  @Input() width: string = '40vw';
  @Input() closable: boolean = true;
  @Input() modal: boolean = true;

  @Output() onHide: EventEmitter<void> = new EventEmitter<void>();
}
