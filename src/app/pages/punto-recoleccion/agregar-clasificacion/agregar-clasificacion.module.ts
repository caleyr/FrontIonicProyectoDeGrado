import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarClasificacionPageRoutingModule } from './agregar-clasificacion-routing.module';

import { AgregarClasificacionPage } from './agregar-clasificacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarClasificacionPageRoutingModule
  ],
  declarations: [AgregarClasificacionPage]
})
export class AgregarClasificacionPageModule {}
