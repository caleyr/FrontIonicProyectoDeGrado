import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AceptarRecoleccionPage } from './aceptar-recoleccion.page';

const routes: Routes = [
  {
    path: '',
    component: AceptarRecoleccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AceptarRecoleccionPageRoutingModule {}
