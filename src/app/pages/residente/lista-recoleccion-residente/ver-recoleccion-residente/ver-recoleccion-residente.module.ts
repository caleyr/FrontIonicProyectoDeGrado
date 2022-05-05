import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerRecoleccionResidentePageRoutingModule } from './ver-recoleccion-residente-routing.module';

import { VerRecoleccionResidentePage } from './ver-recoleccion-residente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerRecoleccionResidentePageRoutingModule
  ],
  declarations: [VerRecoleccionResidentePage]
})
export class VerRecoleccionResidentePageModule {}
