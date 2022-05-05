import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerRecoleccionAdminPage } from './ver-recoleccion-admin.page';

const routes: Routes = [
  {
    path: '',
    component: VerRecoleccionAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerRecoleccionAdminPageRoutingModule {}
