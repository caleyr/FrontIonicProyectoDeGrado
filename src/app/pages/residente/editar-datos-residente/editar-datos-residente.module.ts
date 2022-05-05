import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarDatosResidentePageRoutingModule } from './editar-datos-residente-routing.module';

import { EditarDatosResidentePage } from './editar-datos-residente.page';
import { VerDatosResidentePage } from '../ver-datos-residente/ver-datos-residente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarDatosResidentePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditarDatosResidentePage]
})
export class EditarDatosResidentePageModule {}
