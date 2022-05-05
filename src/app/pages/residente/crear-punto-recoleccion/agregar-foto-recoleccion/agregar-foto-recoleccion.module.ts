import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarFotoRecoleccionPageRoutingModule } from './agregar-foto-recoleccion-routing.module';

import { AgregarFotoRecoleccionPage } from './agregar-foto-recoleccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarFotoRecoleccionPageRoutingModule
  ],
  declarations: [AgregarFotoRecoleccionPage]
})
export class AgregarFotoRecoleccionPageModule {}
