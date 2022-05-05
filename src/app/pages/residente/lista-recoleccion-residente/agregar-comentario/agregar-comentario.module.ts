import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarComentarioPageRoutingModule } from './agregar-comentario-routing.module';

import { AgregarComentarioPage } from './agregar-comentario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarComentarioPageRoutingModule
  ],
  declarations: [AgregarComentarioPage]
})
export class AgregarComentarioPageModule {}
