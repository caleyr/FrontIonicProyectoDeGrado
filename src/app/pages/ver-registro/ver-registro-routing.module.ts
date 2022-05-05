import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerRegistroPage } from './ver-registro.page';

const routes: Routes = [
  {
    path: '',
    component: VerRegistroPage
  },
  {
    path: 'registro/:id_role',
    loadChildren: () => import('../ver-Registro/registro/registro.module').then( m => m.RegistroPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerRegistroPageRoutingModule {}
