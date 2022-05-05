import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalcularMaterialPageRoutingModule } from './calcular-material-routing.module';

import { CalcularMaterialPage } from './calcular-material.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalcularMaterialPageRoutingModule
  ],
  declarations: [CalcularMaterialPage]
})
export class CalcularMaterialPageModule {}
