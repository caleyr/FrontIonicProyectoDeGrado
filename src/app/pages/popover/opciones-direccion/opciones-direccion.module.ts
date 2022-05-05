import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpcionesDireccionPageRoutingModule } from './opciones-direccion-routing.module';

import { OpcionesDireccionPage } from './opciones-direccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpcionesDireccionPageRoutingModule
  ],
  declarations: [OpcionesDireccionPage]
})
export class OpcionesDireccionPageModule {}
