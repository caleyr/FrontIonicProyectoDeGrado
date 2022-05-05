import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerUsuarioAdminPage } from './ver-usuario-admin.page';

const routes: Routes = [
  {
    path: '',
    component: VerUsuarioAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerUsuarioAdminPageRoutingModule {}
