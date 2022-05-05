import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarClasificacionPage } from './agregar-clasificacion.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarClasificacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarClasificacionPageRoutingModule {}
