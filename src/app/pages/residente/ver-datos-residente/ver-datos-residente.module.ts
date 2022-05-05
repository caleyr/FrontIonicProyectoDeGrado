import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerDatosResidentePageRoutingModule } from './ver-datos-residente-routing.module';

import { VerDatosResidentePage } from './ver-datos-residente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerDatosResidentePageRoutingModule
  ],
  declarations: [VerDatosResidentePage]
})
export class VerDatosResidentePageModule {}
