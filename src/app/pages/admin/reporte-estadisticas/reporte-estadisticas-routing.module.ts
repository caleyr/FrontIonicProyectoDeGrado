import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporteEstadisticasPage } from './reporte-estadisticas.page';

const routes: Routes = [
  {
    path: '',
    component: ReporteEstadisticasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporteEstadisticasPageRoutingModule {}
