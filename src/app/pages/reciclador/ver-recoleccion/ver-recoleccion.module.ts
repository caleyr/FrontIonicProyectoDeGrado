import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerRecoleccionPageRoutingModule } from './ver-recoleccion-routing.module';

import { VerRecoleccionPage } from './ver-recoleccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerRecoleccionPageRoutingModule
  ],
  declarations: [VerRecoleccionPage]
})
export class VerRecoleccionPageModule {}
