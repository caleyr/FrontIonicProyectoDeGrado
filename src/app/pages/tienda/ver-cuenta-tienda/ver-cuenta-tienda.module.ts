import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerCuentaTiendaPageRoutingModule } from './ver-cuenta-tienda-routing.module';

import { VerCuentaTiendaPage } from './ver-cuenta-tienda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerCuentaTiendaPageRoutingModule
  ],
  declarations: [VerCuentaTiendaPage]
})
export class VerCuentaTiendaPageModule {}
