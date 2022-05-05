import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsTiendaPage } from './tabs-tienda.page';

const routes: Routes = [
  {
    path: '',
    component: TabsTiendaPage,
    children: [
      {
        path: 'ver-datos-tienda',
        loadChildren: () => import('../../tienda/ver-datos-tienda/ver-datos-tienda.module').then( m => m.VerDatosTiendaPageModule)
      },
      {
        path: 'perfil-tienda',
        loadChildren: () => import('../../tienda/ver-cuenta-tienda/ver-cuenta-tienda.module').then( m => m.VerCuentaTiendaPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsTiendaPageRoutingModule {}
