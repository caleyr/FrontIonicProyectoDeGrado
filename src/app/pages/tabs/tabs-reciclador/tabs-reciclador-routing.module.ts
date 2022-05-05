import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsRecicladorPage } from './tabs-reciclador.page';

const routes: Routes = [
  {
    path: '',
    component: TabsRecicladorPage,
    children: [
      //Reciclador
      {
        path: 'ver-recoleccion',
        loadChildren: () => import('../../reciclador/ver-recoleccion/ver-recoleccion.module').then( m => m.VerRecoleccionPageModule)
      },
      {
        path: 'ver-tienda',
        loadChildren: () => import('../../reciclador/ver-tienda/ver-tienda.module').then( m => m.VerTiendaPageModule)
      },
      {
        path: 'perfil-reciclador',
        loadChildren: () => import('../../reciclador/ver-cuenta-reciclador/ver-cuenta-reciclador.module').then( m => m.VerCuentaRecicladorPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsRecicladorPageRoutingModule {}
