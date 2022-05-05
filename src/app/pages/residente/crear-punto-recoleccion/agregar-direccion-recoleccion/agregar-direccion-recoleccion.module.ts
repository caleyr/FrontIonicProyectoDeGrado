import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarDireccionRecoleccionPageRoutingModule } from './agregar-direccion-recoleccion-routing.module';

import { AgregarDireccionRecoleccionPage } from './agregar-direccion-recoleccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarDireccionRecoleccionPageRoutingModule
  ],
  declarations: [AgregarDireccionRecoleccionPage]
})
export class AgregarDireccionRecoleccionPageModule {}
