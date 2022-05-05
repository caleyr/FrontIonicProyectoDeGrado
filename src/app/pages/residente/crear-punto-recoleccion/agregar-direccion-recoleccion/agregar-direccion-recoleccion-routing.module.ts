import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarDireccionRecoleccionPage } from './agregar-direccion-recoleccion.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarDireccionRecoleccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarDireccionRecoleccionPageRoutingModule {}
