import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerCuentaTiendaPage } from './ver-cuenta-tienda.page';

const routes: Routes = [
  {
    path: '',
    component: VerCuentaTiendaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerCuentaTiendaPageRoutingModule {}
