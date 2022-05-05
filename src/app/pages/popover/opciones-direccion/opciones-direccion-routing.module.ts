import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpcionesDireccionPage } from './opciones-direccion.page';

const routes: Routes = [
  {
    path: '',
    component: OpcionesDireccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpcionesDireccionPageRoutingModule {}
