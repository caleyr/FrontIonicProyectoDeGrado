import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuariosPendientesPageRoutingModule } from './usuarios-pendientes-routing.module';

import { UsuariosPendientesPage } from './usuarios-pendientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuariosPendientesPageRoutingModule
  ],
  declarations: [UsuariosPendientesPage]
})
export class UsuariosPendientesPageModule {}
