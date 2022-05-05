import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaUsuarioAdminPageRoutingModule } from './lista-usuario-admin-routing.module';

import { ListaUsuarioAdminPage } from './lista-usuario-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaUsuarioAdminPageRoutingModule
  ],
  declarations: [ListaUsuarioAdminPage]
})
export class ListaUsuarioAdminPageModule {}
