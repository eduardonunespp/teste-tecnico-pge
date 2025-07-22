import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ClienteFormComponent } from './cliente-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { ClienteService } from '../../../services/cliente.service';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LogService } from '../../../../../core/services/log.service';
import { format } from 'date-fns';

import { ICliente } from '../../../../../shared';

const clienteMock: ICliente = {
  id: 123,
  nome: 'João da Silva',
  email: 'joao@email.com',
  cpf: '12345678900',
  dataNascimento: '1990-01-01',
  contato: '1111',
  cidade: 'São Paulo',
  estado: 'SP',
  pais: 'Brasil',
  tipoContato: 'Telefone',
};

describe('ClienteFormComponent', () => {
  let component: ClienteFormComponent;
  let fixture: ComponentFixture<ClienteFormComponent>;
  let clienteService: jasmine.SpyObj<ClienteService>;
  let logService: jasmine.SpyObj<LogService>;

  beforeEach(async () => {
    const clienteServiceSpy = jasmine.createSpyObj('ClienteService', [
      'criar',
      'atualizar',
      'buscarPorId',
    ]);
    const logServiceSpy = jasmine.createSpyObj('LogService', [
      'logInfo',
      'logWarn',
      'logError',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        ClienteFormComponent,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: ClienteService, useValue: clienteServiceSpy },
        { provide: LogService, useValue: logServiceSpy },
        MessageService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClienteFormComponent);
    component = fixture.componentInstance;
    clienteService = TestBed.inject(
      ClienteService
    ) as jasmine.SpyObj<ClienteService>;
    logService = TestBed.inject(LogService) as jasmine.SpyObj<LogService>;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve criar os controles do formulário', () => {
    expect(component.form.contains('nome')).toBeTrue();
    expect(component.form.contains('email')).toBeTrue();
    expect(component.form.contains('cpf')).toBeTrue();
    expect(component.form.contains('dataNascimento')).toBeTrue();
    expect(component.form.contains('contato')).toBeTrue();
    expect(component.form.contains('tipoContato')).toBeTrue();
    expect(component.form.contains('pais')).toBeTrue();
    expect(component.form.contains('estado')).toBeTrue();
  });

  it('deve validar campo nome (required e minLength)', () => {
    const nome = component.form.get('nome');
    nome?.setValue('');
    expect(nome?.valid).toBeFalse();

    nome?.setValue('Ed');
    expect(nome?.valid).toBeFalse();

    nome?.setValue('Eduardo');
    expect(nome?.valid).toBeTrue();
  });

  it('deve validar email corretamente', () => {
    const email = component.form.get('email');
    email?.setValue('errado');
    expect(email?.valid).toBeFalse();

    email?.setValue('email@valido.com');
    expect(email?.valid).toBeTrue();
  });

  it('deve tornar CPF obrigatório se país for Brasil', () => {
    component.form.get('pais')?.setValue('Brasil');
    component.form.get('cpf')?.setValue('');
    component.form.get('cpf')?.markAsTouched();
    expect(component.form.get('cpf')?.valid).toBeFalse();
  });

  it('não deve obrigar CPF se país for Estados Unidos', () => {
    component.form.get('pais')?.setValue('Estados Unidos');
    component.form.get('cpf')?.setValue('');
    expect(component.form.get('cpf')?.valid).toBeTrue();
  });

  it('deve aplicar validação de data futura corretamente', () => {
    const data = new Date();
    data.setDate(data.getDate() + 1);
    component.form.get('dataNascimento')?.setValue(format(data, 'yyyy-MM-dd'));
    expect(component.form.get('dataNascimento')?.valid).toBeFalse();

    data.setFullYear(data.getFullYear() - 10);
    component.form.get('dataNascimento')?.setValue(format(data, 'yyyy-MM-dd'));
    expect(component.form.get('dataNascimento')?.valid).toBeTrue();
  });

  it('deve resetar estado ao mudar o país', () => {
    component.form.get('pais')?.setValue('Brasil');
    component.form.get('estado')?.setValue('SP');

    component.form.get('pais')?.setValue('Estados Unidos');

    expect(component.form.get('estado')?.value).toBeNull();
    expect(component.estados).toEqual(['California', 'Texas', 'Florida']);
  });

  it('deve não submeter se o formulário for inválido', () => {
    component.form.get('nome')?.setValue('');
    component.submit();

    expect(logService.logWarn).toHaveBeenCalled();
    expect(component.form.touched).toBeTrue();
  });

  it('deve chamar clienteService.criar() e mostrar toast no submit()', fakeAsync(() => {
    spyOn(component.onRefreshClients, 'emit');
    spyOn(component.onCloseModal, 'emit');

    clienteService.criar.and.returnValue(of(clienteMock));

    component.form.setValue({
      nome: 'Carlos',
      email: 'teste@email.com',
      cpf: '123.456.789-00',
      dataNascimento: '2000-01-01',
      contato: '11999999999',
      tipoContato: 'Whatsapp',
      pais: 'Brasil',
      estado: 'SP',
    });

    component.submit();
    tick();

    expect(clienteService.criar).toHaveBeenCalled();
    expect(component.onRefreshClients.emit).not.toHaveBeenCalled();
  }));

  it('deve chamar clienteService.atualizar() se idCliente for passado', fakeAsync(() => {
    spyOn(component.onEditSuccess, 'emit');
    spyOn(component.onCloseModal, 'emit');
    spyOn(component.onRefreshClients, 'emit');

    component.idCliente = 1;
    clienteService.atualizar.and.returnValue(of(clienteMock));

    component.form.setValue({
      nome: 'Carlos',
      email: 'teste@email.com',
      cpf: '123.456.789-00',
      dataNascimento: '2000-01-01',
      contato: '11999999999',
      tipoContato: 'Whatsapp',
      pais: 'Brasil',
      estado: 'SP',
    });

    component.submit();
    tick();

    expect(clienteService.atualizar).toHaveBeenCalled();
    expect(component.onCloseModal.emit).toHaveBeenCalled();
    expect(component.onRefreshClients.emit).toHaveBeenCalled();
    expect(component.onEditSuccess.emit).toHaveBeenCalled();
  }));

  it('deve lidar com erro ao criar cliente', fakeAsync(() => {
    clienteService.criar.and.returnValue(throwError(() => new Error('erro')));
    component.form.patchValue({
      nome: 'Carlos',
      email: 'teste@email.com',
      cpf: '123.456.789-00',
      dataNascimento: '2000-01-01',
      contato: '11999999999',
      tipoContato: 'Whatsapp',
      pais: 'Brasil',
      estado: 'SP',
    });

    component.submit();
    tick();

    expect(logService.logError).toHaveBeenCalled();
  }));
});
