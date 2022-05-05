import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerRutaAdminPage } from './ver-ruta-admin.page';

const routes: Routes = [
  {
    path: '',
    component: VerRutaAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerRutaAdminPageRoutingModule {}
