import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialRutasPage } from './historial-rutas.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialRutasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialRutasPageRoutingModule {}
