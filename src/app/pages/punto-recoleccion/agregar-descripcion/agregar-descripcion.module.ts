import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarDescripcionPageRoutingModule } from './agregar-descripcion-routing.module';

import { AgregarDescripcionPage } from './agregar-descripcion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarDescripcionPageRoutingModule
  ],
  declarations: [AgregarDescripcionPage]
})
export class AgregarDescripcionPageModule {}
