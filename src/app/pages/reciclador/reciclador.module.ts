import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecicladorPageRoutingModule } from './reciclador-routing.module';

import { RecicladorPage } from './reciclador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecicladorPageRoutingModule
  ],
  declarations: [RecicladorPage]
})
export class RecicladorPageModule {}
