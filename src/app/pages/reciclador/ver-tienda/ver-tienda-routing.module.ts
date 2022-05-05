import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerTiendaPage } from './ver-tienda.page';

const routes: Routes = [
  {
    path: '',
    component: VerTiendaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerTiendaPageRoutingModule {}
