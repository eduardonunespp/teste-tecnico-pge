import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel, FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { format } from 'date-fns';
import { CommonModule } from '@angular/common';
import { IClienteForm } from '../../../../shared';
import { dataFuturaValidator } from '../../../../core';
import { Button, ButtonModule } from "primeng/button";

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
    Button
],
  providers: [provideNgxMask()],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.scss',
})
export class ClienteFormComponent {
  form!: FormGroup;
  paises = ['Brasil', 'Estados Unidos'];
  estados: string[] = [];

  estadosPorPais: Record<string, string[]> = {
    'Brasil': ['SP', 'RJ', 'MG', 'CE', 'SP', 'RJ', 'MG', 'CE', 'SP', 'RJ', 'MG', 'CE'],
    'Estados Unidos': ['California', 'Texas', 'Florida']
  };

  tiposContato = ['Residencial', 'Fixo', 'Whatsapp'];


  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required, dataFuturaValidator]],
      contato: ['', [Validators.required]],
      tipoContato: ['', Validators.required],
      pais: ['', Validators.required],
      estado: ['', Validators.required]
    });

    this.form.get('pais')?.valueChanges.subscribe(pais => {
      this.estados = this.estadosPorPais[pais] || [];
      this.form.get('estado')?.reset();
    });
  }

   maxDate: string = format(new Date(), 'yyyy-MM-dd');

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log(this.form.value);
  }

  isFuturo(data: Date): boolean {
    return data > new Date();
  }

  get f() {
    return this.form.controls as IClienteForm;
  }
}
