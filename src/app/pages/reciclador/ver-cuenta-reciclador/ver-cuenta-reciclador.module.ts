import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerCuentaRecicladorPageRoutingModule } from './ver-cuenta-reciclador-routing.module';

import { VerCuentaRecicladorPage } from './ver-cuenta-reciclador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerCuentaRecicladorPageRoutingModule
  ],
  declarations: [VerCuentaRecicladorPage]
})
export class VerCuentaRecicladorPageModule {}
