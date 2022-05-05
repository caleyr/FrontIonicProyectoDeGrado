import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerDatosRecicladorPageRoutingModule } from './ver-datos-reciclador-routing.module';

import { VerDatosRecicladorPage } from './ver-datos-reciclador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerDatosRecicladorPageRoutingModule
  ],
  declarations: [VerDatosRecicladorPage]
})
export class VerDatosRecicladorPageModule {}
