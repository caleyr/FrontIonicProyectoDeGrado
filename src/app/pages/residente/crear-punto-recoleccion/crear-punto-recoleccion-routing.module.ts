import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearPuntoRecoleccionPage } from './crear-punto-recoleccion.page';

const routes: Routes = [
  {
    path: '',
    component: CrearPuntoRecoleccionPage
  },
  {
    path: 'agregar-foto-recoleccion',
    loadChildren: () => import('./agregar-foto-recoleccion/agregar-foto-recoleccion.module').then( m => m.AgregarFotoRecoleccionPageModule)
  },
  {
    path: 'agregar-direccion-recoleccion',
    loadChildren: () => import('./agregar-direccion-recoleccion/agregar-direccion-recoleccion.module').then( m => m.AgregarDireccionRecoleccionPageModule)
  },
  {
    path: 'agregar-descripcion-recoleccion',
    loadChildren: () => import('./agregar-descripcion-recoleccion/agregar-descripcion-recoleccion.module').then( m => m.AgregarDescripcionRecoleccionPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearPuntoRecoleccionPageRoutingModule {}
