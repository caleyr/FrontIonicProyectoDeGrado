import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContinuarRecoleccionPage } from './continuar-recoleccion.page';

const routes: Routes = [
  {
    path: '',
    component: ContinuarRecoleccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContinuarRecoleccionPageRoutingModule {}
