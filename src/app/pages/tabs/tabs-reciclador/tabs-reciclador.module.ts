import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsRecicladorPageRoutingModule } from './tabs-reciclador-routing.module';

import { TabsRecicladorPage } from './tabs-reciclador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsRecicladorPageRoutingModule
  ],
  declarations: [TabsRecicladorPage]
})
export class TabsRecicladorPageModule {}
