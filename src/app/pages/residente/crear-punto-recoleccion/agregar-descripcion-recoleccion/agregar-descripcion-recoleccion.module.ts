import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarDescripcionRecoleccionPageRoutingModule } from './agregar-descripcion-recoleccion-routing.module';

import { AgregarDescripcionRecoleccionPage } from './agregar-descripcion-recoleccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarDescripcionRecoleccionPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AgregarDescripcionRecoleccionPage]
})
export class AgregarDescripcionRecoleccionPageModule {}
