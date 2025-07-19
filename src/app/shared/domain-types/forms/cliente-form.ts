import { AbstractControl } from '@angular/forms';

export type ICliente = {
  nome: string;
  email: string;
  cpf: string;
  dataNascimento: string; // ou Date, dependendo do formato que você usa
  contato: string;
  paisEstado: string;
};

export type IClienteForm = {
  nome: AbstractControl;
  email: AbstractControl;
  cpf: AbstractControl;
  dataNascimento: AbstractControl;
  contato: AbstractControl;
  tipoContato: AbstractControl;
  pais: AbstractControl;
  estado: AbstractControl;
};
