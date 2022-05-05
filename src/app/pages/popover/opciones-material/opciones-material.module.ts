import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpcionesMaterialPageRoutingModule } from './opciones-material-routing.module';

import { OpcionesMaterialPage } from './opciones-material.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpcionesMaterialPageRoutingModule
  ],
  declarations: [OpcionesMaterialPage]
})
export class OpcionesMaterialPageModule {}
