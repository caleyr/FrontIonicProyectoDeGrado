import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmarDireccionPageRoutingModule } from './confirmar-direccion-routing.module';

import { ConfirmarDireccionPage } from './confirmar-direccion.page';
import { VerDatosResidentePage } from '../../residente/ver-datos-residente/ver-datos-residente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmarDireccionPageRoutingModule
  ],
  declarations: [ConfirmarDireccionPage],
  providers: [
    VerDatosResidentePage
  ]
})
export class ConfirmarDireccionPageModule {}
