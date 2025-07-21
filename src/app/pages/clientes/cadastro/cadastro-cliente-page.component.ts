import { Component } from '@angular/core';

import { DescriptionHeaderPageComponent } from "../../../shared/components/description-header-page/description-header-page.component";
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';

@Component({
  selector: 'app-cadastro-cliente-page',
  standalone: true,
  imports: [ClienteFormComponent, DescriptionHeaderPageComponent],
  templateUrl: './cadastro-cliente-page.component.html',
  styleUrl: './cadastro-cliente-page.component.scss'
})
export class CadastroClientePageComponent {

}
