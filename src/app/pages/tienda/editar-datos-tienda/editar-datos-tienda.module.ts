import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarDatosTiendaPageRoutingModule } from './editar-datos-tienda-routing.module';

import { EditarDatosTiendaPage } from './editar-datos-tienda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarDatosTiendaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditarDatosTiendaPage]
})
export class EditarDatosTiendaPageModule {}
