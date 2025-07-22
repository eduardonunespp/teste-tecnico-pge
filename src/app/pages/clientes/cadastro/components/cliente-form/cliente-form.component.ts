import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel, FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { format } from 'date-fns';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { Button, ButtonModule } from 'primeng/button';

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { IClienteForm, ImsgError, msg } from '@shared/index';
import { ClienteService } from '@pages/clientes/services/cliente.service';
import { LogService } from '@core/services/log.service';
import { dataFuturaValidator } from '@core/validators';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    FloatLabel,
    DropdownModule,
    ButtonModule,
    CalendarModule,
    FloatLabelModule,
    NgxMaskDirective,
    ReactiveFormsModule,
    CommonModule,
    Button,
    ToastModule,
    ProgressSpinnerModule
  ],
  providers: [provideNgxMask(), MessageService],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.scss',
})
export class ClienteFormComponent implements OnInit, OnChanges {
  @Input() IsEdit: boolean = false;
  @Input() idCliente?: number;
  @Output() onCloseModal = new EventEmitter<void>();
  @Output() onRefreshClients = new EventEmitter<void>();
  @Output() onEditSuccess = new EventEmitter<void>();
  form!: FormGroup;
  paises = ['Brasil', 'Estados Unidos'];
  estados: string[] = [];
  msg: ImsgError = msg;
  isLoading: boolean = false;

  estadosPorPais: Record<string, string[]> = {
    Brasil: [
      'SP',
      'RJ',
      'MG',
      'CE',
      'SP',
      'RJ',
      'MG',
      'CE',
      'SP',
      'RJ',
      'MG',
      'CE',
    ],
    'Estados Unidos': ['California', 'Texas', 'Florida'],
  };

  tiposContato = ['Residencial', 'Fixo', 'Whatsapp'];

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private messageService: MessageService,
    private logService: LogService
  ) {}

  private formatarData(data: string): string {
    const date = new Date(data);
    return date.toISOString().substring(0, 10);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: [''],
      dataNascimento: ['', [Validators.required, dataFuturaValidator]],
      contato: ['', [Validators.required]],
      tipoContato: ['', Validators.required],
      pais: ['', Validators.required],
      estado: ['', Validators.required],
    });

    this.form.get('pais')?.valueChanges.subscribe((pais) => {
      this.estados = this.estadosPorPais[pais] || [];
      this.form.get('estado')?.reset();

      const cpfControl = this.form.get('cpf');
      if (pais === 'Brasil') {
        cpfControl?.setValidators([Validators.required]);
      } else {
        cpfControl?.clearValidators();
      }
      cpfControl?.updateValueAndValidity();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes detected:', this.idCliente);

    this.form.get('pais')?.valueChanges.subscribe((pais) => {
      this.estados = this.estadosPorPais[pais] || [];
      this.form.get('estado')?.reset();
    });

    if (this.idCliente) {
      this.clienteService.buscarPorId(this.idCliente).subscribe((cliente) => {
        if (cliente) {
          this.estados = this.estadosPorPais[cliente.pais] || [];
          this.form.patchValue({
            ...cliente,
            dataNascimento: this.formatarData(cliente.dataNascimento),
          });
        }
      });
    }
  }

  maxDate: string = format(new Date(), 'yyyy-MM-dd');

  submit() {
    if (this.form.invalid) {
      this.logService.logWarn('Formulário inválido no submit', this.form.value);
      this.form.markAllAsTouched();
      return;
    }

    const cliente = this.form.value;
    this.isLoading = true;
    if (this.idCliente) {
      // Atualização

      this.clienteService.atualizar(this.idCliente, cliente).subscribe({
        next: (clienteAtualizado) => {
          this.logService.logInfo(
            'Cliente atualizado com sucesso',
            clienteAtualizado
          );

          this.onCloseModal.emit();
          this.onRefreshClients.emit();
          this.onEditSuccess.emit();
          this.isLoading = false;
        },
        error: (error) => {
          this.logService.logError('Erro ao atualizar cliente', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Falha ao atualizar cliente.',
          });
          this.isLoading = false;
        },
      });
    } else {
      // Criação
      this.clienteService.criar(cliente).subscribe({
        next: (clienteCriado) => {
          this.logService.logInfo('Cliente criado com sucesso', clienteCriado);
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Cliente salvo com sucesso!',
          });
          this.form.reset();
          this.isLoading = false;
        },
        error: (error) => {
          this.logService.logError('Erro ao criar cliente', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Falha ao salvar cliente.',
          });
          this.isLoading = false;
        },
      });
    }
  }

  isFuturo(data: Date): boolean {
    return data > new Date();
  }

  get f() {
    return this.form.controls as IClienteForm;
  }
}
