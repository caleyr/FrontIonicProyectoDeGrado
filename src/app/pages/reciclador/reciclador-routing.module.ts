import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecicladorPage } from './reciclador.page';

const routes: Routes = [
  {
    path: '',
    component: RecicladorPage
  },
  {
    path: 'ver-recoleccion',
    loadChildren: () => import('./ver-recoleccion/ver-recoleccion.module').then( m => m.VerRecoleccionPageModule)
  },
  {
    path: 'aceptar-recoleccion',
    loadChildren: () => import('./aceptar-recoleccion/aceptar-recoleccion.module').then( m => m.AceptarRecoleccionPageModule)
  },
  {
    path: 'finalizar-recoleccion',
    loadChildren: () => import('./finalizar-recoleccion/finalizar-recoleccion.module').then( m => m.FinalizarRecoleccionPageModule)
  },
  {
    path: 'continuar-recoleccion',
    loadChildren: () => import('./continuar-recoleccion/continuar-recoleccion.module').then( m => m.ContinuarRecoleccionPageModule)
  },
  {
    path: 'ver-tienda',
    loadChildren: () => import('./ver-tienda/ver-tienda.module').then( m => m.VerTiendaPageModule)
  },
  {
    path: 'calcular-material',
    loadChildren: () => import('./calcular-material/calcular-material.module').then( m => m.CalcularMaterialPageModule)
  },
  {
    path: 'ver-datos-reciclador',
    loadChildren: () => import('./ver-datos-reciclador/ver-datos-reciclador.module').then( m => m.VerDatosRecicladorPageModule)
  },
  {
    path: 'editar-datos-reciclador/:id',
    loadChildren: () => import('./editar-datos-reciclador/editar-datos-reciclador.module').then( m => m.EditarDatosRecicladorPageModule)
  },
  {
    path: 'ver-cuenta-reciclador',
    loadChildren: () => import('./ver-cuenta-reciclador/ver-cuenta-reciclador.module').then( m => m.VerCuentaRecicladorPageModule)
  },
  {
    path: 'ver-comentario-reciclador',
    loadChildren: () => import('./ver-comentario-reciclador/ver-comentario-reciclador.module').then( m => m.VerComentarioRecicladorPageModule)
  },
  {
    path: 'historial-rutas',
    loadChildren: () => import('./historial-rutas/historial-rutas.module').then( m => m.HistorialRutasPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecicladorPageRoutingModule {}
