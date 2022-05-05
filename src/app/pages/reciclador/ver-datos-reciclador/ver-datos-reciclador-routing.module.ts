import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerDatosRecicladorPage } from './ver-datos-reciclador.page';

const routes: Routes = [
  {
    path: '',
    component: VerDatosRecicladorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerDatosRecicladorPageRoutingModule {}
