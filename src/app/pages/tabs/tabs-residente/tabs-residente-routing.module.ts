import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsResidentePage } from './tabs-residente.page';

const routes: Routes = [
  {
    path: '',
    component: TabsResidentePage,
    children: [
      {
        path: 'ver-historial',
        loadChildren: () => import('../../residente/lista-recoleccion-residente/lista-recoleccion-residente.module').then( m => m.ListaRecoleccionResidentePageModule)
      },
      {
        path: 'crear-publicacion',
        loadChildren: () => import('../../residente/crear-punto-recoleccion/crear-punto-recoleccion.module').then( m => m.CrearPuntoRecoleccionPageModule)
      },
      {
        path: 'perfil-residente',
        loadChildren: () => import('../../residente/ver-cuenta-residente/ver-cuenta-residente.module').then( m => m.VerCuentaResidentePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsResidentePageRoutingModule {}
