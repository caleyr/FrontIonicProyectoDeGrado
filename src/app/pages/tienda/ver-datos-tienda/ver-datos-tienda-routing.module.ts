import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerDatosTiendaPage } from './ver-datos-tienda.page';

const routes: Routes = [
  {
    path: '',
    component: VerDatosTiendaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerDatosTiendaPageRoutingModule {}
