import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaRecoleccionAdminPageRoutingModule } from './lista-recoleccion-admin-routing.module';

import { ListaRecoleccionAdminPage } from './lista-recoleccion-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaRecoleccionAdminPageRoutingModule
  ],
  declarations: [ListaRecoleccionAdminPage]
})
export class ListaRecoleccionAdminPageModule {}
