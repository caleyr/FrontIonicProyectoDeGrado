import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosPendientesPage } from './usuarios-pendientes.page';

const routes: Routes = [
  {
    path: '',
    component: UsuariosPendientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosPendientesPageRoutingModule {}
