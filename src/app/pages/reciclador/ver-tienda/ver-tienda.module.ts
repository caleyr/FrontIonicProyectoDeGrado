import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerTiendaPageRoutingModule } from './ver-tienda-routing.module';

import { VerTiendaPage } from './ver-tienda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerTiendaPageRoutingModule
  ],
  declarations: [VerTiendaPage]
})
export class VerTiendaPageModule {}
