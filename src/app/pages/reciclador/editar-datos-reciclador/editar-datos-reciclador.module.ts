import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarDatosRecicladorPageRoutingModule } from './editar-datos-reciclador-routing.module';

import { EditarDatosRecicladorPage } from './editar-datos-reciclador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarDatosRecicladorPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditarDatosRecicladorPage]
})
export class EditarDatosRecicladorPageModule {}
