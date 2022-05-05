import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerDatosTiendaPageRoutingModule } from './ver-datos-tienda-routing.module';

import { VerDatosTiendaPage } from './ver-datos-tienda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerDatosTiendaPageRoutingModule
  ],
  declarations: [VerDatosTiendaPage]
})
export class VerDatosTiendaPageModule {}
