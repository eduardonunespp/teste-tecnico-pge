import { Routes } from '@angular/router';
import { ListagemClientesComponent } from './pages/listagem-clientes/listagem-clientes.component';
import { CadastroClientePageComponent } from './pages/cadastro-cliente-page/cadastro-cliente-page.component';

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
