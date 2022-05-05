import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerTiedaModalPageRoutingModule } from './ver-tieda-modal-routing.module';

import { VerTiedaModalPage } from './ver-tieda-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerTiedaModalPageRoutingModule
  ],
  declarations: [VerTiedaModalPage]
})
export class VerTiedaModalPageModule {}
