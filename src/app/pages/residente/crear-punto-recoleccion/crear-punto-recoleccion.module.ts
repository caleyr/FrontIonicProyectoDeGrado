import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearPuntoRecoleccionPageRoutingModule } from './crear-punto-recoleccion-routing.module';

import { CrearPuntoRecoleccionPage } from './crear-punto-recoleccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearPuntoRecoleccionPageRoutingModule
  ],
  declarations: [CrearPuntoRecoleccionPage]
})
export class CrearPuntoRecoleccionPageModule {}
