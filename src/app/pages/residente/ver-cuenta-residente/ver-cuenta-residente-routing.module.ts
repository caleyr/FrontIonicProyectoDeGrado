import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerCuentaResidentePage } from './ver-cuenta-residente.page';

const routes: Routes = [
  {
    path: '',
    component: VerCuentaResidentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerCuentaResidentePageRoutingModule {}
