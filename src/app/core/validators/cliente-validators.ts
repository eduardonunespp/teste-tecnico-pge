import { AbstractControl, ValidationErrors } from '@angular/forms';

export function dataFuturaValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;

  const dataInformada = new Date(value);
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  return dataInformada > hoje ? { dataFutura: true } : null;
}
