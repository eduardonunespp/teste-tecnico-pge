import { Routes } from '@angular/router';
import { ListagemClientesComponent } from './pages/clientes/listagem/listagem-clientes.component';
import { CadastroClientePageComponent } from './pages/clientes/cadastro/cadastro-cliente-page.component';
;

export const routes: Routes = [
    {
        path: '',
        component: ListagemClientesComponent
    },
    {
        path: 'cadastro-cliente',
        component: CadastroClientePageComponent
    }
];
