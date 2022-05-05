import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaRutaAdminPage } from './lista-ruta-admin.page';

const routes: Routes = [
  {
    path: '',
    component: ListaRutaAdminPage
  },
  {
    path: 'ver-ruta-admin/:id',
    loadChildren: () => import('./ver-ruta-admin/ver-ruta-admin.module').then( m => m.VerRutaAdminPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaRutaAdminPageRoutingModule {}
