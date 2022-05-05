import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaRutaAdminPageRoutingModule } from './lista-ruta-admin-routing.module';

import { ListaRutaAdminPage } from './lista-ruta-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaRutaAdminPageRoutingModule
  ],
  declarations: [ListaRutaAdminPage]
})
export class ListaRutaAdminPageModule {}
