import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarDescripcionPage } from './agregar-descripcion.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarDescripcionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarDescripcionPageRoutingModule {}
