import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListagemClientesComponent } from './listagem-clientes.component';
import { ClienteService } from '../services/cliente.service';
import { of } from 'rxjs';

const mockClienteService = {
  listar: () => of([]) 
};

describe('ListagemClientesComponent', () => {
  let component: ListagemClientesComponent;
  let fixture: ComponentFixture<ListagemClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListagemClientesComponent],
      providers: [
        { provide: ClienteService, useValue: mockClienteService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListagemClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
