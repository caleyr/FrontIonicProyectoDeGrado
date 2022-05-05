import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaUsuarioAdminPage } from './lista-usuario-admin.page';

const routes: Routes = [
  {
    path: '',
    component: ListaUsuarioAdminPage
  },
  {
    path: 'ver-usuario-admin/:id_role/:email/:id',
    loadChildren: () => import('./ver-usuario-admin/ver-usuario-admin.module').then( m => m.VerUsuarioAdminPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaUsuarioAdminPageRoutingModule {}
