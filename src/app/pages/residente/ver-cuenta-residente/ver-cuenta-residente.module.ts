import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerCuentaResidentePageRoutingModule } from './ver-cuenta-residente-routing.module';

import { VerCuentaResidentePage } from './ver-cuenta-residente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerCuentaResidentePageRoutingModule
  ],
  declarations: [VerCuentaResidentePage]
})
export class VerCuentaResidentePageModule {}
