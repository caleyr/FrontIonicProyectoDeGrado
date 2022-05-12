import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaSugerenciasPage } from './lista-sugerencias.page';

const routes: Routes = [
  {
    path: '',
    component: ListaSugerenciasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaSugerenciasPageRoutingModule {}
