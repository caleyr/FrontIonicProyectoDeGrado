import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerComentarioResidentePage } from './ver-comentario-residente.page';

const routes: Routes = [
  {
    path: '',
    component: VerComentarioResidentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerComentarioResidentePageRoutingModule {}
