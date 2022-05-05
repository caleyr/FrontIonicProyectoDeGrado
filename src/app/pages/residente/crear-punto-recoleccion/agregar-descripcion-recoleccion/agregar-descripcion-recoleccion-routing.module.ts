import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarDescripcionRecoleccionPage } from './agregar-descripcion-recoleccion.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarDescripcionRecoleccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarDescripcionRecoleccionPageRoutingModule {}
