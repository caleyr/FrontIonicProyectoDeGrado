import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerRecoleccionAdminPageRoutingModule } from './ver-recoleccion-admin-routing.module';

import { VerRecoleccionAdminPage } from './ver-recoleccion-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerRecoleccionAdminPageRoutingModule
  ],
  declarations: [VerRecoleccionAdminPage]
})
export class VerRecoleccionAdminPageModule {}
