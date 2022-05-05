import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaRecoleccionAdminPage } from './lista-recoleccion-admin.page';

const routes: Routes = [
  {
    path: '',
    component: ListaRecoleccionAdminPage
  },
  {
    path: 'ver-recoleccion-admin/:estado/:id',
    loadChildren: () => import('./ver-recoleccion-admin/ver-recoleccion-admin.module').then( m => m.VerRecoleccionAdminPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaRecoleccionAdminPageRoutingModule {}
