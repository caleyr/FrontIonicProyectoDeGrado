import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialRutasPageRoutingModule } from './historial-rutas-routing.module';

import { HistorialRutasPage } from './historial-rutas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialRutasPageRoutingModule
  ],
  declarations: [HistorialRutasPage]
})
export class HistorialRutasPageModule {}
