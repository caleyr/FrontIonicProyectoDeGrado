import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarMaterialPageRoutingModule } from './agregar-material-routing.module';

import { AgregarMaterialPage } from './agregar-material.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarMaterialPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AgregarMaterialPage]
})
export class AgregarMaterialPageModule {}
