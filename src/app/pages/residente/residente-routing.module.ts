import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResidentePage } from './residente.page';

const routes: Routes = [
  {
    path: '',
    component: ResidentePage
  },
  {
    path: 'crear-punto-recoleccion',
    loadChildren: () => import('./crear-punto-recoleccion/crear-punto-recoleccion.module').then( m => m.CrearPuntoRecoleccionPageModule)
  },
  {
    path: 'lista-recoleccion-residente',
    loadChildren: () => import('./lista-recoleccion-residente/lista-recoleccion-residente.module').then( m => m.ListaRecoleccionResidentePageModule)
  },
  {
    path: 'ver-datos-residente',
    loadChildren: () => import('./ver-datos-residente/ver-datos-residente.module').then( m => m.VerDatosResidentePageModule)
  },
  {
    path: 'editar-datos-residente/:id',
    loadChildren: () => import('./editar-datos-residente/editar-datos-residente.module').then( m => m.EditarDatosResidentePageModule)
  },
  {
    path: 'ver-cuenta-residente',
    loadChildren: () => import('./ver-cuenta-residente/ver-cuenta-residente.module').then( m => m.VerCuentaResidentePageModule)
  },
  {
    path: 'ver-comentario-residente',
    loadChildren: () => import('./ver-comentario-residente/ver-comentario-residente.module').then( m => m.VerComentarioResidentePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResidentePageRoutingModule {}
