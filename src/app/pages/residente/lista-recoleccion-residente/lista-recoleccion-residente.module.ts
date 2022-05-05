import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaRecoleccionResidentePageRoutingModule } from './lista-recoleccion-residente-routing.module';

import { ListaRecoleccionResidentePage } from './lista-recoleccion-residente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaRecoleccionResidentePageRoutingModule
  ],
  declarations: [ListaRecoleccionResidentePage]
})
export class ListaRecoleccionResidentePageModule {}
