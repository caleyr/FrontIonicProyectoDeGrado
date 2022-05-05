import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerRutaAdminPageRoutingModule } from './ver-ruta-admin-routing.module';

import { VerRutaAdminPage } from './ver-ruta-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerRutaAdminPageRoutingModule
  ],
  declarations: [VerRutaAdminPage]
})
export class VerRutaAdminPageModule {}
