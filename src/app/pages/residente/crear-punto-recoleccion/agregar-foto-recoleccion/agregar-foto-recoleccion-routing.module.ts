import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarFotoRecoleccionPage } from './agregar-foto-recoleccion.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarFotoRecoleccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarFotoRecoleccionPageRoutingModule {}
