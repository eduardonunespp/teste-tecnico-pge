import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { CadastroClientePageComponent } from './cadastro-cliente-page.component';

@Component({
  selector: 'app-description-header-page',
  template: '',
  standalone: true,
})
class DescriptionHeaderPageStubComponent {
  @Input() title!: string;
  @Input() redirect!: string;
  @Input() buttonName!: string;
}

@Component({
  selector: 'app-cliente-form',
  template: '',
  standalone: true,
})
class ClienteFormStubComponent {}

describe('CadastroClientePageComponent', () => {
  let component: CadastroClientePageComponent;
  let fixture: ComponentFixture<CadastroClientePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CadastroClientePageComponent,
        DescriptionHeaderPageStubComponent,
        ClienteFormStubComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroClientePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
