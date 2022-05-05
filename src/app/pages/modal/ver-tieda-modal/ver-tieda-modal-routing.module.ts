import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerTiedaModalPage } from './ver-tieda-modal.page';

const routes: Routes = [
  {
    path: '',
    component: VerTiedaModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerTiedaModalPageRoutingModule {}
