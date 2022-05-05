import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerComentarioResidentePageRoutingModule } from './ver-comentario-residente-routing.module';

import { VerComentarioResidentePage } from './ver-comentario-residente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerComentarioResidentePageRoutingModule
  ],
  declarations: [VerComentarioResidentePage]
})
export class VerComentarioResidentePageModule {}
