import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarMaterialPage } from './agregar-material.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarMaterialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarMaterialPageRoutingModule {}
