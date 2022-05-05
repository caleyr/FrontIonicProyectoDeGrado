import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinalizarRecoleccionPageRoutingModule } from './finalizar-recoleccion-routing.module';

import { FinalizarRecoleccionPage } from './finalizar-recoleccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinalizarRecoleccionPageRoutingModule
  ],
  declarations: [FinalizarRecoleccionPage]
})
export class FinalizarRecoleccionPageModule {}
