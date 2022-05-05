import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerRecoleccionPage } from './ver-recoleccion.page';

const routes: Routes = [
  {
    path: '',
    component: VerRecoleccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerRecoleccionPageRoutingModule {}
