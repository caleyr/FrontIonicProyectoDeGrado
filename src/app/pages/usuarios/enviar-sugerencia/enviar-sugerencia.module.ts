import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnviarSugerenciaPageRoutingModule } from './enviar-sugerencia-routing.module';

import { EnviarSugerenciaPage } from './enviar-sugerencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnviarSugerenciaPageRoutingModule
  ],
  declarations: [EnviarSugerenciaPage]
})
export class EnviarSugerenciaPageModule {}
