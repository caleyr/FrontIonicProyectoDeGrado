import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerComentarioRecicladorPageRoutingModule } from './ver-comentario-reciclador-routing.module';

import { VerComentarioRecicladorPage } from './ver-comentario-reciclador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerComentarioRecicladorPageRoutingModule
  ],
  declarations: [VerComentarioRecicladorPage]
})
export class VerComentarioRecicladorPageModule {}
