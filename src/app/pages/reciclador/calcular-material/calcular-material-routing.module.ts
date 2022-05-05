import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalcularMaterialPage } from './calcular-material.page';

const routes: Routes = [
  {
    path: '',
    component: CalcularMaterialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalcularMaterialPageRoutingModule {}
