import { Component } from '@angular/core';
import { ClienteFormComponent } from "../listagem-clientes/components/cliente-form/cliente-form.component";
import { DescriptionHeaderPageComponent } from "../../shared/components/description-header-page/description-header-page.component";

@Component({
  selector: 'app-cadastro-cliente-page',
  standalone: true,
  imports: [ClienteFormComponent, DescriptionHeaderPageComponent],
  templateUrl: './cadastro-cliente-page.component.html',
  styleUrl: './cadastro-cliente-page.component.scss'
})
export class CadastroClientePageComponent {

}
