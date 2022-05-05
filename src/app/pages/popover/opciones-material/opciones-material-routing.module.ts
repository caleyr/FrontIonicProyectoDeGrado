import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpcionesMaterialPage } from './opciones-material.page';

const routes: Routes = [
  {
    path: '',
    component: OpcionesMaterialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpcionesMaterialPageRoutingModule {}
