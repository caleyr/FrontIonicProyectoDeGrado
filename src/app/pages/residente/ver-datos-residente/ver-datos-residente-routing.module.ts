import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerDatosResidentePage } from './ver-datos-residente.page';

const routes: Routes = [
  {
    path: '',
    component: VerDatosResidentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerDatosResidentePageRoutingModule {}
