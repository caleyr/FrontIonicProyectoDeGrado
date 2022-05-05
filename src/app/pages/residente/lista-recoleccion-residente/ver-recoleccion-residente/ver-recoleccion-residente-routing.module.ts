import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerRecoleccionResidentePage } from './ver-recoleccion-residente.page';

const routes: Routes = [
  {
    path: '',
    component: VerRecoleccionResidentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerRecoleccionResidentePageRoutingModule {}
