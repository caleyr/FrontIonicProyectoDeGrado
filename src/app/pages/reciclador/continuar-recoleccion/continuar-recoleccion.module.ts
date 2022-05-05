import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContinuarRecoleccionPageRoutingModule } from './continuar-recoleccion-routing.module';

import { ContinuarRecoleccionPage } from './continuar-recoleccion.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContinuarRecoleccionPageRoutingModule
  ],
  declarations: [ContinuarRecoleccionPage]
})
export class ContinuarRecoleccionPageModule {}
