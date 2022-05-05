import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerCuentaRecicladorPage } from './ver-cuenta-reciclador.page';

const routes: Routes = [
  {
    path: '',
    component: VerCuentaRecicladorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerCuentaRecicladorPageRoutingModule {}
