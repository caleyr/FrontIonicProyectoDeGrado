import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarDatosResidentePage } from './editar-datos-residente.page';

const routes: Routes = [
  {
    path: '',
    component: EditarDatosResidentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarDatosResidentePageRoutingModule {}
