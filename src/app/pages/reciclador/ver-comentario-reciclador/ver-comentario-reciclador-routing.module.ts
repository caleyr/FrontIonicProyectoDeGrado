import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerComentarioRecicladorPage } from './ver-comentario-reciclador.page';

const routes: Routes = [
  {
    path: '',
    component: VerComentarioRecicladorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerComentarioRecicladorPageRoutingModule {}
