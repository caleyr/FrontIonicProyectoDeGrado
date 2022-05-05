import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TiendaPage } from './tienda.page';

const routes: Routes = [
  {
    path: '',
    component: TiendaPage
  },
  {
    path: 'ver-datos-tienda',
    loadChildren: () => import('./ver-datos-tienda/ver-datos-tienda.module').then( m => m.VerDatosTiendaPageModule)
  },
  {
    path: 'editar-datos-tienda/:id',
    loadChildren: () => import('./editar-datos-tienda/editar-datos-tienda.module').then( m => m.EditarDatosTiendaPageModule)
  },
  {
    path: 'agregar-material/:state/:id',
    loadChildren: () => import('./agregar-material/agregar-material.module').then( m => m.AgregarMaterialPageModule)
  },
  {
    path: 'ver-cuenta-tienda',
    loadChildren: () => import('./ver-cuenta-tienda/ver-cuenta-tienda.module').then( m => m.VerCuentaTiendaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiendaPageRoutingModule {}
