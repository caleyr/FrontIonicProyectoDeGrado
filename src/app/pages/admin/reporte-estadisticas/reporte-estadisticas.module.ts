import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReporteEstadisticasPageRoutingModule } from './reporte-estadisticas-routing.module';

import { ReporteEstadisticasPage } from './reporte-estadisticas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporteEstadisticasPageRoutingModule
  ],
  declarations: [ReporteEstadisticasPage]
})
export class ReporteEstadisticasPageModule {}
