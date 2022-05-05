import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerRegistroPageRoutingModule } from './ver-registro-routing.module';

import { VerRegistroPage } from './ver-registro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerRegistroPageRoutingModule
  ],
  declarations: [VerRegistroPage]
})
export class VerRegistroPageModule {}
