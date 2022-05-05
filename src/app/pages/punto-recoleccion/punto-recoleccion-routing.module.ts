import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PuntoRecoleccionPage } from './punto-recoleccion.page';

const routes: Routes = [
  {
    path: '',
    component: PuntoRecoleccionPage
  },
  {
    path: 'agregar-clasificacion',
    loadChildren: () => import('./agregar-clasificacion/agregar-clasificacion.module').then( m => m.AgregarClasificacionPageModule)
  },
  {
    path: 'agregar-descripcion',
    loadChildren: () => import('./agregar-descripcion/agregar-descripcion.module').then( m => m.AgregarDescripcionPageModule)
  },
  {
    path: 'agregar-direccion',
    loadChildren: () => import('./agregar-direccion/agregar-direccion.module').then( m => m.AgregarDireccionPageModule)
  },
  {
    path: 'lista',
    loadChildren: () => import('./lista/lista.module').then( m => m.ListaPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PuntoRecoleccionPageRoutingModule {}
