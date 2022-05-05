import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PuntoRecoleccionPageRoutingModule } from './punto-recoleccion-routing.module';

import { PuntoRecoleccionPage } from './punto-recoleccion.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PuntoRecoleccionPageRoutingModule
  ],
  declarations: [PuntoRecoleccionPage]
})
export class PuntoRecoleccionPageModule {}
