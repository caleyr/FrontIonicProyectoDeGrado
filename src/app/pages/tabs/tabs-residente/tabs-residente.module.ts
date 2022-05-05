import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsResidentePageRoutingModule } from './tabs-residente-routing.module';

import { TabsResidentePage } from './tabs-residente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsResidentePageRoutingModule
  ],
  declarations: [TabsResidentePage]
})
export class TabsResidentePageModule {}
