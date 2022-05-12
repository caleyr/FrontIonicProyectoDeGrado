import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnviarSugerenciaPage } from './enviar-sugerencia.page';

const routes: Routes = [
  {
    path: '',
    component: EnviarSugerenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnviarSugerenciaPageRoutingModule {}
